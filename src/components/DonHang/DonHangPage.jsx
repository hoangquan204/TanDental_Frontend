import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchDonHang } from "../../redux/slices/donHangSlice";
import DonHangTable from "./DonHangTable";
import DonHangDetailPanel from "./DonHangDetailPanel";

const DonHangPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: donHangs, loading, error } = useSelector((state) => state.donHang);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDonHangId, setSelectedDonHangId] = useState(null);

    useEffect(() => {
        dispatch(fetchDonHang());
    }, [dispatch]);

    const handleOpenAdd = () => navigate("/donhang/create");

    const handleRowClick = (donHang) => {
        setSelectedDonHangId(prev => prev === donHang._id ? null : donHang._id);
    };

    const selectedDonHang = donHangs.find(dh => dh._id === selectedDonHangId) || null;

    const now = new Date();
    const choXuLy = donHangs.filter(d => d.trangThai === 'Chờ xử lý').length;
    const dangSanXuat = donHangs.filter(d => d.trangThai === 'Đang sản xuất').length;
    const treHen = donHangs.filter(d =>
        d.henGiao && new Date(d.henGiao) < now &&
        d.trangThai !== 'Hoàn thành' && d.trangThai !== 'Đã giao'
    ).length;

    const filteredDonHangs = donHangs.filter(dh => {
        if (!searchTerm.trim()) return true;
        const term = searchTerm.toLowerCase().trim();
        const ma = `TAN${dh._id.substring(dh._id.length - 8)}`.toLowerCase();
        const nhaKhoa = (dh.nhaKhoa?.tenGiaoDich || dh.nhaKhoa?.hoVaTen || '').toLowerCase();
        const bacSi = (dh.bacSi?.hoVaTen || '').toLowerCase();
        const benhNhan = (dh.benhNhan?.hoVaTen || '').toLowerCase();
        return ma.includes(term) || nhaKhoa.includes(term) || bacSi.includes(term) || benhNhan.includes(term);
    });

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-4 bg-white p-3 rounded shadow-sm border">
                <div className="flex gap-1 items-center font-medium text-sm">
                    <div className="bg-teal-700 text-white px-3 py-1.5 flex items-center gap-2 rounded-l">
                        <span>{choXuLy}</span> Chờ sản xuất
                    </div>
                    <div className="bg-green-600 text-white px-3 py-1.5 flex items-center gap-2">
                        <span>{dangSanXuat}</span> Đang sản xuất
                    </div>
                    <div className="bg-red-500 text-white px-3 py-1.5 flex items-center gap-2 rounded-r">
                        <span>{treHen}</span> Trễ giờ hẹn giao
                    </div>
                </div>

                <div className="flex gap-2 items-center">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm mã, nha khoa, bác sĩ, bệnh nhân..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border bg-gray-50 pl-8 pr-8 py-1.5 rounded-full w-72 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 absolute left-2.5 top-2 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-2.5 top-1.5 text-gray-400 hover:text-gray-600 text-lg leading-none"
                            >
                                &times;
                            </button>
                        )}
                    </div>
                    <button onClick={handleOpenAdd} className="bg-green-500 text-white rounded-full hover:bg-green-600 flex items-center justify-center w-8 h-8 font-bold text-lg shadow-sm">+</button>
                    <button onClick={() => dispatch(fetchDonHang())} title="Tải lại" className="text-gray-600 hover:bg-gray-100 p-1.5 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-500">Đang tải dữ liệu...</div>
            ) : error ? (
                <div className="text-center text-red-500 py-10">Lỗi: {error}</div>
            ) : (
                <DonHangTable
                    data={filteredDonHangs}
                    selectedId={selectedDonHangId}
                    onRowClick={handleRowClick}
                />
            )}

            <DonHangDetailPanel
                donHang={selectedDonHang}
                onClose={() => setSelectedDonHangId(null)}
            />
        </div>
    );
};

export default DonHangPage;