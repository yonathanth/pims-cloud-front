'use client';

import { useState, useEffect } from 'react';
import {
  Modal,
  TextInput,
  PasswordInput,
  InlineNotification,
  InlineLoading,
} from '@carbon/react';
import { apiClient } from '@/lib/api/client';
import { setAuthUser } from '@/lib/auth/auth';

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: { id: number; username: string; fullName?: string } | null;
}

export function AccountSettingsModal({ isOpen, onClose, currentUser }: AccountSettingsModalProps) {
  const [username, setUsername] = useState(currentUser?.username || '');
  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Reset form when modal opens or user changes
  useEffect(() => {
    if (isOpen && currentUser) {
      setUsername(currentUser.username);
      setFullName(currentUser.fullName || '');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError(null);
      setSuccess(false);
    }
  }, [isOpen, currentUser]);

  const handleSubmit = async () => {
    setError(null);
    setSuccess(false);

    // Validation
    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    if (newPassword && !currentPassword) {
      setError('Current password is required to set a new password');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      console.log('Updating account with data:', {
        username: username.trim(),
        fullName: fullName.trim() || undefined,
        hasCurrentPassword: !!currentPassword,
        hasNewPassword: !!newPassword,
      });

      const response = await apiClient.updateAccount({
        username: username.trim(),
        fullName: fullName.trim() || undefined,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined,
      });

      console.log('Account updated successfully:', response);

      // Update stored user info
      setAuthUser(response.user);
      
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      setTimeout(() => {
        onClose();
        setSuccess(false);
        // Reload the page to refresh user data in the sidebar
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      console.error('Update account error:', err);
      console.error('Error response:', err.response?.data);
      
      let errorMessage = 'Failed to update account';
      
      if (err.response?.status === 401) {
        errorMessage = 'Current password is incorrect';
      } else if (err.response?.status === 409) {
        errorMessage = 'Username is already taken';
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (Array.isArray(err.response?.data?.message)) {
        errorMessage = err.response.data.message.join(', ');
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setUsername(currentUser?.username || '');
    setFullName(currentUser?.fullName || '');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError(null);
    setSuccess(false);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onRequestClose={handleClose}
      onRequestSubmit={handleSubmit}
      modalHeading="Account Settings"
      primaryButtonText={loading ? 'Updating...' : 'Update Account'}
      secondaryButtonText="Cancel"
      primaryButtonDisabled={loading}
      size="sm"
    >
      <div style={{ marginBottom: '1rem' }}>
        {error && (
          <InlineNotification
            kind="error"
            title="Error"
            subtitle={error}
            onClose={() => setError(null)}
            style={{ marginBottom: '1rem' }}
          />
        )}
        
        {success && (
          <InlineNotification
            kind="success"
            title="Success"
            subtitle="Account updated successfully"
            style={{ marginBottom: '1rem' }}
          />
        )}

        {loading && (
          <div style={{ marginBottom: '1rem' }}>
            <InlineLoading description="Updating account..." />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextInput
          id="username"
          labelText="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          required
        />

        <TextInput
          id="fullName"
          labelText="Full Name (optional)"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={loading}
        />

        <div style={{ 
          borderTop: '1px solid var(--cds-border-subtle)',
          paddingTop: '1rem',
          marginTop: '0.5rem'
        }}>
          <p style={{ 
            fontSize: '0.875rem',
            color: 'var(--cds-text-secondary)',
            marginBottom: '1rem'
          }}>
            Leave password fields empty to keep current password
          </p>

          <PasswordInput
            id="currentPassword"
            labelText="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <PasswordInput
          id="newPassword"
          labelText="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={loading}
        />

        <PasswordInput
          id="confirmPassword"
          labelText="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
        />
      </div>
    </Modal>
  );
}

