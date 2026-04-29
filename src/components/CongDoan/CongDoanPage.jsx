import React from "react";
import CongDoanTable from "./CongDoanTable";

export default function CongDoanPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Danh Mục Công Đoạn</h2>
      </div>
      <CongDoanTable />
    </div>
  );
}