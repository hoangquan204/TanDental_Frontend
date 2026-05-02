import React, { useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchNhaKhoa } from "../../redux/slices/nhaKhoaSlice";

export default function DonHangChuaXuatFilter({
  selectedClinic,
  setSelectedClinic,
}) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.nhaKhoa);

  useEffect(() => {
    dispatch(fetchNhaKhoa());
  }, [dispatch]);

  return (
    <TextField
      select
      label="Chọn nha khoa"
      value={selectedClinic}
      onChange={(e) => setSelectedClinic(e.target.value)}
      className="w-80"
    >
      {data.map((nk) => (
        <MenuItem key={nk._id} value={nk._id}>
          {nk.hoVaTen}
        </MenuItem>
      ))}
    </TextField>
  );
}
