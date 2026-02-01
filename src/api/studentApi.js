// src/api/studentApi.js - TỐI GIẢN
const BASE_URL = 'https://studentmanagement-production.up.railway.app/api/students';

// GET: Lấy tất cả sinh viên
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

// POST: Thêm sinh viên mới
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

// DELETE: Xóa sinh viên - QUAN TRỌNG: Không đợi JSON
export const deleteStudent = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    mode: 'cors'
  });
  
  // DELETE thường trả về 200 OK hoặc 204 No Content (không có body)
  if (!response.ok && response.status !== 204) {
    throw new Error(`Lỗi ${response.status}: Không thể xóa sinh viên`);
  }
  
  // Trả về object đơn giản, không parse JSON
  return { success: true, id };
};

// PUT: Cập nhật sinh viên (nếu cần)
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