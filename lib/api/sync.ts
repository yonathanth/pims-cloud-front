import axios from 'axios';

// LAN backend URL - this should be the local backend where the sync service runs
const LAN_API_URL = process.env.NEXT_PUBLIC_LAN_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface SyncResult {
  period: string;
  outcome: string;
  message?: string;
  hash?: string;
  error?: string;
}

export interface SyncResponse {
  results: SyncResult[];
  status: {
    running: boolean;
    lastHashes: Record<string, string>;
  };
}

export async function triggerSync(force = false): Promise<SyncResponse> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  
  console.log(`🔄 Triggering period sync from web app (force=${force})`);
  console.log(`   LAN API URL: ${LAN_API_URL}`);
  
  // Remove trailing /api if present to avoid double /api/api
  // The backend has a global prefix '/api', so if LAN_API_URL ends with /api, remove it
  const baseUrl = LAN_API_URL.endsWith('/api') 
    ? LAN_API_URL.slice(0, -4) 
    : LAN_API_URL;
  
  // Build URL - backend has global prefix '/api', so use /api/analytics/sync/trigger
  // The backend controller is at @Controller('analytics') and route is @Post('sync/trigger')
  // With global prefix, the full path is /api/analytics/sync/trigger
  const url = `${baseUrl}/api/analytics/sync/trigger?force=${force}`;
  
  console.log(`   Final URL: ${url}`);
  
  try {
    const response = await axios.post<SyncResponse>(
      url,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );
    
    console.log(`✅ Sync triggered successfully:`, response.data);
    return response.data;
  } catch (error: any) {
    console.error(`❌ Failed to trigger sync:`, error.response?.data || error.message);
    throw error;
  }
}

export async function getSyncStatus(): Promise<{ running: boolean; lastHashes: Record<string, string> }> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  
  // Remove trailing /api if present to avoid double /api/api
  // The backend has a global prefix '/api', so if LAN_API_URL ends with /api, remove it
  const baseUrl = LAN_API_URL.endsWith('/api') 
    ? LAN_API_URL.slice(0, -4) 
    : LAN_API_URL;
  
  // Build URL - backend has global prefix '/api', so use /api/analytics/sync/status
  const url = `${baseUrl}/api/analytics/sync/status`;
  
  // Note: This endpoint might not exist yet, but we'll add it if needed
  const response = await axios.get<{ running: boolean; lastHashes: Record<string, string> }>(
    url,
    {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );
  
  return response.data;
}

