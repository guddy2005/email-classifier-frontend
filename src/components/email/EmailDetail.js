import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "../common/LoadingSpinner";

import { ArrowLeft } from "lucide-react";
import allEmails from "../../data.json"; // Simulate a data source

const DetailContainer = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  h1 {
    font-size: 1.5rem;
    margin: 0;
  }

  p {
    margin: 0.5rem 0 0;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Body = styled.div`
  line-height: 1.6;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 1rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const EmailDetail = () => {
  const { id } = useParams();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate an API call to fetch the email by its ID
    const foundEmail = allEmails.find((e) => e.id === id);
    setEmail(foundEmail);
    setLoading(false);
  }, [id]);

  // If emails are not loaded yet, or the specific email isn't found
  if (loading || !email) {
    return <LoadingSpinner />;
  }

  return (
    <DetailContainer>
      <BackLink to="/dashboard/emails">
        <ArrowLeft size={20} /> Back to Inbox
      </BackLink>
      <Header>
        <h1>{email.subject}</h1>
        <p>From: {email.from}</p>
      </Header>
      <Body dangerouslySetInnerHTML={{ __html: email.body }} />
    </DetailContainer>
  );
};

export default EmailDetail;