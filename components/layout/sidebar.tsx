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
  ToastNotification,
} from '@carbon/react';
import {
  Dashboard,
  Logout,
  UserAvatar,
  ChartLine,
  Notification,
  NotificationOff,
} from '@carbon/icons-react';
import { AccountSettingsModal } from './account-settings-modal';
import { usePushNotifications } from '@/hooks/use-push-notifications';

const PUSH_HELP: Record<string, string> = {
  unsupported:
    'This browser cannot receive notifications. On iPhone, add this site to your Home Screen first, then open it from there.',
  denied:
    'Notifications are blocked for this site. Allow them in your browser settings, then try again.',
};

export function Sidebar() {
  const { user, logout } = useAuth();
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false); // Start collapsed
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const push = usePushNotifications();
  const [pushMessage, setPushMessage] = useState<string | null>(null);

  const handlePushClick = async () => {
    if (push.state === 'unsupported' || push.state === 'denied') {
      setPushMessage(PUSH_HELP[push.state]);
    } else if (push.state === 'on') {
      await push.disable();
      setPushMessage('Sale notifications are off on this device.');
    } else if (push.state === 'off') {
      if (await push.enable()) {
        setPushMessage('Sale notifications are on. A test notification was sent to this device.');
      }
    }
  };

  // Initialize sidebar state - expanded on desktop, collapsed on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSideNavExpanded(false); // Always collapsed on mobile/tablet
      } else {
        setIsSideNavExpanded(true); // Expanded on desktop
      }
    };

    // Set initial state based on screen size
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 1024) {
        setIsSideNavExpanded(false); // Hidden on mobile
      } else {
        setIsSideNavExpanded(true); // Expanded on desktop
      }
    }
    
    // Listen for resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isSideNavExpanded) return;
      
      const target = event.target as HTMLElement;
      const sideNav = document.querySelector('.cds--side-nav');
      const menuButton = document.querySelector('.cds--header__menu-button');
      
      // Check if click is outside sidebar and not on menu button
      if (sideNav && !sideNav.contains(target) && menuButton && !menuButton.contains(target)) {
        setIsSideNavExpanded(false); // Close on all screen sizes
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
          Dashboard
        </HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label={
              push.state === 'on'
                ? 'Sale notifications on (click to turn off)'
                : 'Turn on sale notifications'
            }
            onClick={() => {
              if (push.state !== 'loading' && !push.busy) void handlePushClick();
            }}
            isActive={push.state === 'on'}
            tooltipAlignment="end"
          >
            {push.state === 'on' ? <Notification size={20} /> : <NotificationOff size={20} />}
          </HeaderGlobalAction>
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
        isRail={false} /* Always show full sidebar when expanded */
        expanded={isSideNavExpanded}
        onOverlayClick={() => setIsSideNavExpanded(false)}
        className={isSideNavExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}
        isFixedNav={true}
      >
        <SideNavItems>
          <SideNavLink 
            renderIcon={ChartLine} 
            href="/analytics" 
            onClick={() => setIsSideNavExpanded(false)}
          >
            Analytics
          </SideNavLink>
          <SideNavLink 
            renderIcon={Dashboard} 
            href="/sales" 
            onClick={() => setIsSideNavExpanded(false)}
          >
            Sales
          </SideNavLink>
        </SideNavItems>
      </SideNav>
      
      {(pushMessage || push.error) && (
        <div style={{ position: 'fixed', top: '3.5rem', right: '1rem', zIndex: 9000 }}>
          <ToastNotification
            kind={push.error ? 'error' : 'info'}
            title="Notifications"
            subtitle={push.error || pushMessage || ''}
            timeout={8000}
            onClose={() => {
              setPushMessage(null);
              push.clearError();
            }}
          />
        </div>
      )}

      <AccountSettingsModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        currentUser={user}
      />
    </>
  );
}
