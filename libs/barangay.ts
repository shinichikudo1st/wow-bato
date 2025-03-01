import { AddBarangayFormData } from '@/types/barangayTypes';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not defined');
}

export async function addBarangay(formData: AddBarangayFormData) {
  try {
    const response = await fetch(`${API_BASE_URL}/barangay/add`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to add barangay');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getBarangays(page: number, limit: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/barangay/all?page=${page}&limit=${limit}`, {
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch barangays');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function viewBarangay(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/barangay/single/${id}`, {
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch barangay');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getBarangayNames() {
  try {
    const response = await fetch(`${API_BASE_URL}/barangay/options`, {
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch barangay names');
    }

    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function DeleteBarangay(barangayID: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/barangay/delete/${barangayID}`, {
      credentials: 'include',
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete barangay');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function UpdateBarangay(updateBarangay: AddBarangayFormData, barangayID: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/barangay/update/${barangayID}`, {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateBarangay),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to update barangay');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function DisplayBarangaysPublic() {
  try {
    const response = await fetch(`${API_BASE_URL}/barangay/public-all`, {
      credentials: 'include',
      method: 'GET',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch barangays');
    }

    return data;
  } catch (error) {
    throw error;
  }
}
