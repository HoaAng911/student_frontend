import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function StudentForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    age: 18,
    email: "",
    phoneNumber: "",
    address: "",
    className: ""
  });
  
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value
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

    onAdd({
      name: formData.name.trim(),
      age: formData.age,
      email: formData.email.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      address: formData.address.trim(),
      className: formData.className.trim()
    });

  
    setFormData({
      name: "",
      age: 18,
      email: "",
      phoneNumber: "",
      address: "",
      className: ""
    });
    setOpen(false);
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      age: 18,
      email: "",
      phoneNumber: "",
      address: "",
      className: ""
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Thêm sinh viên mới</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Thêm sinh viên mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin sinh viên vào form bên dưới
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {/* Tên */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-right">
                Tên sinh viên *
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Nguyễn Văn A"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Tuổi */}
            <div className="space-y-2">
              <Label htmlFor="age" className="text-right">
                Tuổi *
              </Label>
              <Input
                id="age"
                name="age"
                type="number"
                placeholder="18"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-right">
                Email *
              </Label>
              <Input
                id="email"
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
              <Label htmlFor="phoneNumber" className="text-right">
                Số điện thoại
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="0987654321"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            {/* Địa chỉ */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address" className="text-right">
                Địa chỉ
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="Số nhà, đường, thành phố"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* Lớp */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="className" className="text-right">
                Lớp
              </Label>
              <Input
                id="className"
                name="className"
                placeholder="K14, CNTT, ..."
                value={formData.className}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Hủy
            </Button>
            <Button type="submit">Thêm sinh viên</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}