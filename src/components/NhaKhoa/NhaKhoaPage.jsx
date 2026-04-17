import React, { useState } from "react";
import NhaKhoaTable from "./NhaKhoaTable";
import NhaKhoaModal from "./NhaKhoaModal";

export default function NhaKhoaPage() {
  // ✅ FAKE DATA (giống backend)
  const [data, setData] = useState([
    {
      _id: "69e1bad0511d9d7ffe7cda73",
      hoVaTen: "Phòng khám A",
      tenGiaoDich: "PK A",
      soDienThoai: "0123456789",
      email: "quanpogba888@gmail.com",
      website: "hoangquan.com.vn",
      quocGia: "Việt Nam",
      tinh: "Sóc Trăng",
      quanHuyen: "Mỹ Xuyên",
      diaChiCuThe: "156, quốc lộ 1A, xã Thuận Hòa",
      moTa: "Nha khoa mới",
      createdAt: "2026-04-17T04:45:04.096Z",
      updatedAt: "2026-04-17T04:45:04.096Z",
    },
    {
      _id: "69e1bad0511d9d7ffe7cda74",
      hoVaTen: "Phòng khám A",
      tenGiaoDich: "PK A",
      soDienThoai: "0123456789",
      email: "quanpogba888@gmail.com",
      website: "hoangquan.com.vn",
      quocGia: "Việt Nam",
      tinh: "Sóc Trăng",
      quanHuyen: "Mỹ Xuyên",
      diaChiCuThe: "156, quốc lộ 1A, xã Thuận Hòa",
      moTa: "Nha khoa mới",
      createdAt: "2026-04-17T04:45:04.096Z",
      updatedAt: "2026-04-17T04:45:04.096Z",
    },
  ]);

  // ✅ ADD NEW
  const handleAdd = (newItem) => {
    setData((prev) => [
      {
        ...newItem,
        updatedAt: new Date(),
      },
      ...prev, // thêm lên đầu cho giống admin
    ]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Nha Khoa</h1>
          <p className="text-gray-500 text-sm">Danh sách phòng khám nha khoa</p>
        </div>

        {/* MODAL BUTTON */}
        <NhaKhoaModal onAdd={handleAdd} />
      </div>

      {/* TABLE */}
      <NhaKhoaTable data={data} />
    </div>
  );
}
