import {
  DashboardResponse,
  DateRange,
  ProductItem,
  CreateReturnPayload,
  ResolveReviewPayload,
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchDashboardData(range: DateRange = '30d'): Promise<DashboardResponse> {
  const url = `${API_BASE_URL}/api/dashboard?range=${range}`;

  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    throw error;
  }
}

export async function fetchProducts(): Promise<ProductItem[]> {
  const url = `${API_BASE_URL}/api/products`;
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`Failed to load products: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function createReturn(payload: CreateReturnPayload): Promise<any> {
  const url = `${API_BASE_URL}/api/returns`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to create return: ${res.status}`);
  return await res.json();
}

export async function resolveReview(returnId: string, payload: ResolveReviewPayload): Promise<any> {
  const url = `${API_BASE_URL}/api/returns/${returnId}/resolve`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to resolve review: ${res.status}`);
  return await res.json();
}

export async function runAITriage(): Promise<any> {
  const url = `${API_BASE_URL}/api/triage/run`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`Failed to execute AI triage: ${res.status}`);
  return await res.json();
}
