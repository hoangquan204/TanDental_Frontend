import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StaffModal from "./StaffModal";

import { useDispatch, useSelector } from "react-redux";
import { fetchStaff, deleteStaff, updateStaff } from "../../redux/slices/staffSlice";

export default function StaffTable() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.staff);
  const { user } = useSelector((state) => state.auth);

  // Kiểm tra xem user là Admin không
  const isAdmin = user?.ChucVu === "Sở hữu";

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  /* ================= HANDLE DELETE ================= */
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteStaff(selectedId)).unwrap();
      setOpenDelete(false);
      setSelectedId(null);
      // Refetch dữ liệu sau khi xóa
      dispatch(fetchStaff());
    } catch (err) {
      console.log("Lỗi:", err);
    }
  };

  /* ================= HANDLE EDIT ================= */
  const handleEditClick = (id) => {
    setEditingId(id);
    setShowEditModal(true);
  };

  /* ================= FORMAT DATE ================= */
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("vi-VN");
  };

  /* ================= GET STATUS TEXT ================= */
  const getStatusText = (status) => {
    return status === 1 ? "Hoạt động" : "Bị khoá";
  };

  const getStatusColor = (status) => {
    return status === 1 ? "success" : "error";
  };

  /* ================= GET ROLE COLOR ================= */
  const getRoleColor = (role) => {
    switch (role) {
      case "Sở hữu":
        return "error";
      case "Quản lý":
        return "warning";
      case "Thành viên":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <>
      <TableContainer component={Paper} className="rounded-2xl shadow-lg">
        <Table>
          {/* HEADER */}
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell>
                <b>Mã (Code)</b>
              </TableCell>
              <TableCell>
                <b>Tên</b>
              </TableCell>
              <TableCell>
                <b>Email</b>
              </TableCell>
              <TableCell>
                <b>Vai trò</b>
              </TableCell>
              <TableCell>
                <b>Quyền sử dụng</b>
              </TableCell>
              <TableCell>
                <b>Bị khoá</b>
              </TableCell>
              <TableCell>
                <b>Ngày tạo</b>
              </TableCell>
              {isAdmin && (
                <TableCell align="center">
                  <b>Hành động</b>
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          {/* BODY */}
          <TableBody>
            {/* 🔥 LOADING */}
            {loading && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}

            {/* ❌ ERROR */}
            {error && (
              <TableRow>
                <TableCell colSpan={8} align="center" className="text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            )}

            {/* 📭 EMPTY */}
            {!loading && data.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}

            {/* ✅ DATA */}
            {!loading &&
              data.map((item) => (
                <TableRow key={item._id} hover>
                  <TableCell>{item.MSNV || "-"}</TableCell>
                  <TableCell>
                    <div className="font-semibold">{item.HoTenNV}</div>
                  </TableCell>
                  <TableCell>{item.Email}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.ChucVu}
                      color={getRoleColor(item.ChucVu)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{item.Permissions || "-"}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(item.Status)}
                      color={getStatusColor(item.Status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{formatDate(item.createdAt)}</TableCell>
                  {isAdmin && (
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEditClick(item._id)}
                        title="Chỉnh sửa"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteClick(item._id)}
                        title="Xóa"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* DIALOG XÓA */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>Bạn chắc chắn muốn xóa nhân viên này?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Hủy</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* MODAL CHỈNH SỬA */}
      {showEditModal && (
        <StaffEditModal
          staffId={editingId}
          onClose={() => {
            setShowEditModal(false);
            setEditingId(null);
          }}
        />
      )}
    </>
  );
}

// Modal chỉnh sửa
function StaffEditModal({ staffId, onClose }) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.staff);
  const [loading, setLoading] = React.useState(false);

  const [open, setOpen] = React.useState(true);

  const staff = data.find((s) => s._id === staffId);

  const [form, setForm] = React.useState({
    MSNV: staff?.MSNV || "",
    HoTenNV: staff?.HoTenNV || "",
    Email: staff?.Email || "",
    ChucVu: staff?.ChucVu || "Thành viên",
    Permissions: staff?.Permissions || "",
    Status: staff?.Status || 1,
  });

  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!form.HoTenNV.trim()) {
      newErrors.HoTenNV = "Tên nhân viên là bắt buộc";
    }

    if (!form.Email.trim()) {
      newErrors.Email = "Email là bắt buộc";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.Email)) {
      newErrors.Email = "Email không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await dispatch(
        updateStaff({ id: staffId, data: form })
      ).unwrap();
      
      // Refetch dữ liệu sau khi update thành công
      dispatch(fetchStaff());
      
      setOpen(false);
      onClose();
    } catch (err) {
      console.log("Lỗi:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => { setOpen(false); onClose(); }} maxWidth="sm" fullWidth>
      <DialogTitle>Chỉnh sửa nhân viên</DialogTitle>
      <DialogContent>
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Mã nhân viên (Code)"
              value={form.MSNV}
              onChange={(e) => handleChange("MSNV", e.target.value)}
              className="border rounded px-3 py-2"
            />

            <input
              type="text"
              placeholder="Tên nhân viên"
              value={form.HoTenNV}
              onChange={(e) => handleChange("HoTenNV", e.target.value)}
              className="border rounded px-3 py-2"
            />

            <input
              type="email"
              placeholder="Email"
              value={form.Email}
              onChange={(e) => handleChange("Email", e.target.value)}
              className="border rounded px-3 py-2"
            />

            <select
              value={form.ChucVu}
              onChange={(e) => handleChange("ChucVu", e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="Sở hữu">Sở hữu (Admin)</option>
              <option value="Quản lý">Quản lý</option>
              <option value="Thành viên">Thành viên</option>
            </select>

            <input
              type="text"
              placeholder="Quyền sử dụng"
              value={form.Permissions}
              onChange={(e) => handleChange("Permissions", e.target.value)}
              className="border rounded px-3 py-2"
            />

            <select
              value={form.Status}
              onChange={(e) => handleChange("Status", Number(e.target.value))}
              className="border rounded px-3 py-2"
            >
              <option value={1}>Hoạt động</option>
              <option value={0}>Bị khoá</option>
            </select>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { setOpen(false); onClose(); }}>Hủy</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : "Lưu"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
