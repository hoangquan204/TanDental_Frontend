import React from "react";
import StaffTable from "./StaffTable";
import StaffModal from "./StaffModal";
import { useSelector } from "react-redux";

export default function StaffPage() {
  const { user } = useSelector((state) => state.auth);
  
  // Kiểm tra xem user là Admin không
  const isAdmin = user?.ChucVu === "Sở hữu";

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quản lý tài khoản</h1>
        
        {/* Chỉ Admin mới thấy nút Thêm */}
        {isAdmin && <StaffModal />}
      </div>

      {/* TABLE */}
      <StaffTable />
    </div>
  );
}
