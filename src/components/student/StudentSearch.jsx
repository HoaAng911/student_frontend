import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import * as studentApi from "../../api/studentApi";

export default function StudentSearch({ onSearchResults }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Vui lòng nhập tên cần tìm kiếm");
      return;
    }

    setLoading(true);
    try {
      const results = await studentApi.searchStudents(searchTerm.trim());
      onSearchResults(results);
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
      alert("Không thể tìm kiếm. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearchResults(null); 
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2 mb-6 p-4 bg-white rounded-lg shadow">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Tìm kiếm sinh viên theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      <Button onClick={handleSearch} disabled={loading}>
        {loading ? "Đang tìm..." : "Tìm kiếm"}
      </Button>
    </div>
  );
}