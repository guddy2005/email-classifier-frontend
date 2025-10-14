import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import styled, { css } from "styled-components";
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/common/LoadingSpinner";

const LoginContainer = styled.div`
  min-height: 100vh;

  display: flex;

  align-items: center;

  justify-content: center;

  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}10 0%,

    ${({ theme }) => theme.colors.secondary}10 100%
  );

  padding: ${({ theme }) => theme.spacing[4]};
`;

const LoginCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};

  border-radius: ${({ theme }) => theme.borderRadius.xl};

  box-shadow: ${({ theme }) => theme.boxShadow.xl};

  padding: ${({ theme }) => theme.spacing[8]};

  width: 100%;

  max-width: 400px;

  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const LogoSection = styled.div`
  text-align: center;

  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const Logo = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};

  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

  color: ${({ theme }) => theme.colors.primary};

  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const Form = styled.form`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing[4]};
`;

const FormGroup = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing[2]};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  color: ${({ theme }) => theme.colors.textPrimary};
`;

const InputWrapper = styled.div`
  position: relative;

  display: flex;

  align-items: center;
`;

const Input = styled.input`
  width: 100%;

  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};

  padding-left: ${({ theme }) => theme.spacing[10]};

  padding-right: ${({ $hasButton, theme }) =>
    $hasButton ? theme.spacing[10] : theme.spacing[4]};

  border: 1px solid
    ${({ theme, $error }) =>
      $error ? theme.colors.error : theme.colors.border};

  border-radius: ${({ theme }) => theme.borderRadius.md};

  background: ${({ theme }) => theme.colors.background};

  font-size: ${({ theme }) => theme.typography.fontSize.base};

  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;

    border-color: ${({ theme, $error }) =>
      $error ? theme.colors.error : theme.colors.primary};

    box-shadow: 0 0 0 3px
      ${({ theme, $error }) =>
        $error ? `${theme.colors.error}20` : `${theme.colors.primary}20`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

const InputIcon = styled.div`
  position: absolute;

  left: ${({ theme }) => theme.spacing[3]};

  color: ${({ theme, $error }) =>
    $error ? theme.colors.error : theme.colors.textTertiary};

  display: flex;

  align-items: center;

  z-index: 1;

  svg {
    width: 18px;

    height: 18px;
  }
`;

const InputButton = styled.button`
  position: absolute;

  right: ${({ theme }) => theme.spacing[3]};

  background: none;

  border: none;

  color: ${({ theme }) => theme.colors.textTertiary};

  cursor: pointer;

  display: flex;

  align-items: center;

  transition: color ${({ theme }) => theme.transitions.fast};

  z-index: 1;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  svg {
    width: 18px;

    height: 18px;
  }
`;

const ErrorMessage = styled.div`
  display: flex;

  align-items: center;

  gap: ${({ theme }) => theme.spacing[1]};

  color: ${({ theme }) => theme.colors.error};

  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  margin-top: ${({ theme }) => theme.spacing[1]};

  svg {
    width: 14px;

    height: 14px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;

  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};

  background: ${({ theme }) => theme.colors.primary};

  color: ${({ theme }) => theme.colors.white};

  border: none;

  border-radius: ${({ theme }) => theme.borderRadius.md};

  font-size: ${({ theme }) => theme.typography.fontSize.base};

  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  cursor: pointer;

  transition: all ${({ theme }) => theme.transitions.fast};

  display: flex;

  align-items: center;

  justify-content: center;

  gap: ${({ theme }) => theme.spacing[2]};

  min-height: 48px;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};

    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.gray400};

    cursor: not-allowed;

    transform: none;
  }

  svg {
    width: 18px;

    height: 18px;
  }
`;

const ForgotPassword = styled(Link)`
  text-align: center;

  color: ${({ theme }) => theme.colors.primary};

  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  text-decoration: none;

  margin-top: ${({ theme }) => theme.spacing[2]};

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  text-align: center;

  margin: ${({ theme }) => theme.spacing[6]} 0;

  color: ${({ theme }) => theme.colors.textTertiary};

  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  position: relative;

  &::before {
    content: "";

    position: absolute;

    top: 50%;

    left: 0;

    right: 0;

    height: 1px;

    background: ${({ theme }) => theme.colors.border};

    z-index: 0;
  }

  span {
    background: ${({ theme }) => theme.colors.surface};

    padding: 0 ${({ theme }) => theme.spacing[4]};

    position: relative;

    z-index: 1;
  }
`;

const SignupLink = styled.div`
  text-align: center;

  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  a {
    color: ${({ theme }) => theme.colors.primary};

    text-decoration: none;

    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth(); // login is from context

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const formValues = useWatch({ control, name: ["email", "password"] });
  useEffect(() => {
    if (apiError) setApiError(null);
  }, [formValues, apiError]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError(null);

    // Use the login function from AuthContext
    const result = await login(data.email, data.password);

    if (!result.success) {
      setApiError(result.error);
    }

    setIsLoading(false);
    // No need to navigate here, the useEffect will handle it when isAuthenticated becomes true
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LogoSection>
          <Logo>Email Classifier</Logo>
          <Subtitle>AI-powered email management</Subtitle>
        </LogoSection>

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <InputWrapper>
              <InputIcon $error={!!errors.email}>
                <Mail />
              </InputIcon>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                $error={!!errors.email}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
              />
            </InputWrapper>
            {errors.email && (
              <ErrorMessage>
                <AlertCircle />
                {errors.email.message}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <InputWrapper>
              <InputIcon $error={!!errors.password}>
                <Lock />
              </InputIcon>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                $error={!!errors.password}
                $hasButton
                {...register("password", { required: "Password is required" })}
              />
              <InputButton type="button" onClick={togglePasswordVisibility}>
                {showPassword ? <EyeOff /> : <Eye />}
              </InputButton>
            </InputWrapper>
            {errors.password && (
              <ErrorMessage>
                <AlertCircle />
                {errors.password.message}
              </ErrorMessage>
            )}
          </FormGroup>

          {apiError && (
            <ErrorMessage style={{ justifyContent: "center" }}>
              <AlertCircle />
              {apiError}
            </ErrorMessage>
          )}

          <SubmitButton type="submit" disabled={!isValid || isLoading}>
            {isLoading ? (
              <LoadingSpinner size="sm" color="white" />
            ) : (
              <>
                <LogIn /> Sign In
              </>
            )}
          </SubmitButton>

          <ForgotPassword to="/forgot-password">
            Forgot your password?
          </ForgotPassword>
        </Form>

        <Divider>
          <span>or</span>
        </Divider>

        <SignupLink>
          Don't have an account? <Link to="/signup">Create one here</Link>
        </SignupLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
