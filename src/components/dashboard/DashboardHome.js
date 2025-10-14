import React, { useState } from "react";
import styled from "styled-components";
import { Mail, Link } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../../styles/api";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../common/LoadingSpinner";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  padding: ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ theme }) => `${theme.colors.primary}15`};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 500px;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const ConnectButton = styled.button`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  transition: background-color 0.2s;
  min-height: 44px;
  min-width: 220px;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.gray400};
    cursor: not-allowed;
  }
`;

const DashboardHome = ({ refetchEmails }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectGoogle = async () => {
    setIsConnecting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication error. Please log in again.");
        return;
      }

      const { data } = await axios.get(`${API_BASE_URL.replace(/\/?$/, "")}/auth/google-url`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const popup = window.open(data.url, "_blank", "width=600,height=700");

      const timer = setInterval(() => {
        if (!popup || popup.closed) {
          clearInterval(timer);
          refetchEmails();
          setIsConnecting(false);
        }
      }, 500);
    } catch (error) {
      console.error("Error connecting to Google:", error);
      toast.error("Could not connect to Google. Please try again.");
      setIsConnecting(false);
    }
  };

  return (
    <HomeContainer>
      <IconWrapper>
        <Mail size={40} />
      </IconWrapper>
      <Title>Welcome to Your AI Email Classifier</Title>
      <Subtitle>
        Connect your email account to get started. We'll automatically fetch and
        categorize your recent emails.
      </Subtitle>
      <ConnectButton onClick={handleConnectGoogle} disabled={isConnecting}>
        {isConnecting ? (
          <LoadingSpinner size="sm" color="white" />
        ) : (
          <>
            <Link size={20} />
            Connect Google Account
          </>
        )}
      </ConnectButton>
    </HomeContainer>
  );
};

export default DashboardHome;