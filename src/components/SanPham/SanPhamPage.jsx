import React from "react";
import SanPhamTable from "./SanPhamTable";

export default function SanPhamPage() {
    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Danh Mục Sản Phẩm</h2>
            </div>

            <SanPhamTable />
        </div>
    );
}