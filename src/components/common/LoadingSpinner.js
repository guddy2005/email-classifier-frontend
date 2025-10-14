import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme, size }) => {
    switch (size) {
      case 'sm': return theme.spacing[4];
      case 'lg': return theme.spacing[12];
      case 'xl': return theme.spacing[16];
      default: return theme.spacing[8];
    }
  }};
  min-height: ${({ fullHeight }) => fullHeight ? '100vh' : 'auto'};
  width: 100%;
`;

const Spinner = styled.div`
  width: ${({ size }) => {
    switch (size) {
      case 'sm': return '20px';
      case 'lg': return '48px';
      case 'xl': return '64px';
      default: return '32px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'sm': return '20px';
      case 'lg': return '48px';
      case 'xl': return '64px';
      default: return '32px';
    }
  }};
  border: ${({ size, theme }) => {
    const width = size === 'sm' ? '2px' : size === 'lg' ? '4px' : size === 'xl' ? '5px' : '3px';
    return `${width} solid ${theme.colors.gray200}`;
  }};
  border-top: ${({ size, theme, color }) => {
    const width = size === 'sm' ? '2px' : size === 'lg' ? '4px' : size === 'xl' ? '5px' : '3px';
    const spinnerColor = color === 'white' ? theme.colors.white :
                        color === 'secondary' ? theme.colors.secondary :
                        theme.colors.primary;
    return `${width} solid ${spinnerColor}`;
  }};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const DotsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const Dot = styled.div`
  width: ${({ size }) => {
    switch (size) {
      case 'sm': return '6px';
      case 'lg': return '12px';
      case 'xl': return '16px';
      default: return '8px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'sm': return '6px';
      case 'lg': return '12px';
      case 'xl': return '16px';
      default: return '8px';
    }
  }};
  border-radius: 50%;
  background-color: ${({ theme, color }) => {
    switch (color) {
      case 'white': return theme.colors.white;
      case 'secondary': return theme.colors.secondary;
      default: return theme.colors.primary;
    }
  }};
  animation: ${pulse} 1.4s ease-in-out infinite both;
  animation-delay: ${({ delay }) => delay}s;
`;

const LoadingText = styled.p`
  margin-top: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme, color }) => {
    switch (color) {
      case 'white': return theme.colors.white;
      case 'secondary': return theme.colors.textSecondary;
      default: return theme.colors.textPrimary;
    }
  }};
  font-size: ${({ theme, size }) => {
    switch (size) {
      case 'sm': return theme.typography.fontSize.sm;
      case 'lg': return theme.typography.fontSize.lg;
      case 'xl': return theme.typography.fontSize.xl;
      default: return theme.typography.fontSize.base;
    }
  }};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
`;

const SkeletonContainer = styled.div`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth || '400px'};
  padding: ${({ theme }) => theme.spacing[4]};
`;

const SkeletonLine = styled.div`
  height: ${({ height }) => height || '16px'};
  width: ${({ width }) => width || '100%'};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.gray200} 25%,
    ${({ theme }) => theme.colors.gray100} 50%,
    ${({ theme }) => theme.colors.gray200} 75%
  );
  background-size: 200% 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme, spacing }) => spacing || theme.spacing[3]};
  animation: ${keyframes`
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  `} 2s ease-in-out infinite;
`;

const LoadingSpinner = ({
  size = 'md',
  color = 'primary',
  text,
  variant = 'spinner',
  fullHeight = false,
  className,
  ...props
}) => {
  if (variant === 'dots') {
    return (
      <SpinnerContainer size={size} fullHeight={fullHeight} className={className} {...props}>
        <DotsContainer>
          <Dot size={size} color={color} delay={0} />
          <Dot size={size} color={color} delay={0.2} />
          <Dot size={size} color={color} delay={0.4} />
        </DotsContainer>
        {text && (
          <LoadingText size={size} color={color}>
            {text}
          </LoadingText>
        )}
      </SpinnerContainer>
    );
  }

  if (variant === 'skeleton') {
    return (
      <SkeletonContainer className={className} {...props}>
        <SkeletonLine width="75%" height="20px" />
        <SkeletonLine width="100%" />
        <SkeletonLine width="90%" />
        <SkeletonLine width="60%" />
      </SkeletonContainer>
    );
  }

  return (
    <SpinnerContainer size={size} fullHeight={fullHeight} className={className} {...props}>
      <Spinner size={size} color={color} />
      {text && (
        <LoadingText size={size} color={color}>
          {text}
        </LoadingText>
      )}
    </SpinnerContainer>
  );
};

// Preset loading components for common use cases
export const PageLoader = ({ text = "Loading..." }) => (
  <LoadingSpinner
    size="lg"
    text={text}
    fullHeight
    color="primary"
  />
);

export const ButtonLoader = ({ text = "Loading..." }) => (
  <LoadingSpinner
    size="sm"
    text={text}
    variant="dots"
    color="white"
  />
);

export const CardLoader = () => (
  <LoadingSpinner
    variant="skeleton"
    maxWidth="100%"
  />
);

export const InlineLoader = ({ size = "sm", color = "primary" }) => (
  <LoadingSpinner
    size={size}
    color={color}
    variant="dots"
  />
);

export default LoadingSpinner;
