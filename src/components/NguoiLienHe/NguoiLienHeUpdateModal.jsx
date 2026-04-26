import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { updateNguoiLienHe } from "../../redux/slices/nguoiLienHeSlice";
import { fetchNhaKhoa } from "../../redux/slices/nhaKhoaSlice";

export default function NguoiLienHeUpdateModal({ open, setOpen, data }) {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.nguoiLienHe);
  const { data: nhaKhoas } = useSelector((state) => state.nhaKhoa);

  const [form, setForm] = useState({
    hoVaTen: "",
    email: "",
    soDienThoai: "",
    nhaKhoa: "",
    moTa: "",
  });

  // ===== LOAD DATA VÀO FORM =====
  useEffect(() => {
    if (data) {
      setForm({
        hoVaTen: data.hoVaTen || "",
        email: data.email || "",
        soDienThoai: data.soDienThoai || "",
        nhaKhoa: data.nhaKhoa?._id || "",
        moTa: data.moTa || "",
      });
    }
  }, [data]);

  useEffect(() => {
    dispatch(fetchNhaKhoa());
  }, [dispatch]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(
        updateNguoiLienHe({
          id: data._id,
          data: form,
        })
      ).unwrap();

      setOpen(false);
    } catch (err) {
      console.log("Update lỗi:", err);
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box className="bg-white w-[600px] p-6 mx-auto mt-20 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold mb-4">Cập nhật người liên hệ</h2>

        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Họ tên"
            value={form.hoVaTen}
            onChange={(e) => handleChange("hoVaTen", e.target.value)}
            fullWidth
          />

          <TextField
            label="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            fullWidth
          />

          <TextField
            label="SĐT"
            value={form.soDienThoai}
            onChange={(e) => handleChange("soDienThoai", e.target.value)}
            fullWidth
          />

          <TextField
            select
            label="Nha khoa"
            value={form.nhaKhoa}
            onChange={(e) => handleChange("nhaKhoa", e.target.value)}
            fullWidth
          >
            {nhaKhoas.map((nk) => (
              <MenuItem key={nk._id} value={nk._id}>
                {nk.hoVaTen}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Mô tả"
            value={form.moTa}
            onChange={(e) => handleChange("moTa", e.target.value)}
            fullWidth
            multiline
            rows={3}
            className="col-span-2"
          />
        </div>

        {/* ACTION */}
        <div className="flex justify-end mt-4 gap-3">
          <Button onClick={() => setOpen(false)}>Hủy</Button>

          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "Cập nhật"}
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
