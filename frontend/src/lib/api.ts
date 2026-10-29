import { DashboardResponse, DateRange } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchDashboardData(range: DateRange = '30d'): Promise<DashboardResponse> {
  const url = `${API_BASE_URL}/api/dashboard?range=${range}`;
  
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status} ${res.statusText}`);
    }

    const data: DashboardResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    throw error;
  }
}

