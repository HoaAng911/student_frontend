const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/students';

export const getAllStudents = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createStudent = async (student) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  return res.json();
};

export const updateStudent = async (id, student) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  return res.json();
};

export const deleteStudent = async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};
