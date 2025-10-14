import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSettings } from "../contexts/SettingsContext";
import Switch from "../components/common/Switch";
import {
  Settings as SettingsIcon,
  Palette,
  PanelLeftClose,
  User as UserIcon,
  LogOut,
  Mail,
  Link as LinkIcon,
} from "lucide-react";

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
`;

const SettingsCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[6]};
`;

const CardHeader = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[3]} 0;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  }
`;

const SettingLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  font-weight: 500;
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  background: ${({ theme, variant }) => variant === 'danger' ? theme.colors.error : theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-weight: 500;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme, variant }) => variant === 'danger' ? theme.colors.errorDark : theme.colors.primaryHover};
  }
`;

const UserInfo = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Settings = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, sidebarCollapsed, toggleSidebar } = useSettings();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleConnectGoogle = () => {
    // The backend will handle the redirect to Google's OAuth screen
    window.location.href = "/api/auth/connect/google";
  };

  return (
    <SettingsContainer>
      <Title>
        <SettingsIcon size={32} /> Settings
      </Title>

      <SettingsCard>
        <CardHeader>Appearance</CardHeader>
        <SettingRow>
          <SettingLabel>
            <Palette size={20} />
            <span>Dark Mode</span>
          </SettingLabel>
          <Switch checked={theme === "dark"} onChange={toggleTheme} />
        </SettingRow>
        <SettingRow>
          <SettingLabel>
            <PanelLeftClose size={20} />
            <span>Collapse Sidebar</span>
          </SettingLabel>
          <Switch checked={sidebarCollapsed} onChange={toggleSidebar} />
        </SettingRow>
      </SettingsCard>

      <SettingsCard>
        <CardHeader>Account</CardHeader>
        <SettingRow>
          <SettingLabel>
            <UserIcon size={20} />
            <span>Username</span>
          </SettingLabel>
          <UserInfo>{user?.username}</UserInfo>
        </SettingRow>
        <SettingRow>
          <SettingLabel>
            <Mail size={20} />
            <span>Email</span>
          </SettingLabel>
          <UserInfo>{user?.email}</UserInfo>
        </SettingRow>
        <SettingRow>
          <SettingLabel>
            <LinkIcon size={20} />
            <span>Google Account</span>
          </SettingLabel>
          <Button onClick={handleConnectGoogle}>Connect</Button>
        </SettingRow>
        <SettingRow>
          <SettingLabel>
            <LogOut size={20} />
            <span>Session</span>
          </SettingLabel>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </SettingRow>
      </SettingsCard>
    </SettingsContainer>
  );
};

export default Settings;