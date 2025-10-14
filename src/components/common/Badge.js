import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[2]}`};
  background: ${({ theme, color }) =>
    color ? `${color}15` : theme.colors.primary + "15"};
  color: ${({ theme, color }) => color || theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1;
  white-space: nowrap;

  svg {
    width: 14px;
    height: 14px;
    margin-right: ${({ theme }) => theme.spacing[1]};
  }
`;

const Badge = ({ children, color, icon: Icon }) => {
  return (
    <Container color={color}>
      {Icon && <Icon size={14} />}
      {children}
    </Container>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  icon: PropTypes.elementType,
};

export default Badge;
