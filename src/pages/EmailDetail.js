import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeft, Tag } from "lucide-react";
import LoadingSpinner from "../components/common/LoadingSpinner";

const DetailContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[8]};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ClassifyButton = styled.button`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-weight: 500;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const Subject = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const From = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const Body = styled.div`
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const EmailDetail = ({ emails }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const email = emails.find((e) => e.id === id);

  if (!email) {
    return <LoadingSpinner text="Loading email..." fullHeight />;
  }

  const handleClassify = () => {
    // Navigate to the classify page and pass the email object in the state
    navigate("/classify", { state: { email } });
  };

  return (
    <DetailContainer>
      <Header>
        <BackLink to="/emails"><ArrowLeft size={20} /> Back to Inbox</BackLink>
        <ClassifyButton onClick={handleClassify}><Tag size={18} /> Classify</ClassifyButton>
      </Header>
      <Subject>{email.subject}</Subject>
      <From>From: {email.from}</From>
      <Body dangerouslySetInnerHTML={{ __html: email.body }} />
    </DetailContainer>
  );
};

export default EmailDetail;