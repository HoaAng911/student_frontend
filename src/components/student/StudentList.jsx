import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function StudentList({ students, onDelete, onView, onEdit }) {
  if (students.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground text-lg">
            Chưa có sinh viên nào. Hãy thêm sinh viên mới!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách sinh viên</CardTitle>
        <CardDescription>
          Tổng số: {students.length} sinh viên
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Tên sinh viên</TableHead>
              <TableHead>Tuổi</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Lớp</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={student.id} className="cursor-pointer hover:bg-gray-50">
                {/* STT */}
                <TableCell className="font-medium">{index + 1}</TableCell>
                
                {/* Tên sinh viên - Clickable để xem chi tiết */}
                <TableCell className="font-medium">
                  <Link 
                    to={`/students/${student.id}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {student.name}
                  </Link>
                </TableCell>
                
                <TableCell>
                  <Badge variant="outline">{student.age}</Badge>
                </TableCell>
                
                <TableCell>{student.email}</TableCell>
                
                <TableCell>
                  {student.className || (
                    <span className="text-muted-foreground text-sm">-</span>
                  )}
                </TableCell>
                
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {/* Nút xem chi tiết */}
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      title="Xem chi tiết"
                    >
                      <Link to={`/students/${student.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    
                    {/* Nút chỉnh sửa - mở modal */}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit && onEdit(student)}
                      title="Chỉnh sửa"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    {/* Nút xóa */}
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        if (window.confirm(`Xóa sinh viên "${student.name}"?`)) {
                          onDelete(student.id);
                        }
                      }}
                      title="Xóa"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}