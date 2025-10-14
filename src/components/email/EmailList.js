import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "../common/LoadingSpinner";

const ListContainer = styled.div`
  padding: 1rem;
`;

const EmailItem = styled(Link)`
  display: block;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textPrimary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }

  h3 {
    margin: 0 0 0.25rem;
    font-size: 1rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const EmailList = ({ emails, selectedCategory }) => {
  if (!emails) return <LoadingSpinner />;
  
  if (emails.length === 0) {
    return (
      <ListContainer>
        <h2>No emails found in {selectedCategory}.</h2>
      </ListContainer>
    );
  }
  return (
    <ListContainer>
      <h2>{selectedCategory}</h2>
      {emails.map((email) => (
        <EmailItem key={email.id} to={`/dashboard/emails/${email.id}`}>
          <h3>{email.subject}</h3>
          <p>{email.snippet}</p>
        </EmailItem>
      ))}
    </ListContainer>
  );
};

export default EmailList;