import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  MenuItem,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";

import vietnamAddress from "../../data/vietNameAddress";

// 🔥 REDUX
import { useDispatch, useSelector } from "react-redux";
import { createBenhNhan } from "../../redux/slices/benhNhanSlice";
import { fetchNhaKhoa } from "../../redux/slices/nhaKhoaSlice";
import AddIcon from "@mui/icons-material/Add";

export default function BenhNhanModal() {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.benhNhan);
  const { data: nhaKhoas } = useSelector((state) => state.nhaKhoa);

  const [open, setOpen] = useState(false);
  const [districts, setDistricts] = useState([]);

  const [form, setForm] = useState({
    hoVaTen: "",
    soHoSo: "",
    gioiTinh: "",
    tinh: "",
    quanHuyen: "",
    nhaKhoa: "",
  });

  /* ================= LOAD NHA KHOA ================= */
  useEffect(() => {
    dispatch(fetchNhaKhoa());
  }, [dispatch]);

  /* ================= HANDLE ================= */

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleProvince = (e) => {
    const province = vietnamAddress.find((p) => p.name === e.target.value);

    setDistricts(province?.districts || []);

    setForm((prev) => ({
      ...prev,
      tinh: e.target.value,
      quanHuyen: "",
    }));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(createBenhNhan(form)).unwrap();

      setOpen(false);

      // reset form
      setForm({
        hoVaTen: "",
        soHoSo: "",
        gioiTinh: "",
        tinh: "",
        quanHuyen: "",
        nhaKhoa: "",
      });

      setDistricts([]);
    } catch (err) {
      console.log("Lỗi:", err);
    }
  };

  /* ================= UI ================= */

  return (
    <>
      <Tooltip title="Thêm bệnh nhân">
        <IconButton
          onClick={() => setOpen(true)}
          className="bg-green-500 text-white hover:bg-green-600"
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="bg-white w-[700px] p-6 mx-auto mt-20 rounded-2xl shadow-xl">
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Tên"
              value={form.hoVaTen}
              onChange={(e) => handleChange("hoVaTen", e.target.value)}
            />

            <TextField
              label="Số hồ sơ"
              value={form.soHoSo}
              onChange={(e) => handleChange("soHoSo", e.target.value)}
            />

            <TextField
              select
              label="Giới tính"
              value={form.gioiTinh}
              onChange={(e) => handleChange("gioiTinh", e.target.value)}
            >
              <MenuItem value="Nam">Nam</MenuItem>
              <MenuItem value="Nữ">Nữ</MenuItem>
            </TextField>

            {/* 🔥 NHA KHOA */}
            <TextField
              select
              label="Nha khoa"
              value={form.nhaKhoa}
              onChange={(e) => handleChange("nhaKhoa", e.target.value)}
            >
              {nhaKhoas.map((nk) => (
                <MenuItem key={nk._id} value={nk._id}>
                  {nk.hoVaTen}
                </MenuItem>
              ))}
            </TextField>

            {/* 🔥 TỈNH */}
            <TextField
              select
              label="Tỉnh"
              value={form.tinh}
              onChange={handleProvince}
            >
              {vietnamAddress.map((p) => (
                <MenuItem key={p.name} value={p.name}>
                  {p.name}
                </MenuItem>
              ))}
            </TextField>

            {/* 🔥 QUẬN */}
            <TextField
              select
              label="Quận"
              value={form.quanHuyen}
              disabled={!districts.length}
              onChange={(e) => handleChange("quanHuyen", e.target.value)}
            >
              {districts.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </TextField>
          </div>

          {/* ACTION */}
          <div className="flex justify-end mt-4 gap-3">
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
