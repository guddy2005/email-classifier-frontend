import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  UserPlus,
  AlertCircle,
  Check,
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/common/LoadingSpinner";

const SignupContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.secondary}10 0%,
    ${({ theme }) => theme.colors.primary}10 100%
  );
  padding: ${({ theme }) => theme.spacing[4]};
`;

const SignupCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.boxShadow.xl};
  padding: ${({ theme }) => theme.spacing[8]};
  width: 100%;
  max-width: 450px;
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
  padding-right: ${({ hasButton, theme }) =>
    hasButton ? theme.spacing[10] : theme.spacing[4]};
  border: 1px solid
    ${({ theme, error, success }) =>
      error
        ? theme.colors.error
        : success
          ? theme.colors.success
          : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme, error, success }) =>
      error
        ? theme.colors.error
        : success
          ? theme.colors.success
          : theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${({ theme, error, success }) =>
        error
          ? theme.colors.error
          : success
            ? theme.colors.success
            : theme.colors.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme, error, success }) =>
    error
      ? theme.colors.error
      : success
        ? theme.colors.success
        : theme.colors.textTertiary};
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

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing[1]};

  svg {
    width: 14px;
    height: 14px;
  }
`;

const PasswordStrengthContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing[2]};
`;

const PasswordStrengthBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const PasswordStrengthFill = styled.div`
  height: 100%;
  width: ${({ strength }) => strength * 25}%;
  background: ${({ theme, strength }) => {
    if (strength <= 1) return theme.colors.error;
    if (strength <= 2) return theme.colors.warning;
    if (strength <= 3) return theme.colors.info;
    return theme.colors.success;
  }};
  transition: all ${({ theme }) => theme.transitions.normal};
`;

const PasswordStrengthText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme, strength }) => {
    if (strength <= 1) return theme.colors.error;
    if (strength <= 2) return theme.colors.warning;
    if (strength <= 3) return theme.colors.info;
    return theme.colors.success;
  }};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const PasswordRequirements = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${({ theme }) => theme.spacing[2]} 0 0 0;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};

  li {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[1]};
    margin-bottom: ${({ theme }) => theme.spacing[1]};
    color: ${({ theme }) => theme.colors.textTertiary};

    &.met {
      color: ${({ theme }) => theme.colors.success};
    }

    svg {
      width: 12px;
      height: 12px;
    }
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

const LoginLink = styled.div`
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

const TermsCheckbox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[3]};
  margin: ${({ theme }) => theme.spacing[2]} 0;

  input[type="checkbox"] {
    margin: 0;
    width: auto;
    min-width: 16px;
    height: 16px;
    margin-top: 2px;
  }

  label {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.textSecondary};

    a {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const {
    register: registerUser,
    isAuthenticated,
    error,
    clearErrors,
  } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      // --- CHANGED HERE ---
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const watchPassword = watch("password", "");
  const watchConfirmPassword = watch("confirmPassword", "");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  useEffect(() => {
    const calculateStrength = (password) => {
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
      if (/\d/.test(password)) strength++;
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
      return strength;
    };
    setPasswordStrength(calculateStrength(watchPassword));
  }, [watchPassword]);

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "Weak";
    }
  };

  const passwordRequirements = [
    { text: "At least 8 characters", met: watchPassword.length >= 8 },
    {
      text: "Contains uppercase and lowercase",
      met: /[a-z]/.test(watchPassword) && /[A-Z]/.test(watchPassword),
    },
    { text: "Contains a number", met: /\d/.test(watchPassword) },
    {
      text: "Contains special character",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(watchPassword),
    },
  ];

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // --- CHANGED HERE ---
      const userData = {
        username: data.username,
        email: data.email,
        password: data.password,
      };

      const result = await registerUser(userData);

      if (result.success) {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <SignupContainer>
      <SignupCard>
        <LogoSection>
          <Logo>Join Email Classifier</Logo>
          <Subtitle>Start organizing your emails with AI</Subtitle>
        </LogoSection>

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* --- CHANGED HERE --- */}
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <InputWrapper>
              <InputIcon error={errors.username}>
                <User />
              </InputIcon>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                error={errors.username}
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
              />
            </InputWrapper>
            {errors.username && (
              <ErrorMessage>
                <AlertCircle />
                {errors.username.message}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <InputWrapper>
              <InputIcon error={errors.email}>
                <Mail />
              </InputIcon>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                error={errors.email}
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
              <InputIcon error={errors.password}>
                <Lock />
              </InputIcon>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                error={errors.password}
                hasButton
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  validate: (value) => {
                    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
                      return "Password must contain both uppercase and lowercase letters";
                    }
                    if (!/(?=.*\d)/.test(value)) {
                      return "Password must contain at least one number";
                    }
                    return true;
                  },
                })}
                onChange={() => trigger("confirmPassword")}
              />
              <InputButton
                type="button"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </InputButton>
            </InputWrapper>
            {watchPassword && (
              <PasswordStrengthContainer>
                <PasswordStrengthBar>
                  <PasswordStrengthFill strength={passwordStrength} />
                </PasswordStrengthBar>
                <PasswordStrengthText strength={passwordStrength}>
                  Password strength: {getPasswordStrengthText(passwordStrength)}
                </PasswordStrengthText>
                <PasswordRequirements>
                  {passwordRequirements.map((req, index) => (
                    <li key={index} className={req.met ? "met" : ""}>
                      <Check />
                      {req.text}
                    </li>
                  ))}
                </PasswordRequirements>
              </PasswordStrengthContainer>
            )}
            {errors.password && (
              <ErrorMessage>
                <AlertCircle />
                {errors.password.message}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <InputWrapper>
              <InputIcon
                error={errors.confirmPassword}
                success={
                  watchConfirmPassword &&
                  watchConfirmPassword === watchPassword &&
                  watchPassword.length >= 8
                }
              >
                <Lock />
              </InputIcon>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                error={errors.confirmPassword}
                success={
                  watchConfirmPassword &&
                  watchConfirmPassword === watchPassword &&
                  watchPassword.length >= 8
                }
                hasButton
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watchPassword || "Passwords do not match",
                })}
              />
              <InputButton
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </InputButton>
            </InputWrapper>
            {errors.confirmPassword && (
              <ErrorMessage>
                <AlertCircle />
                {errors.confirmPassword.message}
              </ErrorMessage>
            )}
            {!errors.confirmPassword &&
              watchConfirmPassword &&
              watchConfirmPassword === watchPassword &&
              watchPassword.length >= 8 && (
                <SuccessMessage>
                  <Check />
                  Passwords match
                </SuccessMessage>
              )}
          </FormGroup>

          <TermsCheckbox>
            <input
              type="checkbox"
              id="acceptTerms"
              {...register("acceptTerms", {
                required: "You must accept the terms and conditions",
              })}
            />
            <label htmlFor="acceptTerms">
              I agree to the{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </label>
          </TermsCheckbox>
          {errors.acceptTerms && (
            <ErrorMessage>
              <AlertCircle />
              {errors.acceptTerms.message}
            </ErrorMessage>
          )}

          {error && (
            <ErrorMessage>
              <AlertCircle />
              {error}
            </ErrorMessage>
          )}

          <SubmitButton type="submit" disabled={!isValid || isLoading}>
            {isLoading ? (
              <LoadingSpinner size="sm" color="white" />
            ) : (
              <>
                <UserPlus />
                Create Account
              </>
            )}
          </SubmitButton>
        </Form>

        <Divider>
          <span>or</span>
        </Divider>

        <LoginLink>
          Already have an account? <Link to="/login">Sign in here</Link>
        </LoginLink>
      </SignupCard>
    </SignupContainer>
  );
};

export default Signup;
