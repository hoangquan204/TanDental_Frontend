import React, { useState } from "react";
import { Button, Modal, Box, TextField, MenuItem } from "@mui/material";
import vietnamAddress from "../../data/vietNameAddress";

export default function BenhNhanModal({ onAdd, nhaKhoas }) {
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

  const handleProvince = (e) => {
    const province = vietnamAddress.find((p) => p.name === e.target.value);
    setDistricts(province?.districts || []);

    setForm((prev) => ({
      ...prev,
      tinh: e.target.value,
      quanHuyen: "",
    }));
  };

  const handleSubmit = () => {
    const nk = nhaKhoas.find((x) => x._id === form.nhaKhoa);

    onAdd({
      _id: Date.now().toString(),
      ...form,
      nhaKhoa: nk,
    });

    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Thêm bệnh nhân
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="bg-white w-[700px] p-6 mx-auto mt-20 rounded-2xl">
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Tên"
              onChange={(e) => setForm({ ...form, hoVaTen: e.target.value })}
            />
            <TextField
              label="Số hồ sơ"
              onChange={(e) => setForm({ ...form, soHoSo: e.target.value })}
            />

            <TextField
              select
              label="Giới tính"
              onChange={(e) => setForm({ ...form, gioiTinh: e.target.value })}
            >
              <MenuItem value="Nam">Nam</MenuItem>
              <MenuItem value="Nữ">Nữ</MenuItem>
            </TextField>

            <TextField
              select
              label="Nha khoa"
              onChange={(e) => setForm({ ...form, nhaKhoa: e.target.value })}
            >
              {nhaKhoas.map((nk) => (
                <MenuItem key={nk._id} value={nk._id}>
                  {nk.hoVaTen}
                </MenuItem>
              ))}
            </TextField>

            <TextField select label="Tỉnh" onChange={handleProvince}>
              {vietnamAddress.map((p) => (
                <MenuItem key={p.name} value={p.name}>
                  {p.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField select label="Quận" disabled={!districts.length}>
              {districts.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className="flex justify-end mt-4">
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
