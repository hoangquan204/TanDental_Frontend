import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import PaymentsIcon from "@mui/icons-material/Payments";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; // 🔥 Thêm icon lịch cho ngày công
import { useDispatch } from "react-redux";
import {
  createNhanVien,
  updateNhanVien,
} from "../../redux/slices/nhanVienSlice";
import { toast } from "sonner";

const initialState = {
  hoVaTen: "",
  cccd: "",
  diaChi: "",
  soDienThoai: "",
  email: "",
  chucVu: "",
  luongCanBan: 0,
  ngayCongThang: 28, // 🔥 Thiết lập mặc định 28 ngày công cho nhân viên mới
  trangThai: "Đang làm",
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    background: "#fff",
    fontSize: 14,
    "&:hover fieldset": { borderColor: "#93c5fd" },
    "&.Mui-focused fieldset": { borderColor: "#3b82f6", borderWidth: 2 },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#3b82f6" },
};

const NhanVienFormModal = ({ open, onClose, initialData = null }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(
      initialData
        ? {
          hoVaTen: initialData.hoVaTen || "",
          cccd: initialData.cccd || "",
          diaChi: initialData.diaChi || "",
          soDienThoai: initialData.soDienThoai || "",
          email: initialData.email || "",
          chucVu: initialData.chucVu || "",
          luongCanBan: initialData.luongCanBan || 0,
          ngayCongThang: initialData.ngayCongThang || 28, // 🔥 Nhận dữ liệu cũ hoặc fallback về 28
          trangThai: initialData.trangThai || "Đang làm",
        }
        : initialState
    );
  }, [initialData, open]);

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    if (!formData.hoVaTen) {
      toast.error("Vui lòng nhập họ tên");
      return false;
    }
    if (!formData.cccd) {
      toast.error("Vui lòng nhập CCCD");
      return false;
    }
    if (formData.ngayCongThang < 0 || formData.ngayCongThang > 31) {
      toast.error("Ngày công tháng không hợp lệ (Từ 0 đến 31 ngày)");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      setLoading(true);

      const submitData = {
        ...formData,
        luongCanBan: Number(formData.luongCanBan),
        ngayCongThang: Number(formData.ngayCongThang),
      };

      if (initialData?._id) {
        await dispatch(
          updateNhanVien({ id: initialData._id, data: submitData })
        ).unwrap();
        toast.success("Cập nhật nhân viên thành công");
      } else {
        await dispatch(createNhanVien(submitData)).unwrap();
        toast.success("Tạo nhân viên thành công");
      }
      onClose();
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isEdit = !!initialData;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0,0,0,0.18)",
        },
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{
          background: "linear-gradient(135deg,#2563eb,#3b82f6)",
        }}
      >
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            {isEdit ? "Cập nhật nhân viên" : "Thêm nhân viên mới"}
          </h2>
          <p className="text-xs text-blue-100 opacity-90 mt-0.5">
            Quản lý thông tin nhân viên
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full uppercase"
            style={
              isEdit
                ? {
                  background: "rgba(15, 23, 42, 0.4)",
                  color: "#93c5fd",
                  border: "1px solid rgba(147, 197, 253, 0.3)",
                }
                : {
                  background: "rgba(22, 101, 52, 0.4)",
                  color: "#86efac",
                  border: "1px solid rgba(134, 239, 172, 0.3)",
                }
            }
          >
            {isEdit ? "EDIT MODE" : "NEW MODE"}
          </span>
          <button
            onClick={onClose}
            className="text-blue-100 hover:text-white transition-colors"
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
      </div>

      {/* Body */}
      <DialogContent sx={{ background: "#f8fafc", py: 4, px: 4 }}>
        <Grid container spacing={2.5}>
          {/* Hàng 1: Họ tên, CCCD, SĐT, Chức vụ */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Họ và tên *"
              size="small"
              value={formData.hoVaTen}
              onChange={(e) => handleChange("hoVaTen", e.target.value)}
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="CCCD *"
              size="small"
              value={formData.cccd}
              onChange={(e) => handleChange("cccd", e.target.value)}
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Số điện thoại"
              size="small"
              value={formData.soDienThoai}
              onChange={(e) => handleChange("soDienThoai", e.target.value)}
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Chức vụ"
              size="small"
              value={formData.chucVu}
              onChange={(e) => handleChange("chucVu", e.target.value)}
              sx={fieldSx}
            />
          </Grid>

          {/* Hàng 2: Trạng thái, Lương cơ bản, Ngày công tháng, Địa chỉ */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="Trạng thái"
              size="small"
              value={formData.trangThai}
              onChange={(e) => handleChange("trangThai", e.target.value)}
              sx={fieldSx}
            >
              <MenuItem value="Đang làm">Đang làm</MenuItem>
              <MenuItem value="Nghỉ việc">Nghỉ việc</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              type="text"
              inputMode="numeric"
              label="Lương cơ bản"
              size="small"
              value={
                formData.luongCanBan === "" || formData.luongCanBan === null
                  ? ""
                  : Number(formData.luongCanBan).toLocaleString("vi-VN")
              }
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "");
                handleChange("luongCanBan", raw === "" ? "" : Number(raw));
              }}
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              type="number"
              label="Ngày công tháng"
              size="small"
              value={formData.ngayCongThang}
              onChange={(e) =>
                handleChange("ngayCongThang", Number(e.target.value))
              }
              inputProps={{ min: 0, max: 31 }}
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Địa chỉ"
              size="small"
              value={formData.diaChi}
              onChange={(e) => handleChange("diaChi", e.target.value)}
              sx={fieldSx}
            />
          </Grid>

          {/* Hàng 3: Ghi chú */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={6}
              label="Ghi chú"
              size="small"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              sx={{
                ...fieldSx,
                "& .MuiOutlinedInput-root": {
                  ...fieldSx["& .MuiOutlinedInput-root"],
                  alignItems: "flex-start",
                },
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2.5 px-6 py-3.5 bg-white border-t border-slate-100">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
        >
          Hủy
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all disabled:opacity-60"
          style={{
            background: loading
              ? "#94a3b8"
              : "linear-gradient(135deg,#2563eb,#3b82f6)",
          }}
        >
          {loading && <CircularProgress size={14} sx={{ color: "#fff" }} />}
          {loading ? "Đang xử lý..." : isEdit ? "Cập nhật" : "Thêm mới"}
        </button>
      </div>
    </Dialog>
  );
};

export default NhanVienFormModal;
