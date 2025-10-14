import React from 'react';
import styled from 'styled-components';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: ${({ theme }) => theme.spacing[8]};
  text-align: center;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 2px dashed ${({ theme }) => theme.colors.error};
  margin: ${({ theme }) => theme.spacing[4]};
`;

const ErrorIcon = styled.div`
  width: 64px;
  height: 64px;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  color: ${({ theme }) => theme.colors.error};

  svg {
    width: 100%;
    height: 100%;
  }
`;

const ErrorTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  max-width: 600px;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

const ErrorDetails = styled.details`
  margin: ${({ theme }) => theme.spacing[4]} 0;
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  max-width: 600px;
  width: 100%;

  summary {
    cursor: pointer;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.textPrimary};
    padding: ${({ theme }) => theme.spacing[2]};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    transition: background-color ${({ theme }) => theme.transitions.fast};

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray100};
    }
  }
`;

const ErrorStack = styled.pre`
  background: ${({ theme }) => theme.colors.gray800};
  color: ${({ theme }) => theme.colors.gray100};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow-x: auto;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  white-space: pre-wrap;
  word-break: break-word;
  margin-top: ${({ theme }) => theme.spacing[3]};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  flex-wrap: wrap;
  justify-content: center;
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  border: 1px solid ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.primary : theme.colors.border
  };
  background: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.primary : theme.colors.surface
  };
  color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.white : theme.colors.textPrimary
  };
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme, variant }) =>
      variant === 'primary' ? theme.colors.primaryHover : theme.colors.surfaceHover
    };
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ErrorInfo = styled.div`
  margin-top: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-left: 4px solid ${({ theme }) => theme.colors.warning};
  max-width: 600px;
  text-align: left;

  h4 {
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: ${({ theme }) => theme.spacing[2]};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  ul {
    margin: 0;
    padding-left: ${({ theme }) => theme.spacing[5]};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing[1]};
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console for development
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Store error details in state
    this.setState({
      error,
      errorInfo,
      eventId: Date.now().toString()
    });

    // Report to error tracking service in production
    if (process.env.NODE_ENV === 'production' && this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReload = () => {
    window.location.reload();
  };

  handleReportBug = () => {
    const { error, errorInfo, eventId } = this.state;
    const errorReport = {
      error: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      eventId,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };

    // Open email client or redirect to bug report form
    const subject = encodeURIComponent(`Bug Report: ${error?.message || 'Application Error'}`);
    const body = encodeURIComponent(`
Error Details:
${JSON.stringify(errorReport, null, 2)}

Please describe what you were doing when this error occurred:
[Your description here]
    `);

    window.open(`mailto:support@example.com?subject=${subject}&body=${body}`);
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const {
      children,
      fallback,
      title = "Oops! Something went wrong",
      message = "We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.",
      showDetails = process.env.NODE_ENV === 'development',
      showRetry = true,
      showReportBug = true
    } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback(error, errorInfo);
      }

      return (
        <ErrorContainer className="error-boundary">
          <ErrorIcon>
            <AlertTriangle />
          </ErrorIcon>

          <ErrorTitle>{title}</ErrorTitle>

          <ErrorMessage>
            {message}
          </ErrorMessage>

          {showDetails && error && (
            <ErrorDetails>
              <summary>Technical Details</summary>
              <ErrorStack>
                <strong>Error:</strong> {error.message}
                {error.stack && (
                  <>
                    <br /><br />
                    <strong>Stack Trace:</strong>
                    <br />
                    {error.stack}
                  </>
                )}
                {errorInfo?.componentStack && (
                  <>
                    <br /><br />
                    <strong>Component Stack:</strong>
                    <br />
                    {errorInfo.componentStack}
                  </>
                )}
              </ErrorStack>
            </ErrorDetails>
          )}

          <ActionButtons>
            {showRetry && (
              <ActionButton variant="primary" onClick={this.handleRetry}>
                <RefreshCw />
                Try Again
              </ActionButton>
            )}

            <ActionButton onClick={this.handleReload}>
              <RefreshCw />
              Reload Page
            </ActionButton>

            <ActionButton onClick={this.handleGoHome}>
              <Home />
              Go Home
            </ActionButton>

            {showReportBug && (
              <ActionButton onClick={this.handleReportBug}>
                <Bug />
                Report Bug
              </ActionButton>
            )}
          </ActionButtons>

          {!showDetails && (
            <ErrorInfo>
              <h4>What can you do?</h4>
              <ul>
                <li>Try refreshing the page</li>
                <li>Clear your browser cache and cookies</li>
                <li>Try using a different browser</li>
                <li>Check your internet connection</li>
                <li>Contact support if the problem persists</li>
              </ul>
            </ErrorInfo>
          )}
        </ErrorContainer>
      );
    }

    return children;
  }
}

// Higher-order component for wrapping components with error boundary
export const withErrorBoundary = (Component, errorBoundaryProps = {}) => {
  return function WrappedComponent(props) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
};

// Hook for handling errors in functional components
export const useErrorHandler = () => {
  return (error, errorInfo) => {
    console.error('Error caught by error handler:', error, errorInfo);

    // You can add additional error reporting logic here
    if (process.env.NODE_ENV === 'production') {
      // Report to error tracking service
    }

    throw error; // Re-throw to trigger error boundary
  };
};

// Simple error boundary for specific sections
export const SimpleErrorBoundary = ({ children, message = "Something went wrong in this section." }) => (
  <ErrorBoundary
    title="Section Error"
    message={message}
    showDetails={false}
    showReportBug={false}
  >
    {children}
  </ErrorBoundary>
);

export default ErrorBoundary;
