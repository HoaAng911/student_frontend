
import { useState, useEffect } from "react";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import * as studentApi from "../api/studentApi";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tải danh sách sinh viên từ API
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log(' Đang tải danh sách sinh viên...');
    
      const testResult = await studentApi.testConnection();
      console.log('Test connection:', testResult);
      
      
      
      const data = await studentApi.getAllStudents();
      console.log(' Dữ liệu nhận được:', data);
      setStudents(data);
    } catch (error) {
      console.error(" Lỗi khi tải sinh viên:", error);
      setError(error.message);
      alert(`Không thể tải danh sách sinh viên: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Thêm sinh viên mới
  const handleAddStudent = async (newStudent) => {
    try {
      console.log(' Đang thêm sinh viên:', newStudent);
      const createdStudent = await studentApi.createStudent(newStudent);
      console.log(' Đã thêm sinh viên:', createdStudent);
      setStudents([...students, createdStudent]);
      alert(`Đã thêm sinh viên "${createdStudent.name}" thành công!`);
    } catch (error) {
      console.error(" Lỗi khi thêm sinh viên:", error);
      alert(`Không thể thêm sinh viên: ${error.message}`);
    }
  };

  // Xóa sinh viên
  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sinh viên này?")) return;
    
    try {
      console.log(` Đang xóa sinh viên ID: ${id}`);
      await studentApi.deleteStudent(id);
      setStudents(students.filter(student => student.id !== id));
      alert("Đã xóa sinh viên thành công!");
    } catch (error) {
      console.error(" Lỗi khi xóa sinh viên:", error);
      alert(`Không thể xóa sinh viên: ${error.message}`);
    }
  };

  // Cập nhật sinh viên
  const handleUpdateStudent = async (id, updatedData) => {
    try {
      console.log(` Đang cập nhật sinh viên ID: ${id}`, updatedData);
      const updatedStudent = await studentApi.updateStudent(id, updatedData);
      
      setStudents(students.map(student => 
        student.id === id ? updatedStudent : student
      ));
      
      alert(`Đã cập nhật sinh viên "${updatedStudent.name}" thành công!`);
    } catch (error) {
      console.error(" Lỗi khi cập nhật sinh viên:", error);
      alert(`Không thể cập nhật sinh viên: ${error.message}`);
    }
  };

  // Refresh data
  const handleRefresh = () => {
    loadStudents();
  };
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4"></div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Lỗi kết nối</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                 Quản lý sinh viên
              </h1>
              <p className="text-gray-600 mt-2">
                Tổng số sinh viên: <span className="font-bold">{students.length}</span>
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded flex items-center gap-2"
            >
              <span></span> Làm mới
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form thêm sinh viên */}
          <section className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6"> Thêm sinh viên mới</h2>
              <StudentForm onAdd={handleAddStudent} />
            </div>
          </section>

          {/* Danh sách sinh viên */}
          <section className="lg:col-span-2">
            <StudentList 
              students={students} 
              onDelete={handleDeleteStudent}
              onUpdate={handleUpdateStudent}
            />
          </section>
        </main>

        {/* Debug info */}
        <footer className="mt-8 text-sm text-gray-500">
          <p>API Endpoint: {studentApi.testConnection().then(r => r.url)}</p>
          <p>Last updated: {new Date().toLocaleTimeString()}</p>
        </footer>
      </div>
    </div>
  );
}