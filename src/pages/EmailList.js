import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EmailListContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const EmailItem = styled(Link)`
  display: block;
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-decoration: none;
  color: inherit;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.boxShadow.md};
    transform: translateY(-2px);
  }
`;

const EmailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const From = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const DateText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const Subject = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const Snippet = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EmailList = ({ emails }) => {
  return (
    <EmailListContainer>
      <h1>Inbox</h1>
      {emails.map((email) => (
        <EmailItem key={email.id} to={`/dashboard/emails/${email.id}`}>
          <EmailHeader>
            <From>{email.from}</From>
            <DateText>{new Date(email.date).toLocaleDateString()}</DateText>
          </EmailHeader>
          <Subject>{email.subject}</Subject>
          <Snippet>{email.snippet}</Snippet>
        </EmailItem>
      ))}
    </EmailListContainer>
  );
};

export default EmailList;