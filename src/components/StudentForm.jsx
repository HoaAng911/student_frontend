import { useState } from "react";

/**
 * Form thêm sinh viên mới
 * @param {Function} onAdd - Callback khi submit form thành công
 */
export default function StudentForm({ onAdd }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu đầu vào
    if (!name.trim()) {
      alert("Vui lòng nhập tên sinh viên");
      return;
    }

    const ageNumber = Number(age);
    if (ageNumber <= 0 || ageNumber > 150) {
      alert("Tuổi phải từ 1 đến 150");
      return;
    }

    // Gửi dữ liệu lên component cha
    onAdd({ 
      name: name.trim(), 
      age: ageNumber 
    });

    // Reset form
    setName("");
    setAge("");
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-4 rounded shadow-md mb-6"
      aria-label="Thêm sinh viên mới"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          className="border border-gray-300 p-3 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập tên sinh viên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Tên sinh viên"
          required
        />
        <input
          className="border border-gray-300 p-3 rounded w-full sm:w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tuổi"
          type="number"
          min="1"
          max="150"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          aria-label="Tuổi sinh viên"
          required
        />
        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded transition-colors duration-200"
        >
          Thêm
        </button>
      </div>
    </form>
  );
}