import { useState, useEffect } from "react";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import * as studentApi from "../api/studentApi";

export default function Home() {
  const [students, setStudents] = useState([]);

  // Tải danh sách sinh viên từ API
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await studentApi.getAllStudents();
        setStudents(data);
      } catch (error) {
        console.error("Lỗi khi tải sinh viên:", error);
        alert("Không thể tải danh sách sinh viên");
      }
    };
    
    loadStudents();
  }, []);

  // Thêm sinh viên mới
  const handleAddStudent = async (newStudent) => {
    try {
      const createdStudent = await studentApi.createStudent(newStudent);
      setStudents([...students, createdStudent]);
    } catch (error) {
      console.error("Lỗi khi thêm sinh viên:", error);
      alert("Không thể thêm sinh viên");
    }
  };

  // Xóa sinh viên
  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Xóa sinh viên này?")) return;
    
    try {
      await studentApi.deleteStudent(id);
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa sinh viên:", error);
      alert("Không thể xóa sinh viên");
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
          {/* Form thêm sinh viên */}
          <section className="mb-10">
            <StudentForm onAdd={handleAddStudent} />
          </section>

          {/* Danh sách sinh viên */}
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