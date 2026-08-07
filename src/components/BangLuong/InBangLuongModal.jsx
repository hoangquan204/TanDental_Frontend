import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { tinhLuong } from "../../utils/tinhLuong";
import { api } from "../../config/api";

export default function InBangLuongModal({ open, onClose, salaryData, thang, nam }) {
  const [selectedId, setSelectedId] = useState("");
  const printRef = useRef(null);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await api.get("/cong-ty");
        if (res.data && res.data.data) {
          setCompany(res.data.data);
        }
      } catch (err) {
        console.error("Lỗi lấy thông tin công ty:", err);
      }
    };
    fetchCompany();
  }, []);

  const selectedData = salaryData.find((item) => item._id === selectedId);

  const result = selectedData ? tinhLuong({
    luongCoBan: selectedData.luongCanBan || 0,
    ngayCongThang: selectedData.ngayCongThang || 28,
    soNgayCong: selectedData.soNgayCong || 0,
    com: selectedData.com || 0,
    dienThoai: selectedData.dienThoai || 0,
    thuong: selectedData.thuong || 0,
    phat: selectedData.phat || 0,
    ungTruoc: selectedData.ungTruoc || 0,
  }) : {};

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <html>
        <head>
          <meta charset="utf-8">
          <title>In Phiếu Lương - ${selectedData?.hoVaTen || ''}</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
              margin: 0; 
              padding: 8mm; 
              color: #000; 
              box-sizing: border-box;
            }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #000; padding: 6px; text-align: left; }
            th { background-color: #f2f2f2; }
            .header { text-align: center; margin-bottom: 12px; }
            .bold { font-weight: bold; }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
            @media print {
              .no-print { display: none; }
              @page { size: auto; margin: 0; }
            }
            @media print and (max-width: 160mm) {
              body {
                padding: 4mm 6mm !important;
              }
              .header-block {
                margin-bottom: 4px !important;
              }
              .header-title {
                margin-top: 4px !important;
                margin-bottom: 2px !important;
                font-size: 16px !important;
              }
              .info-block {
                margin-bottom: 4px !important;
              }
              .col-container {
                flex-direction: column !important;
                gap: 5px !important;
              }
              .col-item {
                margin-bottom: 4px !important;
                padding: 5px 7px !important;
              }
              .total-block {
                margin-top: 6px !important;
                padding: 6px 8px !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-wrapper">
            ${printContent.innerHTML}
          </div>
        </body>
      </html>
    `);
    doc.close();

    iframe.contentWindow.focus();
    setTimeout(() => {
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
    }, 250);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>In Bảng Lương Nhân Viên</DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth size="small" sx={{ mb: 3 }}>
          <InputLabel>Chọn nhân viên</InputLabel>
          <Select
            value={selectedId}
            label="Chọn nhân viên"
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {salaryData.map((nv) => (
              <MenuItem key={nv._id} value={nv._id}>
                {nv.hoVaTen}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedData ? (
          <Box sx={{ p: { xs: 2, sm: 4 }, border: "1px dashed #ccc", borderRadius: 2, bgcolor: "#fff", overflowX: "auto" }}>
            <div ref={printRef} style={{ minWidth: "600px", color: "#000", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
              <div className="header-block" style={{ textAlign: "center", marginBottom: "6px" }}>
                <h2 style={{ margin: 0, fontSize: "16px", fontWeight: "bold", textTransform: "uppercase" }}>{company?.Ten || ""}</h2>
                <p style={{ margin: "1px 0 0", fontSize: "12px" }}>{company?.DiaChi || ""}</p>
                <h3 className="header-title" style={{ margin: "8px 0 2px 0", fontSize: "18px", fontWeight: "bold" }}>PHIẾU LƯƠNG NHÂN VIÊN</h3>
                <p style={{ margin: 0, fontSize: "13px", fontStyle: "italic" }}>Tháng {thang} Năm {nam}</p>
              </div>

              <div className="info-block" style={{ marginBottom: "6px", fontSize: "14px" }}>
                <p style={{ margin: 0 }}><strong>Họ và tên:</strong> {selectedData.hoVaTen}</p>
              </div>

              <div className="col-container" style={{ display: "flex", gap: "8px", fontSize: "13px", alignItems: "stretch" }}>
                {/* CỘT 1: Lương chính */}
                <div className="col-item" style={{ flex: 1, border: "1px solid #000", padding: "6px 8px", borderRadius: "4px" }}>
                  <strong style={{ display: "block", textAlign: "center", borderBottom: "1px solid #000", paddingBottom: "3px", marginBottom: "6px", fontSize: "14px" }}>
                    I. CÔNG TÁC & LƯƠNG CHÍNH
                  </strong>

                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span>Lương cơ bản (LCB):</span>
                    <strong>{Math.round(Number(selectedData.luongCanBan || 0)).toLocaleString("vi-VN")} đ</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span>Ngày công quy định (NCT):</span>
                    <strong>{selectedData.ngayCongThang || 28} ngày</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", padding: "3px 4px", backgroundColor: "#f9fafb", borderRadius: "4px" }}>
                    <span>Lương 1 ngày <span style={{ fontSize: "11px", color: "#6b7280" }}>(LCB/NCT)</span>:</span>
                    <strong style={{ color: "#1d4ed8" }}>{Math.round(result.luongNgay || 0).toLocaleString("vi-VN")} đ</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span>Số ngày làm thực tế (SNC):</span>
                    <strong>{selectedData.soNgayCong || 0} ngày</strong>
                  </div>

                  <div style={{ marginTop: "6px", borderTop: "1px dashed #ccc", paddingTop: "5px", display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span><strong>Thành tiền công</strong> <br /><span style={{ fontSize: "11px", color: "#6b7280", fontWeight: "normal" }}>(Lương ngày x SNC)</span></span>
                    <strong style={{ color: "#1d4ed8" }}>{Math.round(result.thanhTienCong || 0).toLocaleString("vi-VN")} đ</strong>
                  </div>
                </div>

                {/* CỘT 2: Phụ cấp & Khấu trừ */}
                <div className="col-item" style={{ flex: 1, border: "1px solid #000", padding: "6px 8px", borderRadius: "4px" }}>
                  <strong style={{ display: "block", textAlign: "center", borderBottom: "1px solid #000", paddingBottom: "3px", marginBottom: "6px", fontSize: "14px" }}>
                    II. PHỤ CẤP & KHẤU TRỪ
                  </strong>

                  <strong style={{ color: "#15803d" }}>1. Các khoản phụ cấp (+)</strong>
                  <div style={{ paddingLeft: "8px", marginTop: "1px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                      <span>- Cơm:</span> <span>{Math.round(Number(selectedData.com || 0)).toLocaleString("vi-VN")} đ</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                      <span>- Điện thoại:</span> <span>{Math.round(Number(selectedData.dienThoai || 0)).toLocaleString("vi-VN")} đ</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                      <span>- Thưởng:</span> <span>{Math.round(Number(selectedData.thuong || 0)).toLocaleString("vi-VN")} đ</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", borderTop: "1px dashed #ccc", paddingTop: "3px" }}>
                      <strong style={{ color: "#15803d" }}>Tổng phụ cấp:</strong>
                      <strong style={{ color: "#15803d" }}>{Math.round(Number(result.tongPhuCap || 0)).toLocaleString("vi-VN")} đ</strong>
                    </div>
                  </div>

                  <strong style={{ color: "#b91c1c" }}>2. Các khoản khấu trừ (-)</strong>
                  <div style={{ paddingLeft: "8px", marginTop: "1px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                      <span>- Phạt:</span> <span>{Math.round(Number(selectedData.phat || 0)).toLocaleString("vi-VN")} đ</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                      <span>- Ứng trước:</span> <span>{Math.round(Number(selectedData.ungTruoc || 0)).toLocaleString("vi-VN")} đ</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px dashed #ccc", paddingTop: "3px" }}>
                      <strong style={{ color: "#b91c1c" }}>Tổng khấu trừ:</strong>
                      <strong style={{ color: "#b91c1c" }}>{Math.round(Number((selectedData.phat || 0) + (selectedData.ungTruoc || 0))).toLocaleString("vi-VN")} đ</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* TỔNG KẾT */}
              <div className="total-block" style={{ marginTop: "8px", border: "2px solid #000", padding: "8px 10px", backgroundColor: "#eff6ff", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "6px" }}>
                <div>
                  <strong style={{ fontSize: "15px" }}>III. LƯƠNG THỰC NHẬN</strong><br />
                  <span style={{ fontSize: "11px", color: "#4b5563" }}>(Thành tiền công + Tổng phụ cấp - Tổng khấu trừ)</span>
                </div>
                <div style={{ textAlign: "right", color: "#b91c1c", fontSize: "18px", fontWeight: "bold" }}>
                  {Math.round(Number(selectedData.thucNhan || result.thucNhan || 0)).toLocaleString("vi-VN")} đ
                </div>
              </div>
            </div>
          </Box>
        ) : (
          <Typography color="textSecondary" align="center" sx={{ py: 4 }}>
            Vui lòng chọn nhân viên để xem trước bảng lương.
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2, bgcolor: "#f8fafc" }}>
        <Button onClick={onClose} color="inherit" sx={{ mr: 1 }}>Đóng</Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PrintIcon />}
          disabled={!selectedData}
          onClick={handlePrint}
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          In phiếu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
