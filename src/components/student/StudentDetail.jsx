import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, MapPin, User, Calendar, BookOpen } from "lucide-react";

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập fetch dữ liệu
    setTimeout(() => {
      // Dữ liệu mẫu dựa trên ID
      const studentData = {
        id: id,
        name: "Nguyễn Văn A",
        age: 20,
        email: "nguyenvana@email.com",
        phoneNumber: "0987654321",
        address: "123 Đường ABC, Hà Nội",
        className: "K14"
      };
      setStudent(studentData);
      setLoading(false);
    }, 300);
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8">
            <p className="text-gray-600">Đang tải thông tin sinh viên...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Không tìm thấy sinh viên</h2>
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
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
        </div>

        {/* Information Cards */}
        <div className="space-y-4">
          {/* Basic Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{student.name}</h2>
                  <p className="text-gray-500 text-sm">Mã SV: {student.id}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Tuổi</p>
                  <p className="font-medium">{student.age}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lớp</p>
                  <p className="font-medium">{student.className}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Thông tin liên hệ</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{student.email}</p>
                  </div>
                </div>
                
                {student.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Số điện thoại</p>
                      <p className="font-medium">{student.phoneNumber}</p>
                    </div>
                  </div>
                )}
                
                {student.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Địa chỉ</p>
                      <p className="font-medium">{student.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Class Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold">Thông tin lớp học</h3>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-medium text-center">{student.className}</p>
              </div>
            </CardContent>
          </Card>

          {/* Footer Actions */}
          <div className="pt-4">
            <Button 
              onClick={() => navigate("/students")}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại danh sách sinh viên
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}