import { useState, useEffect } from "react";
import StudentForm from "../components/student/StudentForm";
import StudentList from "../components/student/StudentList";
import StudentEditForm from "../components/student/StudentEditForm";
import StudentSearch from "../components/student/StudentSearch"; 
import * as studentApi from "../api/studentApi";

export default function StudentPage() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(null); // State cho kết quả tìm kiếm

  // Lấy danh sách sinh viên
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    studentApi.getAllStudents()
      .then(data => setStudents(data))
      .catch(error => {
        console.error("Lỗi:", error);
        setStudents([]);
      });
  };

  // Xử lý kết quả tìm kiếm từ StudentSearch
  const handleSearchResults = (results) => {
    setSearchResults(results); // null nếu clear search
  };

  // Thêm sinh viên mới
  const handleAddStudent = async (newStudent) => {
    try {
      const createdStudent = await studentApi.createStudent(newStudent);
      setStudents([...students, createdStudent]);
      setSearchResults(null); // Clear kết quả tìm kiếm sau khi thêm mới
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  // Xóa sinh viên
  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Xóa sinh viên này?")) return;
    
    try {
      await studentApi.deleteStudent(id);
      const updatedStudents = students.filter(student => student.id !== id);
      setStudents(updatedStudents);
      
      // Nếu đang hiển thị kết quả tìm kiếm, cập nhật lại
      if (searchResults) {
        const updatedSearchResults = searchResults.filter(student => student.id !== id);
        setSearchResults(updatedSearchResults);
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  // Xem chi tiết sinh viên (nếu cần)
  const handleViewStudent = (student) => {
    // Code xem chi tiết nếu có
  };

  // Mở form chỉnh sửa
  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setEditDialogOpen(true);
  };

  // Lưu thay đổi sau khi chỉnh sửa
  const handleSaveEdit = async (updatedStudent) => {
    try {
      await studentApi.updateStudent(updatedStudent.id, updatedStudent);
      
      // Cập nhật danh sách gốc
      const updatedStudents = students.map(student => 
        student.id === updatedStudent.id ? updatedStudent : student
      );
      setStudents(updatedStudents);
      
      // Nếu đang hiển thị kết quả tìm kiếm, cập nhật lại
      if (searchResults) {
        const updatedSearchResults = searchResults.map(student => 
          student.id === updatedStudent.id ? updatedStudent : student
        );
        setSearchResults(updatedSearchResults);
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
    
    setEditDialogOpen(false);
  };

  // Danh sách hiển thị (kết quả tìm kiếm hoặc danh sách gốc)
  const displayStudents = searchResults !== null ? searchResults : students;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Quản lý sinh viên
          </h1>
          <p className="text-gray-600 mt-2">
            Tổng số sinh viên: {students.length}
            {searchResults !== null && (
              <span className="ml-2 text-blue-600">
                (Đang hiển thị {searchResults.length} kết quả tìm kiếm)
              </span>
            )}
          </p>
        </header>

        <main>
          {/* SỬ DỤNG COMPONENT StudentSearch */}
          <div className="mb-6">
            <StudentSearch onSearchResults={handleSearchResults} />
          </div>

          <section className="mb-10">
            <StudentForm onAdd={handleAddStudent} />
          </section>

          <section>
            <StudentList 
              students={displayStudents}
              onDelete={handleDeleteStudent}
              onView={handleViewStudent}
              onEdit={handleEditStudent}
            />
          </section>
        </main>

        {/* Form chỉnh sửa sinh viên */}
        <StudentEditForm
          student={selectedStudent}
          onEdit={handleSaveEdit}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
        />
      </div>
    </div>
  );
}