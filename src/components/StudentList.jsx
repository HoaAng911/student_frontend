import StudentItem from "./StudentItem";
export default function StudentList({ students, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 text-lg">
           Chưa có sinh viên nào. Hãy thêm sinh viên mới!
        </p>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-lg shadow overflow-hidden"
      role="list"
      aria-label="Danh sách sinh viên"
    >
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <h2 className="font-bold text-gray-700">
          Danh sách sinh viên ({students.length})
        </h2>
      </div>
      
      <div>
        {students.map((student) => (
          <StudentItem 
            key={student.id} 
            student={student} 
            onDelete={onDelete} 
          />
        ))}
      </div>
    </div>
  );
}