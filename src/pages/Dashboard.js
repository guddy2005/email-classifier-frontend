import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "../contexts/AuthContext";
import { useSettings } from "../contexts/SettingsContext";

import emailsData from "../data.json"; // Import the email data
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmailList from "../components/email/EmailList";
import EmailDetail from "../components/email/EmailDetail";
import Analytics from "./Analytics";
import Settings from "./Settings";
import ClassifyEmail from "./ClassifyEmail";

const GlobalStyle = createGlobalStyle`
  /* Remove the default blue outline on focused elements */
  button:focus, a:focus, input:focus {
    outline: none;
    -webkit-tap-highlight-color: transparent; /* For mobile */
  }
`;

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const SidebarContainer = styled(motion.div)`
  width: ${({ theme, collapsed }) =>
    collapsed ? "0" : theme.layout.sidebar.width};
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid
    ${({ theme, collapsed }) =>
      collapsed ? "transparent" : theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.normal};
  z-index: ${({ theme }) => theme.zIndex.docked};
  overflow: hidden;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: ${({ collapsed }) => (collapsed ? "-280px" : "0")};
    height: 100vh;
    width: 280px;
    box-shadow: ${({ theme, collapsed }) =>
      collapsed ? "none" : theme.boxShadow.xl};
    z-index: ${({ theme }) => theme.zIndex.overlay};
    border-right: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const HeaderContainer = styled.div`
  height: ${({ theme }) => theme.layout.header.height};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  z-index: ${({ theme }) => theme.zIndex.sticky};
  position: sticky;
  top: 0;
`;

const ContentContainer = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[6]};
  max-width: ${({ theme }) => theme.layout.content.maxWidth};
  margin: 0 auto;
  width: 100%;
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

const MobileOverlay = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${({ theme }) => theme.zIndex.overlay - 1};
  @media (max-width: 768px) {
    display: block;
  }
`;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { sidebarCollapsed, toggleSidebar } = useSettings();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All Mail");
  const [searchQuery, setSearchQuery] = useState("");

  const [emails] = useState(emailsData);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    if (isMobile) {
      setShowMobileMenu(false);
    }
    // Navigate to the main email list view when a category is selected
    navigate("/dashboard/emails");
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const categoryFilteredEmails =
    selectedCategory === "All Mail"
      ? emails
      : emails.filter((email) => email.category === selectedCategory);

  const filteredEmails = categoryFilteredEmails.filter((email) => {
    const query = searchQuery.toLowerCase();
    return (
      email.subject.toLowerCase().includes(query) ||
      email.from.toLowerCase().includes(query) ||
      email.snippet.toLowerCase().includes(query)
    );
  });

  const emailCategories = ["All Mail", ...new Set(emails.map((e) => e.category))];

  const handleMobileMenuToggle = () => {
    if (isMobile) {
      setShowMobileMenu(!showMobileMenu);
    } else {
      toggleSidebar();
    }
  };

  // We are using static data, so no loading state is needed for emails.

  return (
    <DashboardContainer>
      <GlobalStyle />
      <AnimatePresence>
        {showMobileMenu && isMobile && (
          <MobileOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMobileMenu(false)}
          />
        )}
      </AnimatePresence>

      <SidebarContainer
        collapsed={isMobile ? !showMobileMenu : sidebarCollapsed}
      >
        <Sidebar
          collapsed={isMobile ? !showMobileMenu : sidebarCollapsed}
          onToggle={handleMobileMenuToggle}
          isMobile={isMobile}
          categories={emailCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      </SidebarContainer>

      <MainContainer>
        <HeaderContainer>
          <Header
            user={user}
            onMenuToggle={handleMobileMenuToggle}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        </HeaderContainer>

        <ContentContainer>
          <Routes>
            <Route path="/" element={<EmailList emails={filteredEmails} selectedCategory={selectedCategory} />} />
            <Route path="/emails" element={<EmailList emails={filteredEmails} selectedCategory={selectedCategory} />} />
            <Route path="/emails/:id" element={<EmailDetail />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/classify" element={<ClassifyEmail />} />
          </Routes>
        </ContentContainer>
      </MainContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
