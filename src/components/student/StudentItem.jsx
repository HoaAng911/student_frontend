import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Eye, Edit } from "lucide-react";

export default function StudentItem({ student, onDelete, onView, onEdit }) {
  const { id, name, age, email, phoneNumber, address, className } = student;

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc muốn xóa sinh viên "${name}"?`)) {
      onDelete(id);
    }
  };

  const handleView = () => {
    if (onView) {
      onView(student);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(student);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-bold text-primary text-lg">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{name}</h3>
                <p className="text-sm text-muted-foreground">{email}</p>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Tuổi:</span>
                  <Badge variant="outline">{age}</Badge>
                </div>

                {className && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Lớp:</span>
                    <Badge variant="secondary">{className}</Badge>
                  </div>
                )}

                {phoneNumber && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">SĐT:</span>
                    <span className="text-sm">{phoneNumber}</span>
                  </div>
                )}
              </div>

              {address && (
                <div className="text-sm">
                  <span className="font-medium">Địa chỉ: </span>
                  <span className="text-muted-foreground">{address}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 ml-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleView}
              title="Xem chi tiết"
            >
              <Eye className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              onClick={handleEdit}
              title="Chỉnh sửa"
              className="bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800 border-blue-200"
            >
              <Edit className="h-4 w-4" />
            </Button>

            <Button
              variant="destructive"
              size="icon"
              onClick={handleDelete}
              title="Xóa"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}