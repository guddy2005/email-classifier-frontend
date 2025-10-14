import React from "react";
import styled from "styled-components";
import {
  Inbox,
  BarChart2,
  Settings,
  LogOut,
  ChevronsLeft,
  Menu,
  Tag,
  MailPlus,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const SidebarWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.surface};
`;

const NavList = styled.nav`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  font-weight: 500;
  gap: ${({ theme }) => theme.spacing[3]};

  &.active,
  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CategoryItem = styled.button`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  font-weight: 500;
  gap: ${({ theme }) => theme.spacing[3]};
  cursor: pointer;

  &.active,
  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing[4]} 0;
`;

const Sidebar = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const { logout } = useAuth();

  return (
    <SidebarWrapper>
      <NavList>
        <h3>Categories</h3>
        {categories.map((category) => (
          <CategoryItem
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => onSelectCategory(category)}
          >
            <Tag size={20} />
            <span>{category}</span>
          </CategoryItem>
        ))}
        <Divider />
        <NavItem to="/dashboard/classify">
          <MailPlus size={20} />
          <span>Classify</span>
        </NavItem>
        <NavItem to="/dashboard/analytics">
          <BarChart2 size={20} />
          <span>Analytics</span>
        </NavItem>
        <NavItem to="/dashboard/settings">
          <Settings size={20} />
          <span>Settings</span>
        </NavItem>
      </NavList>
      <NavItem to="/login" onClick={logout}>
        <LogOut size={20} />
        <span>Logout</span>
      </NavItem>
    </SidebarWrapper>
  );
};

export default Sidebar;