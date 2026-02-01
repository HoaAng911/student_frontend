// src/pages/Home.jsx - Phiên bản đơn giản
import { useState, useEffect } from "react";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import * as studentApi from "../api/studentApi";

export default function Home() {
  const [students, setStudents] = useState([]);

  // Tải danh sách sinh viên
  useEffect(() => {
    studentApi.getAllStudents()
      .then(data => setStudents(data))
      .catch(error => {
        console.error("Lỗi:", error);
        // Fallback data nếu API fail
        setStudents([
          { id: 1, name: "Nguyễn Văn A", age: 20 },
          { id: 2, name: "Trần Thị B", age: 21 }
        ]);
      });
  }, []);

  // Thêm sinh viên mới
  const handleAddStudent = async (newStudent) => {
    try {
      const createdStudent = await studentApi.createStudent(newStudent);
      setStudents([...students, createdStudent]);
    } catch (error) {
      console.error("Lỗi:", error);
      // Thêm local nếu API fail
      const tempStudent = {
        id: Date.now(),
        name: newStudent.name,
        age: newStudent.age
      };
      setStudents([...students, tempStudent]);
    }
  };

  // Xóa sinh viên
  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Xóa sinh viên này?")) return;
    
    try {
      await studentApi.deleteStudent(id);
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      console.error("Lỗi:", error);
      // Xóa local nếu API fail
      setStudents(students.filter(student => student.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Quản lý sinh viên
          </h1>
          <p className="text-gray-600 mt-2">
            Tổng số sinh viên: {students.length}
          </p>
        </header>

        <main>
          <section className="mb-10">
            <StudentForm onAdd={handleAddStudent} />
          </section>

          <section>
            <StudentList 
              students={students} 
              onDelete={handleDeleteStudent} 
            />
          </section>
        </main>
      </div>
    </div>
  );
}