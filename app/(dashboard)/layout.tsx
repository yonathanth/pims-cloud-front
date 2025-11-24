'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Content } from '@carbon/react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <Content className="dashboard-layout-content">
        {children}
      </Content>
    </>
  );
}
