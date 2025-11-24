'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import {
  Header,
  HeaderName,
  SideNav,
  SideNavItems,
  SideNavLink,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenuButton,
} from '@carbon/react';
import {
  Dashboard,
  Logout,
  UserAvatar,
} from '@carbon/icons-react';
import { AccountSettingsModal } from './account-settings-modal';

export function Sidebar() {
  const { user, logout } = useAuth();
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  // Close sidebar when clicking outside on desktop
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isSideNavExpanded) return;
      
      const target = event.target as HTMLElement;
      const sideNav = document.querySelector('.cds--side-nav');
      const menuButton = document.querySelector('.cds--header__menu-button');
      
      // Check if click is outside sidebar and not on menu button
      if (sideNav && !sideNav.contains(target) && menuButton && !menuButton.contains(target)) {
        setIsSideNavExpanded(false);
      }
    };

    if (isSideNavExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isSideNavExpanded]);

  return (
    <>
      <Header aria-label="PIMS Admin Dashboard">
        <HeaderMenuButton
          aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
          onClick={() => setIsSideNavExpanded(!isSideNavExpanded)}
          isActive={isSideNavExpanded}
        />
        <HeaderName href="/" prefix="">
          PIMS Admin Dashboard
        </HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="Account Settings"
            onClick={() => setIsAccountModalOpen(true)}
            tooltipAlignment="end"
          >
            <UserAvatar size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="Logout"
            onClick={logout}
            tooltipAlignment="end"
          >
            <Logout size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
      <SideNav
        aria-label="Side navigation"
        isRail
        expanded={isSideNavExpanded}
        onOverlayClick={() => setIsSideNavExpanded(false)}
      >
        <SideNavItems>
          <SideNavLink 
            renderIcon={Dashboard} 
            href="/" 
            isActive
            onClick={() => setIsSideNavExpanded(false)}
          >
            Analytics
          </SideNavLink>
        </SideNavItems>
      </SideNav>
      
      <AccountSettingsModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        currentUser={user}
      />
    </>
  );
}
