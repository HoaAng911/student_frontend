import React from 'react'
import { Home, Users, GraduationCap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const navigate = useNavigate()

  const items = [
    { icon: <Home size={20} />, label: "Trang chủ", path: "/" },
    { icon: <Users size={20} />, label: "Sinh viên", path: "/students" },
    { icon: <GraduationCap size={20} />, label: "Giảng viên", path: "/teachers" },
  ]

  return (
    <aside className="flex flex-col w-64 border-r bg-background h-screen p-4">
      {/* Logo */}
      <div 
        className="p-4 mb-8 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <h1 className="text-xl font-bold">Quản lý</h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {items.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  )
}