import React, { useState } from "react";
import {
  Group,
  Assignment,
  Description,
  Download,
  Upload,
  Business,
  Add,
} from "@mui/icons-material";

const QuickAddMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      id: 1,
      label: "Người liên hệ",
      icon: <Group fontSize="small" />,
      description: "Quản lý Bác sĩ",
    },
    {
      id: 2,
      label: "Đơn hàng",
      icon: <Assignment fontSize="small" />,
      description: "Quản lý Sản phẩm",
    },
    {
      id: 3,
      label: "Hóa đơn",
      icon: <Description fontSize="small" />,
    },
    {
      id: 4,
      label: "Phiếu thu",
      icon: <Download fontSize="small" />,
    },
    {
      id: 5,
      label: "Phiếu chi",
      icon: <Upload fontSize="small" />,
    },
    {
      id: 6,
      label: "Khách hàng",
      icon: <Business fontSize="small" />,
      description: "Quản lý Bệnh nhân",
    },
  ];

  return (
    <div className="relative inline-block text-left">
      {/* Nút + */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-white text-green-600 rounded-lg border border-gray-200 hover:bg-gray-50 transition shadow-sm"
      >
        <Add className="!w-6 !h-6" />
      </button>

      {isOpen && (
        <>
          {/* overlay */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* menu */}
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-xl border z-20 overflow-hidden">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-b last:border-0"
                onClick={() => {
                  console.log("Thêm:", item.label);
                  setIsOpen(false);
                }}
              >
                <span className="mr-3 text-gray-500">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default QuickAddMenu;
