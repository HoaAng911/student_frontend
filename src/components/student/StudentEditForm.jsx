
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function StudentEditForm({
  student,
  onEdit,
  open,
  onOpenChange
}) {
  const [formData, setFormData] = useState({
    name: "",
    age: 18,
    email: "",
    phoneNumber: "",
    address: "",
    className: ""
  });


  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        age: student.age || 18,
        email: student.email || "",
        phoneNumber: student.phoneNumber || "",
        address: student.address || "",
        className: student.className || ""
      });
    }
  }, [student, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "age" ? Number(value) || "" : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Vui lòng nhập tên sinh viên");
      return;
    }

    if (!formData.email.includes("@")) {
      alert("Email không hợp lệ");
      return;
    }


    onEdit({
      ...student,
      ...formData
    });


    onOpenChange(false);
  };

  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa sinh viên</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tên */}
            <div className="space-y-2">
              <Label htmlFor="edit-name">Tên sinh viên *</Label>
              <Input
                id="edit-name"
                name="name"
                placeholder="Nguyễn Văn A"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Tuổi */}
            <div className="space-y-2">
              <Label htmlFor="edit-age">Tuổi *</Label>
              <Input
                id="edit-age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Số điện thoại */}
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Số điện thoại</Label>
              <Input
                id="edit-phone"
                name="phoneNumber"
                placeholder="0987654321"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            {/* Địa chỉ */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="edit-address">Địa chỉ</Label>
              <Input
                id="edit-address"
                name="address"
                placeholder="Số nhà, đường, thành phố"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* Lớp */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="edit-class">Lớp</Label>
              <Input
                id="edit-class"
                name="className"
                placeholder="K14, CNTT, ..."
                value={formData.className}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit">Lưu thay đổi</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}