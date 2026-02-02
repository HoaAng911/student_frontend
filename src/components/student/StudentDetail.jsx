import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, MapPin, User, Calendar, BookOpen } from "lucide-react";
import { getStudentDetail } from "@/api/studentApi"; // Đường dẫn cần điều chỉnh theo cấu trúc dự án

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Gọi API thực tế thay vì dữ liệu mẫu
        const studentData = await getStudentDetail(id);
        
        // Format dữ liệu nếu cần để phù hợp với component
        const formattedStudent = {
          id: studentData.id || studentData.studentId || id,
          name: studentData.name || `${studentData.firstName || ''} ${studentData.lastName || ''}`.trim(),
          age: studentData.age || studentData.dateOfBirth || '',
          email: studentData.email || '',
          phoneNumber: studentData.phone || studentData.phoneNumber || '',
          address: studentData.address || '',
          className: studentData.className || studentData.class || studentData.major || 'Chưa có'
        };
        
        setStudent(formattedStudent);
      } catch (err) {
        console.error("Lỗi khi tải thông tin sinh viên:", err);
        setError(err.message || "Không thể tải thông tin sinh viên");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudentData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải thông tin sinh viên...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <User className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {error ? "Có lỗi xảy ra" : "Không tìm thấy sinh viên"}
            </h2>
            <p className="text-gray-600 mb-4">
              {error || "Sinh viên với ID này không tồn tại."}
            </p>
            <Button onClick={() => navigate("/students")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại danh sách
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/students")}
            className="mb-4 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{student.name}</h1>
        </div>

        {/* Information Cards */}
        <div className="space-y-4 md:space-y-6">
          {/* Basic Info */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <User className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg md:text-xl">{student.name}</h2>
                  <p className="text-gray-500 text-sm">Mã SV: {student.id}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Tuổi</p>
                  <p className="font-medium text-lg">{student.age}</p>
                </div>
                <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Lớp</p>
                  <p className="font-medium text-lg">{student.className}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <h3 className="font-semibold text-lg mb-6 pb-2 border-b">Thông tin liên hệ</h3>
              <div className="space-y-4 md:space-y-5">
                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{student.email || "Chưa cập nhật"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Số điện thoại</p>
                    <p className="font-medium">{student.phoneNumber || "Chưa cập nhật"}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mt-1">
                    <MapPin className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Địa chỉ</p>
                    <p className="font-medium">{student.address || "Chưa cập nhật"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Class Info */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-6 pb-2 border-b">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-orange-500" />
                </div>
                <h3 className="font-semibold text-lg">Thông tin lớp học</h3>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 md:p-6 rounded-lg border border-blue-100">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Lớp hiện tại</p>
                  <p className="font-bold text-xl md:text-2xl text-blue-700">{student.className}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer Actions */}
          <div className="pt-4 md:pt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => navigate("/students")}
                className="flex-1"
                variant="outline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại danh sách
              </Button>
              <Button 
                onClick={() => navigate(`/students/edit/${id}`)}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Chỉnh sửa thông tin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}