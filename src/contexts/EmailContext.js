import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, SOCKET_URL } from "../styles/api";
import { toast } from "react-hot-toast";
import io from "socket.io-client";

// Create context
const EmailContext = createContext();

// Initial state
const initialState = {
  emails: [],
  filteredEmails: [],
  selectedEmails: [],
  currentEmail: null,
  categories: {
    inbox: { count: 0, emails: [] },
    spam: { count: 0, emails: [] },
    promotions: { count: 0, emails: [] },
    social: { count: 0, emails: [] },
    updates: { count: 0, emails: [] },
    forums: { count: 0, emails: [] },
    important: { count: 0, emails: [] },
  },
  filters: {
    search: "",
    category: "all",
    dateRange: null,
    isRead: null,
    sortBy: "date",
    sortOrder: "desc",
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalEmails: 0,
    emailsPerPage: 20,
    startIndex: 0,
    endIndex: 20,
  },
  loading: false,
  syncing: false,
  error: null,
  aiStats: {
    totalProcessed: 0,
    accuracy: 0,
    lastTrained: null,
  },
  emailAccounts: [],
  syncHistory: [],
};

// Action types
const EMAIL_ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_SYNCING: "SET_SYNCING",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  FETCH_EMAILS_SUCCESS: "FETCH_EMAILS_SUCCESS",
  FETCH_EMAIL_DETAIL_SUCCESS: "FETCH_EMAIL_DETAIL_SUCCESS",
  ADD_EMAIL: "ADD_EMAIL",
  UPDATE_EMAIL: "UPDATE_EMAIL",
  DELETE_EMAIL: "DELETE_EMAIL",
  BULK_UPDATE_EMAILS: "BULK_UPDATE_EMAILS",
  UPDATE_CATEGORIES: "UPDATE_CATEGORIES",
  SET_FILTERS: "SET_FILTERS",
  SET_SEARCH: "SET_SEARCH",
  CLEAR_FILTERS: "CLEAR_FILTERS",
  SELECT_EMAIL: "SELECT_EMAIL",
  SELECT_MULTIPLE_EMAILS: "SELECT_MULTIPLE_EMAILS",
  CLEAR_SELECTION: "CLEAR_SELECTION",
  SELECT_ALL: "SELECT_ALL",
  SET_PAGE: "SET_PAGE",
  UPDATE_PAGINATION: "UPDATE_PAGINATION",
  FETCH_ACCOUNTS_SUCCESS: "FETCH_ACCOUNTS_SUCCESS",
  ADD_ACCOUNT_SUCCESS: "ADD_ACCOUNT_SUCCESS",
  REMOVE_ACCOUNT_SUCCESS: "REMOVE_ACCOUNT_SUCCESS",
  UPDATE_AI_STATS: "UPDATE_AI_STATS",
  REAL_TIME_EMAIL_RECEIVED: "REAL_TIME_EMAIL_RECEIVED",
  REAL_TIME_EMAIL_CLASSIFIED: "REAL_TIME_EMAIL_CLASSIFIED",
  REAL_TIME_STATS_UPDATE: "REAL_TIME_STATS_UPDATE",
};

// Helper functions
const categorizeEmails = (emails) => {
  if (!emails || !Array.isArray(emails)) emails = [];
  const categories = {
    inbox: { count: 0, emails: [] },
    spam: { count: 0, emails: [] },
    promotions: { count: 0, emails: [] },
    social: { count: 0, emails: [] },
    updates: { count: 0, emails: [] },
    forums: { count: 0, emails: [] },
    important: { count: 0, emails: [] },
  };

  emails.forEach((email) => {
    const category = email.aiClassification?.category || "inbox";
    if (categories[category]) {
      categories[category].emails.push(email);
      categories[category].count++;
    }
  });

  return categories;
};

const applyFilters = (emails, filters) => {
  if (!emails || !Array.isArray(emails)) return [];
  let filtered = [...emails];
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(
      (email) =>
        email.subject.toLowerCase().includes(searchTerm) ||
        email.sender.toLowerCase().includes(searchTerm) ||
        email.snippet.toLowerCase().includes(searchTerm),
    );
  }
  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter(
      (email) => email.aiClassification?.category === filters.category,
    );
  }
  if (filters.isRead !== null) {
    filtered = filtered.filter((email) => email.isRead === filters.isRead);
  }
  if (filters.dateRange) {
    const { startDate, endDate } = filters.dateRange;
    filtered = filtered.filter((email) => {
      const emailDate = new Date(email.date);
      return emailDate >= startDate && emailDate <= endDate;
    });
  }
  filtered.sort((a, b) => {
    const order = filters.sortOrder === "asc" ? 1 : -1;
    switch (filters.sortBy) {
      case "date":
        return (new Date(a.date) - new Date(b.date)) * order;
      case "sender":
        return a.sender.localeCompare(b.sender) * order;
      case "subject":
        return a.subject.localeCompare(b.subject) * order;
      default:
        return 0;
    }
  });
  return filtered;
};

const calculatePagination = (totalEmails, currentPage, emailsPerPage) => {
  const totalPages = Math.ceil(totalEmails / emailsPerPage) || 1;
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  return {
    currentPage: validCurrentPage,
    totalPages,
    totalEmails,
    emailsPerPage,
    startIndex: (validCurrentPage - 1) * emailsPerPage,
    endIndex: validCurrentPage * emailsPerPage,
  };
};

// Reducer
const emailReducer = (state, action) => {
  switch (action.type) {
    case EMAIL_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case EMAIL_ACTIONS.SET_SYNCING:
      return { ...state, syncing: action.payload };
    case EMAIL_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        syncing: false,
      };
    case EMAIL_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    case EMAIL_ACTIONS.FETCH_EMAILS_SUCCESS:
      const emails = action.payload || [];
      const categories = categorizeEmails(emails);
      const filteredEmails = applyFilters(emails, state.filters);
      const pagination = calculatePagination(
        filteredEmails.length,
        1,
        state.pagination.emailsPerPage,
      );
      return {
        ...state,
        emails,
        filteredEmails,
        categories,
        pagination,
        loading: false,
        error: null,
      };
    case EMAIL_ACTIONS.FETCH_EMAIL_DETAIL_SUCCESS:
      return { ...state, currentEmail: action.payload, loading: false };
    case EMAIL_ACTIONS.ADD_EMAIL:
      const newEmails = [action.payload, ...state.emails];
      return {
        ...state,
        emails: newEmails,
        filteredEmails: applyFilters(newEmails, state.filters),
        categories: categorizeEmails(newEmails),
      };
    case EMAIL_ACTIONS.UPDATE_EMAIL:
      const updatedEmails = state.emails.map((email) =>
        email.id === action.payload.id
          ? { ...email, ...action.payload }
          : email,
      );
      return {
        ...state,
        emails: updatedEmails,
        filteredEmails: applyFilters(updatedEmails, state.filters),
        categories: categorizeEmails(updatedEmails),
        currentEmail:
          state.currentEmail?.id === action.payload.id
            ? { ...state.currentEmail, ...action.payload }
            : state.currentEmail,
      };
    case EMAIL_ACTIONS.DELETE_EMAIL:
      const remainingEmails = state.emails.filter(
        (email) => email.id !== action.payload,
      );
      return {
        ...state,
        emails: remainingEmails,
        filteredEmails: applyFilters(remainingEmails, state.filters),
        categories: categorizeEmails(remainingEmails),
        selectedEmails: state.selectedEmails.filter(
          (id) => id !== action.payload,
        ),
      };
    case EMAIL_ACTIONS.SET_FILTERS:
      const newFilters = { ...state.filters, ...action.payload };
      const filtered = applyFilters(state.emails, newFilters);
      return {
        ...state,
        filters: newFilters,
        filteredEmails: filtered,
        pagination: calculatePagination(
          filtered.length,
          1,
          state.pagination.emailsPerPage,
        ),
      };
    case EMAIL_ACTIONS.SET_SEARCH:
      const searchFilters = { ...state.filters, search: action.payload };
      const searchFiltered = applyFilters(state.emails, searchFilters);
      return {
        ...state,
        filters: searchFilters,
        filteredEmails: searchFiltered,
        pagination: calculatePagination(
          searchFiltered.length,
          1,
          state.pagination.emailsPerPage,
        ),
      };
    default:
      return state;
  }
};

// API setup
const api = axios.create({ baseURL: API_BASE_URL, timeout: 30000 });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// EmailProvider
export const EmailProvider = ({ children }) => {
  const [state, dispatch] = useReducer(emailReducer, initialState);

  // Socket for real-time updates
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const socket = io(SOCKET_URL || window.location.origin, {
      auth: { token },
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Socket.IO connected successfully:", socket.id);
    });

    socket.on("emailReceived", (email) => {
      dispatch({
        type: EMAIL_ACTIONS.ADD_EMAIL, // Use ADD_EMAIL to avoid re-fetching all
        payload: email,
      });
      toast.success(`New email from ${email.sender}`);
    });

    socket.on("disconnect", () => {
      console.log("Socket.IO disconnected.");
    });

    // The cleanup function will run when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // ✅ FIXED #2: Dependency array is now empty to prevent re-connecting on every update

  // Fetch emails
  const fetchEmails = async () => {
    dispatch({ type: EMAIL_ACTIONS.SET_LOADING, payload: true });
    try {
      const res = await api.get("/emails");
      dispatch({
        type: EMAIL_ACTIONS.FETCH_EMAILS_SUCCESS,
        payload: res.data.emails || [],
      });
      return { success: true, data: res.data };
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch emails";
      dispatch({ type: EMAIL_ACTIONS.SET_ERROR, payload: message });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  return (
    <EmailContext.Provider value={{ ...state, fetchEmails }}>
      {children}
    </EmailContext.Provider>
  );
};

// Hook
export const useEmail = () => {
  const context = useContext(EmailContext);
  if (!context) throw new Error("useEmail must be used within EmailProvider");
  return context;
};

export default EmailContext;
