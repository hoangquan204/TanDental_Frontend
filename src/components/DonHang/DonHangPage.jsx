import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Thêm dòng này
import { fetchDonHang } from "../../redux/slices/donHangSlice";
import DonHangTable from "./DonHangTable";

const DonHangPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Khởi tạo navigate
    const { data: donHangs, loading, error } = useSelector((state) => state.donHang);

    useEffect(() => {
        dispatch(fetchDonHang());
    }, [dispatch]);

    // Chuyển sang trang tạo mới
    const handleOpenAdd = () => {
        navigate("/donhang/create");
    };

    // Chuyển sang trang sửa (truyền ID vào URL)
    const handleOpenEdit = (donHang) => {
        navigate(`/donhang/${donHang._id}/edit`);
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-4 bg-white p-3 rounded shadow-sm border">
                <div className="flex gap-1 items-center font-medium text-sm">
                    <div className="bg-teal-700 text-white px-3 py-1.5 flex items-center gap-2">
                        <span>27</span> Chờ sản xuất
                    </div>
                    <div className="bg-green-600 text-white px-3 py-1.5 flex items-center gap-2">
                        <span>-</span> Đang sản xuất
                    </div>
                    <div className="bg-red-500 text-white px-3 py-1.5 flex items-center gap-2">
                        <span>8</span> Trễ giờ hẹn giao
                    </div>
                </div>

                <div className="flex gap-2 items-center">
                    <div className="relative">
                        <input type="text" placeholder="Tìm kiếm" className="border bg-gray-50 px-8 py-1.5 rounded-full w-64 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" />
                        <span className="absolute left-3 top-1.5 text-gray-400">🔍</span>
                    </div>
                    {/* Sửa onClick thành handleOpenAdd */}
                    <button onClick={handleOpenAdd} className="bg-green-500 text-white rounded-full hover:bg-green-600 flex items-center justify-center w-8 h-8 font-bold text-lg">+</button>
                    <button className="text-gray-600 hover:bg-gray-100 p-1.5 rounded">🔄</button>
                    <button className="text-gray-600 hover:bg-gray-100 p-1.5 rounded">⋮</button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-10">Đang tải dữ liệu...</div>
            ) : error ? (
                <div className="text-center text-red-500 py-10">Lỗi: {error}</div>
            ) : (
                <DonHangTable
                    data={donHangs}
                    onDoubleClickRow={handleOpenEdit} // Gọi hàm handleOpenEdit
                />
            )}
        </div>
    );
};

export default DonHangPage;