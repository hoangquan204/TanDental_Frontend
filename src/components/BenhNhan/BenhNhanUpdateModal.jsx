import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  MenuItem,
  CircularProgress,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { updateBenhNhan } from "../../redux/slices/benhNhanSlice";
import { fetchNhaKhoa } from "../../redux/slices/nhaKhoaSlice";

import vietnamAddress from "../../data/vietNameAddress";

export default function BenhNhanUpdateModal({ open, setOpen, data }) {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.benhNhan);
  const { data: nhaKhoas } = useSelector((state) => state.nhaKhoa);

  const [districts, setDistricts] = useState([]);

  const [form, setForm] = useState({
    hoVaTen: "",
    soHoSo: "",
    gioiTinh: "",
    tinh: "",
    quanHuyen: "",
    nhaKhoa: "",
  });

  // ===== LOAD DATA VÀO FORM =====
  useEffect(() => {
    if (data) {
      setForm({
        hoVaTen: data.hoVaTen || "",
        soHoSo: data.soHoSo || "",
        gioiTinh: data.gioiTinh || "",
        tinh: data.tinh || "",
        quanHuyen: data.quanHuyen || "",
        nhaKhoa: data.nhaKhoa?._id || "",
      });

      // load quận theo tỉnh
      const province = vietnamAddress.find((p) => p.name === data.tinh);
      setDistricts(province?.districts || []);
    }
  }, [data]);

  useEffect(() => {
    dispatch(fetchNhaKhoa());
  }, [dispatch]);

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
      await dispatch(
        updateBenhNhan({
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
            Cập Nhật Bệnh Nhân
          </Typography>
        </div>
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

          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "Cập nhật"}
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
