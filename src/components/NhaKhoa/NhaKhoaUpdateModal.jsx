import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { updateNhaKhoa } from "../../redux/slices/nhaKhoaSlice";

export default function NhaKhoaUpdateModal({ open, setOpen, data }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.nhaKhoa);

  const [form, setForm] = useState({
    hoVaTen: "",
    email: "",
    soDienThoai: "",
    diaChiCuThe: "",
    tinh: "",
    quocGia: "",
    website: "",
    moTa: "",
  });

  // ===== LOAD DATA =====
  useEffect(() => {
    if (data) {
      setForm({
        hoVaTen: data.hoVaTen || "",
        email: data.email || "",
        soDienThoai: data.soDienThoai || "",
        diaChiCuThe: data.diaChiCuThe || "",
        tinh: data.tinh || "",
        quocGia: data.quocGia || "",
        website: data.website || "",
        moTa: data.moTa || "",
      });
    }
  }, [data]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(
        updateNhaKhoa({
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
      <Box className="bg-white w-[700px] p-6 mx-auto mt-20 rounded-2xl shadow-xl">
        <div className="bg-[#0091ea] px-4 py-2 my-4 flex justify-between items-center shrink-0 text-white">
          <Typography variant="h6" className="font-medium text-[16px]">
            Cập Nhật Nha Khoa
          </Typography>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Tên"
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
            label="Website"
            value={form.website}
            onChange={(e) => handleChange("website", e.target.value)}
            fullWidth
          />

          <TextField
            label="Địa chỉ cụ thể"
            value={form.diaChiCuThe}
            onChange={(e) => handleChange("diaChiCuThe", e.target.value)}
            fullWidth
          />

          <TextField
            label="Tỉnh"
            value={form.tinh}
            onChange={(e) => handleChange("tinh", e.target.value)}
            fullWidth
          />

          <TextField
            label="Quốc gia"
            value={form.quocGia}
            onChange={(e) => handleChange("quocGia", e.target.value)}
            fullWidth
          />

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
