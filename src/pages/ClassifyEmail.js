import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { API_BASE_URL } from '../styles/api';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.lg};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  min-height: 100px;
`;

const Button = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const ResultContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ClassifyEmail = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setCategory(null);
    const token = localStorage.getItem('token');
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.post(`${API_BASE_URL}/emails/classify`, data, config);
      setCategory(res.data.category);
      toast.success('Email classified successfully!');
    } catch (error) {
      toast.error('Failed to classify email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <h2>Classify a Single Email</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            {...register('subject', { required: 'Subject is required' })}
          />
          {errors.subject && <p>{errors.subject.message}</p>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="snippet">Snippet</Label>
          <Textarea
            id="snippet"
            {...register('snippet', { required: 'Snippet is required' })}
          />
          {errors.snippet && <p>{errors.snippet.message}</p>}
        </FormGroup>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Classifying...' : 'Classify Email'}
        </Button>
      </form>
      {category && (
        <ResultContainer>
          <h3>Classification Result</h3>
          <p>Category: {category}</p>
        </ResultContainer>
      )}
    </FormContainer>
  );
};

export default ClassifyEmail;
