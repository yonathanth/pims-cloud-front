import { InlineLoading } from '@carbon/react';

export default function Loading() {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <InlineLoading description="Loading analytics..." />
    </div>
  );
}

