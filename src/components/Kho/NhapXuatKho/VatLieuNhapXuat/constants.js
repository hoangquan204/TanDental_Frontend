export const rowBase = "py-2 ps-2 text-slate-700";
export const borderBottom = "border-b border-gray-200";
export const imBg = "bg-sky-100";
export const exBg = "bg-green-100";

export const scrollbarStyle = `
    .table-scroll::-webkit-scrollbar { width: 4px; }
    .table-scroll::-webkit-scrollbar-track { background: #ccc; }
    .table-scroll::-webkit-scrollbar-thumb { background: #777; border-radius: 12px; }
    .table-scroll::-webkit-scrollbar-thumb:hover { background: #64748b; }
`;

function genMonthOptions() {
    const options = [];
    const now = new Date();
    for (let i = 0; i < 24; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const label = `Tháng ${d.getMonth() + 1}/${d.getFullYear()}`;
        const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        options.push({ label, value });
    }
    return options;
}

export const MONTH_OPTIONS = genMonthOptions();

// Format ISO date string → "HH:MM DD/MM/YYYY"
export function formatNgay(dateStr) {
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

// Chuyển "YYYY-MM" → { tuNgay, denNgay } để gửi API
export function monthToDateRange(month) {
    if (!month) return {};
    const [year, mon] = month.split("-").map(Number);
    const tuNgay = `${year}-${String(mon).padStart(2, "0")}-01`;
    const lastDay = new Date(year, mon, 0).getDate();
    const denNgay = `${year}-${String(mon).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
    return { tuNgay, denNgay };
}

// Tổng hợp vật liệu từ danh sách phiếu (dùng chung cho cả phiếu nhập và phiếu xuất)
export function aggregateVatLieu(phieuList, tenVatLieuFilter) {
    const map = {};
    const keyword = tenVatLieuFilter?.trim().toLowerCase();

    phieuList.forEach((phieu) => {
        (phieu.danhSachVatLieu || []).forEach((item) => {
            const tenVatLieu = item.vatLieu?.tenVatLieu || "Không xác định";
            if (keyword && !tenVatLieu.toLowerCase().includes(keyword)) return;

            const id = item.vatLieu?._id || tenVatLieu || "unknown";
            if (!map[id]) map[id] = { id, tenVatLieu, soLuong: 0, chiTiet: [] };
            map[id].soLuong += item.soLuong || 0;
            map[id].donViTinh = item.vatLieu?.donViTinh;
            map[id].chiTiet.push({
                key: `${phieu._id}-${id}`,
                ngayTao: phieu.ngayTao,
                soPhieu: phieu.soPhieu,
                soLuong: item.soLuong || 0,
                donGia: item.donGia || 0,
                thanhTien: item.thanhTien || 0,
                moTa: item.moTa || "",
                // Phiếu nhập
                nhaCungCap: phieu.nhaCungCap?.ten,
                // Phiếu xuất
                boPhan: phieu.boPhan,
                nhanVien: phieu.nhanVien,
            });
        });
    });
    Object.values(map).forEach((row) => {
        row.chiTiet.sort((a, b) => new Date(b.ngayTao) - new Date(a.ngayTao));
    });
    return Object.values(map);
}