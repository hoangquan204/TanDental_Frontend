import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import vietnamAddress from "../../data/vietNameAddress";

// 🔥 REDUX
import { useDispatch, useSelector } from "react-redux";
import { createNhaKhoa } from "../../redux/slices/nhaKhoaSlice";

export default function NhaKhoaModal() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.nhaKhoa);

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

  const handleSubmit = async () => {
    try {
      await dispatch(createNhaKhoa(form)).unwrap();

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
    } catch (err) {
      console.log("Lỗi:", err);
    }
  };

  /* ================= UI ================= */

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Thêm nha khoa
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="bg-white w-[800px] max-h-[90vh] overflow-y-auto mx-auto mt-10 p-6 rounded-2xl shadow-xl">
          <Typography variant="h6" className="font-bold mb-4">
            Tạo Nha Khoa
          </Typography>

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

            <TextField
              select
              label="Quốc gia"
              fullWidth
              value={form.quocGia}
              onChange={(e) => handleChange("quocGia", e.target.value)}
            >
              <MenuItem value="Việt Nam">Việt Nam</MenuItem>
            </TextField>

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

            <TextField
              select
              label="Quận/Huyện"
              fullWidth
              value={form.quanHuyen}
              disabled={!districts.length}
              onChange={handleDistrictChange}
            >
              {districts.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className="mt-4">
            <TextField
              label="Địa chỉ cụ thể"
              fullWidth
              value={form.diaChiCuThe}
              onChange={(e) => handleChange("diaChiCuThe", e.target.value)}
            />
          </div>

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

          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={() => setOpen(false)}>Hủy</Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : "Lưu"}
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
