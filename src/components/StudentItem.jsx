/**
 * Component hiển thị thông tin một sinh viên
 * @param {Object} props
 * @param {Object} props.student - Đối tượng sinh viên
 * @param {Function} props.onDelete - Callback khi xóa sinh viên
 */
export default function StudentItem({ student, onDelete }) {
  const { id, name, age } = student;

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc muốn xóa sinh viên "${name}"?`)) {
      onDelete(id);
    }
  };

  return (
    <div 
      className="flex justify-between items-center border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors duration-150"
      role="listitem"
    >
      <div>
        <p className="font-semibold text-lg text-gray-800">{name}</p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Tuổi:</span> {age}
        </p>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-600 hover:text-red-800 font-medium px-3 py-1 rounded hover:bg-red-50 transition-colors duration-200"
        aria-label={`Xóa sinh viên ${name}`}
      >
        Xóa
      </button>
    </div>
  );
}