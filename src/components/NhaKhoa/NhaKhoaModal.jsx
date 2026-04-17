import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";

import vietnamAddress from "../../data/vietNameAddress";

export default function NhaKhoaModal({ onAdd }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    hoVaTen: "",
    tenGiaoDich: "",
    soDienThoai: "",
    email: "",
    website: "",
    quocGia: "Việt Nam",
    tinh: "",
    quanHuyen: "",
    diaChiCuThe: "",
    moTa: "",
  });

  const [districts, setDistricts] = useState([]);

  /* ================= HANDLE ================= */

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleProvinceChange = (e) => {
    const provinceName = e.target.value;

    const province = vietnamAddress.find((p) => p.name === provinceName);

    setDistricts(province?.districts || []);

    setForm((prev) => ({
      ...prev,
      tinh: provinceName,
      quanHuyen: "",
    }));
  };

  const handleDistrictChange = (e) => {
    setForm((prev) => ({
      ...prev,
      quanHuyen: e.target.value,
    }));
  };

  const handleSubmit = () => {
    onAdd({
      _id: Date.now().toString(),
      ...form,
      createdAt: new Date(),
    });

    setOpen(false);

    // reset form
    setForm({
      hoVaTen: "",
      tenGiaoDich: "",
      soDienThoai: "",
      email: "",
      website: "",
      quocGia: "Việt Nam",
      tinh: "",
      quanHuyen: "",
      diaChiCuThe: "",
      moTa: "",
    });

    setDistricts([]);
  };

  /* ================= UI ================= */

  return (
    <>
      {/* BUTTON */}
      <Button variant="contained" onClick={() => setOpen(true)}>
        Thêm nha khoa
      </Button>

      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="bg-white w-[800px] max-h-[90vh] overflow-y-auto mx-auto mt-10 p-6 rounded-2xl shadow-xl">
          {/* HEADER */}
          <Typography variant="h6" className="font-bold mb-4">
            Tạo Nha Khoa
          </Typography>

          {/* FORM */}
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Họ và tên"
              fullWidth
              value={form.hoVaTen}
              onChange={(e) => handleChange("hoVaTen", e.target.value)}
            />

            <TextField
              label="Tên giao dịch"
              fullWidth
              value={form.tenGiaoDich}
              onChange={(e) => handleChange("tenGiaoDich", e.target.value)}
            />

            <TextField
              label="Số điện thoại"
              fullWidth
              value={form.soDienThoai}
              onChange={(e) => handleChange("soDienThoai", e.target.value)}
            />

            <TextField
              label="Email"
              fullWidth
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />

            <TextField
              label="Website"
              fullWidth
              value={form.website}
              onChange={(e) => handleChange("website", e.target.value)}
            />

            {/* QUỐC GIA */}
            <TextField
              select
              label="Quốc gia"
              fullWidth
              value={form.quocGia}
              onChange={(e) => handleChange("quocGia", e.target.value)}
            >
              <MenuItem value="Việt Nam">Việt Nam</MenuItem>
            </TextField>

            {/* TỈNH */}
            <TextField
              select
              label="Tỉnh/Thành"
              fullWidth
              value={form.tinh}
              onChange={handleProvinceChange}
            >
              {vietnamAddress.map((p) => (
                <MenuItem key={p.name} value={p.name}>
                  {p.name}
                </MenuItem>
              ))}
            </TextField>

            {/* QUẬN */}
            <TextField
              select
              label="Quận/Huyện"
              fullWidth
              value={form.quanHuyen}
              disabled={!districts.length}
              onChange={handleDistrictChange}
              helperText={
                !districts.length ? "Chọn tỉnh trước" : "Chọn quận/huyện"
              }
            >
              {districts.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </TextField>
          </div>

          {/* ĐỊA CHỈ */}
          <div className="mt-4">
            <TextField
              label="Địa chỉ cụ thể"
              fullWidth
              value={form.diaChiCuThe}
              onChange={(e) => handleChange("diaChiCuThe", e.target.value)}
            />
          </div>

          {/* MÔ TẢ */}
          <div className="mt-4">
            <TextField
              label="Mô tả"
              fullWidth
              multiline
              rows={3}
              value={form.moTa}
              onChange={(e) => handleChange("moTa", e.target.value)}
            />
          </div>

          {/* ACTION */}
          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={() => setOpen(false)}>Hủy</Button>
            <Button variant="contained" onClick={handleSubmit}>
              Lưu
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
