// src/api/studentApi.js - TỐI GIẢN
const BASE_URL = 'https://studentmaganement-production.up.railway.app/api/students';

// GET
export const getAllStudents = async () => {
  const response = await fetch(BASE_URL, {
    headers: { 'Accept': 'application/json' },
    mode: 'cors'
  });
  
  if (!response.ok) {
    throw new Error(`Lỗi ${response.status}: Không thể tải danh sách`);
  }
  
  return response.json();
};

// POST
export const createStudent = async (student) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
    mode: 'cors'
  });
  
  if (!response.ok) {
    throw new Error(`Lỗi ${response.status}: Không thể thêm sinh viên`);
  }
  
  return response.json();
};

// DELETE
export const deleteStudent = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    mode: 'cors'
  });
  
 
  if (!response.ok && response.status !== 204) {
    throw new Error(`Lỗi ${response.status}: Không thể xóa sinh viên`);
  }
  

  return { success: true, id };
};

// PUT
export const updateStudent = async (id, student) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
    mode: 'cors'
  });
  
  if (!response.ok) {
    throw new Error(`Lỗi ${response.status}: Không thể cập nhật`);
  }
  
  return response.json();
};