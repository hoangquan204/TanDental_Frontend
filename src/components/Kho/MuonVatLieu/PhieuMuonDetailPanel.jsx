import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPhieuMuonVatLieuById,
    updatePhieuMuonVatLieu,
    deletePhieuMuonVatLieu,
    clearSelected,
} from "../../../redux/slices/phieuMuonVatLieuSlice"; // ⚠️ chỉnh lại path cho khớp cấu trúc dự án
import { toast } from "sonner";
import PhieuMuonModal from "./PhieuMuonModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";

function formatNgay(dateStr) {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${hh}:${min} ${dd}/${mm}/${yyyy}`;
}

function InfoRow({ label, value }) {
    return (
        <div className="flex items-start gap-2 text-base">
            <span className="text-gray-500 w-28 shrink-0">{label}:</span>
            <span>{value || "—"}</span>
        </div>
    );
}

// Gộp trạng thái nhận + trả thành 1 trạng thái duy nhất — cùng logic với PhieuMuonTable
function getTrangThai(fullPhieu) {
    if (!fullPhieu) return null;
    if (fullPhieu.trangThaiNhan === "Chưa nhận") {
        return { text: "Chưa nhận", cls: "bg-yellow-500" };
    }
    if (fullPhieu.trangThaiTra === "Chưa trả") {
        return { text: "Chưa trả", cls: "bg-red-500" };
    }
    return { text: "Đã trả", cls: "bg-green-500" };
}

/**
 * Props:
 *  phieu     – phiếu mượn row object | null (null/undefined => modal closed)
 *  onClose   – () => void
 *  onUpdated – () => void  (refresh danh sách ở component cha)
 */
export default function PhieuMuonDetailModal({ phieu, onClose, onUpdated }) {
    const dispatch = useDispatch();

    const [fullPhieu, setFullPhieu] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [updatingStep, setUpdatingStep] = useState(false);

    const { user } = useSelector((state) => state.auth);

    // Reset local state when target changes / modal closes
    useEffect(() => {
        if (!phieu) {
            setFullPhieu(null);
            setShowDeleteConfirm(false);
        }
    }, [phieu]);

    // Fetch full detail whenever selected phieu changes
    useEffect(() => {
        if (!phieu?._id) return;
        setLoading(true);
        dispatch(fetchPhieuMuonVatLieuById(phieu._id))
            .unwrap()
            .then((res) => setFullPhieu(res.data || res))
            .catch(() => setFullPhieu(phieu))
            .finally(() => setLoading(false));
    }, [phieu?._id, dispatch]);

    function handleClose() {
        dispatch(clearSelected());
        onClose();
    }

    const isMuon = (fullPhieu?.loai || phieu?.loai) === "Mượn";
    const nhanLabel = isMuon ? "Đã nhận" : "Đã giao";
    const traLabel = isMuon ? "Đã trả" : "Đã nhận lại";

    const daNhan = fullPhieu?.trangThaiNhan === "Đã nhận";
    const daTra = fullPhieu?.trangThaiTra === "Đã trả";
    const trangThai = getTrangThai(fullPhieu);

    // Bước tiếp theo trong luồng 1 chiều duy nhất:
    // Chưa nhận -> "nhan" -> Đã nhận, chưa trả -> "tra" -> Đã trả -> null (hoàn tất)
    const nextStep = !daNhan ? "nhan" : !daTra ? "tra" : null;
    const nextStepLabel = nextStep === "nhan" ? nhanLabel : nextStep === "tra" ? traLabel : null;

    // Một hàm duy nhất xử lý cả 2 bước, tự xác định field cần cập nhật
    async function handleConfirmNext() {
        if (!fullPhieu || !nextStep) return;
        setUpdatingStep(true);
        try {
            const payload = {
                id: fullPhieu._id,
                currentRole: user?.quyenSuDung?.ten,
                ...(nextStep === "nhan"
                    ? { trangThaiNhan: "Đã nhận" }
                    : { trangThaiTra: "Đã trả" }),
            };
            await dispatch(updatePhieuMuonVatLieu(payload)).unwrap();
            const res = await dispatch(fetchPhieuMuonVatLieuById(fullPhieu._id)).unwrap();
            setFullPhieu(res.data || res);
            toast.success(
                nextStep === "nhan"
                    ? (isMuon ? "Cập nhật: Đã nhận — tồn kho đã được cộng" : "Cập nhật: Đã giao — tồn kho đã được trừ")
                    : (isMuon ? "Cập nhật: Đã trả — tồn kho đã được trừ" : "Cập nhật: Đã nhận lại — tồn kho đã được cộng")
            );
            onUpdated?.();
        } catch (err) {
            toast.error(err?.message || "Cập nhật thất bại");
        } finally {
            setUpdatingStep(false);
        }
    }

    async function handleConfirmDelete() {
        try {
            await dispatch(deletePhieuMuonVatLieu(fullPhieu._id)).unwrap();
            toast.success("Đã xóa phiếu");
            onUpdated?.();
            handleClose();
        } catch (err) {
            toast.error(err?.message || "Xóa thất bại");
        } finally {
            setShowDeleteConfirm(false);
        }
    }

    function handleEditClose() {
        setShowEditModal(false);
        if (fullPhieu?._id) {
            dispatch(fetchPhieuMuonVatLieuById(fullPhieu._id))
                .unwrap()
                .then((res) => setFullPhieu(res.data || res))
                .catch(() => { });
        }
        onUpdated?.();
    }

    if (!phieu) return null;

    const isLocked = (daNhan || daTra) && user?.quyenSuDung?.ten !== "Admin";
    const headerBg = isMuon ? "bg-sky-400" : "bg-green-500";
    const headerHoverBg = isMuon ? "hover:bg-sky-500" : "hover:bg-green-600";

    return (
        <>
            <div
                className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/40 sm:p-4"
                onClick={handleClose}
            >
                <div
                    className="w-full sm:max-w-5xl h-[85vh] sm:h-auto sm:max-h-[85vh] flex flex-col bg-white rounded-t-lg sm:rounded-lg shadow-xl overflow-hidden relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className={`flex items-center justify-between px-4 sm:px-5 py-3 shrink-0 ${headerBg}`}>
                        <div className="text-white pr-2 truncate">
                            <div className="font-semibold text-sm sm:text-base leading-tight truncate">
                                {fullPhieu?.soPhieu || "-"}
                            </div>
                            <div className="text-xs sm:text-sm text-white/80">
                                {isMuon ? "Phiếu mượn" : "Phiếu cho mượn"}
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-white shrink-0">
                            <button
                                onClick={() => {
                                    if (isLocked) {
                                        toast.error("Phiếu đã xử lý, không thể chỉnh sửa");
                                        return;
                                    }
                                    setShowEditModal(true);
                                }}
                                title={isLocked ? "Phiếu đã xử lý" : "Sửa phiếu"}
                                className={`w-8 h-8 flex items-center justify-center rounded-full transition ${isLocked ? "opacity-40 cursor-not-allowed" : headerHoverBg}`}
                            >
                                <EditIcon sx={{ fontSize: 20 }} />
                            </button>
                            <button
                                onClick={() => {
                                    if (isLocked) {
                                        toast.error("Phiếu đã xử lý, không thể xóa");
                                        return;
                                    }
                                    setShowDeleteConfirm(true);
                                }}
                                title={isLocked ? "Không thể xóa phiếu đã xử lý" : "Xóa phiếu"}
                                className={`w-8 h-8 flex items-center justify-center rounded-full transition ${isLocked ? "opacity-40 cursor-not-allowed" : headerHoverBg}`}
                            >
                                <DeleteIcon sx={{ fontSize: 20 }} />
                            </button>
                            <button
                                onClick={handleClose}
                                className={`w-8 h-8 flex items-center justify-center text-white/90 hover:text-white rounded-full text-xl leading-none ${headerHoverBg}`}
                                aria-label="Đóng"
                            >
                                ×
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto">
                        {loading ? (
                            <div className="flex items-center justify-center h-32 text-base text-gray-400">
                                Đang tải...
                            </div>
                        ) : fullPhieu ? (
                            <div className="p-4 flex flex-col gap-5">
                                {/* Meta info */}
                                <div className="flex flex-col gap-2 bg-gray-100 rounded-lg p-3">
                                    <InfoRow label="Ngày tạo" value={formatNgay(fullPhieu.ngayTao)} />
                                    {fullPhieu.ngayCapNhat && (
                                        <InfoRow label="Cập nhật" value={formatNgay(fullPhieu.ngayCapNhat)} />
                                    )}
                                    <InfoRow label="Nhân viên" value={fullPhieu.nhanVien} />
                                    <InfoRow label={isMuon ? "Mượn của" : "Cho mượn"} value={fullPhieu.doiTac?.ten} />
                                    <InfoRow label="Số điện thoại" value={fullPhieu.doiTac?.soDienThoai} />
                                    <InfoRow label="Địa chỉ" value={fullPhieu.doiTac?.diaChi} />
                                    {fullPhieu.ghiChu && (
                                        <InfoRow label="Ghi chú" value={fullPhieu.ghiChu} />
                                    )}
                                    {/* Trạng thái — gộp làm 1, cùng logic với bảng danh sách */}
                                    {trangThai && (
                                        <div className="flex items-center gap-2 text-base">
                                            <span className="text-gray-500 w-28 shrink-0">Trạng thái:</span>
                                            <span className={`text-base text-white font-medium px-2.5 py-0.5 ${trangThai.cls}`}>
                                                {trangThai.text}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Danh sách vật liệu */}
                                <div>
                                    <h3 className="text-base font-semibold text-gray-600 mb-2">
                                        Danh sách vật liệu ({fullPhieu.danhSachVatLieu?.length || 0})
                                    </h3>
                                    <div className="border border-gray-200 overflow-hidden">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-xs sm:text-base whitespace-nowrap sm:whitespace-normal">
                                                <thead>
                                                    <tr className={isMuon ? "bg-sky-100" : "bg-green-100"}>
                                                        <th className="text-left py-1 px-2 font-normal text-gray-700">STT</th>
                                                        <th className="text-left py-1 px-2 font-normal text-gray-700">Vật liệu</th>
                                                        <th className="text-left py-1 px-2 font-normal text-gray-700">ĐVT</th>
                                                        <th className="text-right py-1 px-2 font-normal text-gray-700">SL</th>
                                                        <th className="text-left py-1 px-2 font-normal text-gray-700">Mô tả</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(fullPhieu.danhSachVatLieu || []).map((item, i) => (
                                                        <tr
                                                            key={i}
                                                            className={`border-t border-gray-100 ${i % 2 === 1 ? "bg-gray-50" : "bg-white"}`}
                                                        >
                                                            <td className="py-1 px-2 w-10">
                                                                {i + 1}
                                                            </td>
                                                            <td
                                                                className="py-1 px-2"
                                                                title={item.vatLieu?.tenVatLieu || "—"}
                                                            >
                                                                {item.vatLieu?.tenVatLieu || "—"}
                                                            </td>
                                                            <td className="py-1 px-2 w-8 md:w-20">
                                                                {item.vatLieu?.donViTinh || "—"}
                                                            </td>
                                                            <td className="py-1 px-2 text-right w-8 md:w-20">{item.soLuong}</td>
                                                            <td className="py-1 px-2">
                                                                {item.moTa || "—"}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions — 1 nút duy nhất theo luồng 1 chiều */}
                                <div className="flex flex-col gap-2">
                                    {nextStep ? (
                                        <button
                                            onClick={handleConfirmNext}
                                            disabled={updatingStep}
                                            className={`w-full py-2.5 rounded-lg text-base font-medium text-white transition disabled:opacity-60 ${nextStep === "nhan"
                                                ? (isMuon ? "bg-sky-500 hover:bg-sky-600" : "bg-green-500 hover:bg-green-600")
                                                : "bg-orange-500 hover:bg-orange-600"
                                                }`}
                                        >
                                            {updatingStep ? "Đang cập nhật..." : `Đánh dấu ${nextStepLabel}`}
                                        </button>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-green-50 border border-green-200 text-base text-green-700">
                                            <LockIcon sx={{ fontSize: 16 }} />
                                            Đã hoàn tất ({traLabel})
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : null}
                    </div>

                    {/* Delete confirm overlay */}
                    {showDeleteConfirm && (
                        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-20 p-6">
                            <p className="text-center font-medium text-gray-800">
                                Xóa phiếu{" "}
                                <span className="text-red-600 font-semibold">
                                    {fullPhieu?.doiTac?.ten || (isMuon ? "phiếu mượn" : "phiếu cho mượn")}
                                </span>
                                ?
                            </p>
                            <p className="text-base text-gray-500 text-center">
                                Thao tác này không thể hoàn tác.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-5 py-2 rounded-lg border border-gray-300 text-base text-gray-600 hover:bg-gray-100 transition"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    className="px-5 py-2 rounded-lg bg-red-500 text-white text-base font-medium hover:bg-red-600 transition"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit modal (stacked above this modal) */}
            {showEditModal && fullPhieu && (
                <PhieuMuonModal
                    open={showEditModal}
                    onClose={handleEditClose}
                    editData={fullPhieu}
                />
            )}
        </>
    );
}