import React, { useState } from "react";
import { Button, Modal, Box, TextField, MenuItem } from "@mui/material";

export default function NguoiLienHeModal({ onAdd, nhaKhoas }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    hoVaTen: "",
    email: "",
    soDienThoai: "",
    tieuDe: "",
    moTa: "",
    nhaKhoa: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
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
        Thêm liên hệ
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="bg-white w-[600px] p-6 mx-auto mt-20 rounded-2xl shadow-xl">
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Họ tên"
              fullWidth
              onChange={(e) => handleChange("hoVaTen", e.target.value)}
            />
            <TextField
              label="Email"
              fullWidth
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <TextField
              label="SĐT"
              fullWidth
              onChange={(e) => handleChange("soDienThoai", e.target.value)}
            />
            <TextField
              label="Tiêu đề"
              fullWidth
              onChange={(e) => handleChange("tieuDe", e.target.value)}
            />

            <TextField
              select
              label="Nha khoa"
              fullWidth
              onChange={(e) => handleChange("nhaKhoa", e.target.value)}
            >
              {nhaKhoas.map((nk) => (
                <MenuItem key={nk._id} value={nk._id}>
                  {nk.hoVaTen}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className="mt-4">
            <TextField
              label="Mô tả"
              fullWidth
              multiline
              rows={3}
              onChange={(e) => handleChange("moTa", e.target.value)}
            />
          </div>

          <div className="flex justify-end mt-4 gap-2">
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
