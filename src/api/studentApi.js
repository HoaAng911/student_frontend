
const BASE_URL = 'https://studentmaganement-production.up.railway.app/api/students';

// Helper function để xử lý response
async function handleResponse(response) {
  console.log('Response status:', response.status);
  console.log('Response headers:', Object.fromEntries([...response.headers.entries()]));
  
  // Kiểm tra content-type
  const contentType = response.headers.get('content-type');
  
  // Nếu không phải JSON, log ra để debug
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    console.error('Server returned non-JSON:', text.substring(0, 500));
    
    // Nếu là HTML (thường do CORS error)
    if (text.includes('<!DOCTYPE') || text.includes('<html')) {
      throw new Error('Server returned HTML page. Check CORS configuration on backend.');
    }
    
    throw new Error(`Expected JSON but got ${contentType}`);
  }
  
  // Nếu response không ok
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }
  
  return response.json();
}

// Fetch với error handling
async function fetchWithErrorHandling(url, options = {}) {
  try {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors', // Quan trọng cho CORS
      credentials: 'omit' // Hoặc 'include' nếu cần auth
    };
    
    const response = await fetch(url, { ...defaultOptions, ...options });
    return await handleResponse(response);
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// API functions
export const getAllStudents = async () => {
  return fetchWithErrorHandling(BASE_URL);
};

export const createStudent = async (student) => {
  return fetchWithErrorHandling(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(student)
  });
};

export const updateStudent = async (id, student) => {
  return fetchWithErrorHandling(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(student)
  });
};

export const deleteStudent = async (id) => {
  return fetchWithErrorHandling(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
};

// Test connection
export const testConnection = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    
    console.log('Test Connection Status:', response.status);
    console.log('Content-Type:', response.headers.get('content-type'));
    
    const text = await response.text();
    console.log('Raw response (first 500 chars):', text.substring(0, 500));
    
    return {
      status: response.status,
      contentType: response.headers.get('content-type'),
      isJson: text.startsWith('[') || text.startsWith('{'),
      sample: text.substring(0, 200)
    };
  } catch (error) {
    console.error('Connection test failed:', error);
    return { error: error.message };
  }
};
