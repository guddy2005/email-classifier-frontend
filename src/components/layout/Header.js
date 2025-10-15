import React from "react";
import styled from "styled-components";
import {
  Menu,
  Search,
  User as UserIcon,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";
import { useSettings } from "../../contexts/SettingsContext";
import { useAuth } from "../../contexts/AuthContext";
import Dropdown from "../common/Dropdown";

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing[6]};
  height: 100%;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem 0.75rem 3rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  width: 300px;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}30;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ProfileName = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Header = ({ user, onMenuToggle, searchQuery, onSearchChange }) => {
  const { theme, toggleTheme } = useSettings();
  const { logout } = useAuth();

  const handleDropdownChange = (value) => {
    if (value === "logout") {
      logout();
    }
  };

  return (
    <HeaderWrapper>
      <LeftSection>
        <MenuButton onClick={onMenuToggle}>
          <Menu size={24} />
        </MenuButton>
        <SearchWrapper>
          <SearchIcon size={20} />
          <SearchInput
            type="text"
            placeholder="Search mail"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </SearchWrapper>
      </LeftSection>
      <RightSection>
        <MenuButton onClick={toggleTheme}>
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </MenuButton>
        <Dropdown
          trigger={
            <ProfileSection>
              <UserIcon size={24} />
              <ProfileName>{user ? user.username : "User"}</ProfileName>
            </ProfileSection>
          }
          items={[
            { label: "Logout", value: "logout", icon: <LogOut size={16} /> },
          ]}
          onChange={handleDropdownChange}
        />
      </RightSection>
    </HeaderWrapper>
  );
};

export default Header;
