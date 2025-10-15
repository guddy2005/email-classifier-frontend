import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ChevronDown, LogOut } from "lucide-react";

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const Menu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  min-width: 200px;
  margin-top: ${({ theme }) => theme.spacing[1]};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.boxShadow.lg};
  padding: ${({ theme }) => theme.spacing[1]};
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const MenuItem = styled.button`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  background: none;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  text-align: left;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.textPrimary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }

  &:focus {
    outline: none;
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const Dropdown = ({ trigger, items, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const triggerNode = React.cloneElement(trigger, {
    onClick: () => setIsOpen(!isOpen),
  });

  return (
    <Container ref={containerRef}>
      {triggerNode}
      <Menu isOpen={isOpen}>
        {items.map((item) => (
          <MenuItem
            key={item.value}
            active={item.value === value}
            onClick={() => handleSelect(item.value)}
          >
            {item.icon}
            {item.label}
            {item.value === value && item.value !== "logout" && (
              <ChevronDown size={16} />
            )}
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
};

Dropdown.propTypes = {
  trigger: PropTypes.element.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Dropdown;
