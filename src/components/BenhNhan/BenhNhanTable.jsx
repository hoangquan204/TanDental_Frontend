import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TextField,
  IconButton,
  Chip,
  Box,
  InputAdornment,
  MenuItem,
  Tooltip,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EditIcon from "@mui/icons-material/Edit";

import { useDispatch, useSelector } from "react-redux";
import { fetchBenhNhan } from "../../redux/slices/benhNhanSlice";
import BenhNhanModal from "./BenhNhanModal";

export default function BenhNhanTable() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.benhNhan);

  // ===== STATE =====
  const [search, setSearch] = useState("");
  const [selectedClinic, setSelectedClinic] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    dispatch(fetchBenhNhan());
  }, [dispatch]);

  // ===== DANH SÁCH NHA KHOA =====
  const clinicList = useMemo(() => {
    return [...new Set(data?.map((i) => i.nhaKhoa?.hoVaTen).filter(Boolean))];
  }, [data]);

  // ===== FILTER =====
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        item.hoVaTen?.toLowerCase().includes(search.toLowerCase()) ||
        item.soHoSo?.toLowerCase().includes(search.toLowerCase());

      const matchClinic = selectedClinic
        ? item.nhaKhoa?.hoVaTen === selectedClinic
        : true;

      return matchSearch && matchClinic;
    });
  }, [data, search, selectedClinic]);

  // ===== FAVORITE =====
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // ===== EDIT =====
  const handleEdit = (item) => {
    console.log("Edit:", item);
    // 👉 sau này mở modal edit ở đây
  };

  return (
    <Box>
      {/* ===== HEADER ===== */}
      <Box className="flex justify-between items-center mb-4">
        {/* LEFT */}
        <Box className="flex items-center gap-3">
          {/* CHIP */}
          {selectedClinic && (
            <Chip
              label={`Khách hàng: ${selectedClinic}`}
              onDelete={() => setSelectedClinic("")}
              className="bg-gray-200"
            />
          )}

          {/* SELECT */}
          <TextField
            select
            label="Nha khoa"
            size="small"
            value={selectedClinic}
            onChange={(e) => setSelectedClinic(e.target.value)}
            className="w-52"
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value="">Tất cả</MenuItem>
            {clinicList.map((c, index) => (
              <MenuItem key={index} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* RIGHT */}
        <Box className="flex items-center gap-2">
          <TextField
            size="small"
            placeholder="Tìm kiếm liên hệ"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-100 rounded-full"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />

          <BenhNhanModal></BenhNhanModal>

          <IconButton onClick={() => dispatch(fetchBenhNhan())}>
            <RefreshIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

      {/* ===== TABLE ===== */}
      <TableContainer component={Paper} className="rounded-2xl shadow-lg">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell width={50}></TableCell>
              <TableCell>
                <b>Tên</b>
              </TableCell>
              <TableCell>
                <b>Số hồ sơ</b>
              </TableCell>
              <TableCell>
                <b>Giới tính</b>
              </TableCell>
              <TableCell>
                <b>Nha khoa</b>
              </TableCell>
              <TableCell width={80}></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* LOADING */}
            {loading && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}

            {/* ERROR */}
            {error && (
              <TableRow>
                <TableCell colSpan={6} align="center" className="text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            )}

            {/* EMPTY */}
            {!loading && filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}

            {/* DATA */}
            {!loading &&
              filteredData.map((item) => {
                const isFav = favorites.includes(item._id);

                return (
                  <TableRow
                    key={item._id}
                    hover
                    className={isFav ? "bg-yellow-50" : ""}
                  >
                    {/* ⭐ */}
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => toggleFavorite(item._id)}
                      >
                        {isFav ? (
                          <StarIcon className="text-yellow-400" />
                        ) : (
                          <StarBorderIcon />
                        )}
                      </IconButton>
                    </TableCell>

                    <TableCell className="font-semibold">
                      {item.hoVaTen}
                    </TableCell>

                    <TableCell>{item.soHoSo}</TableCell>

                    <TableCell>{item.gioiTinh}</TableCell>

                    <TableCell>{item.nhaKhoa?.hoVaTen || "-"}</TableCell>

                    {/* ✏️ EDIT */}
                    <TableCell>
                      <Tooltip title="Chỉnh sửa">
                        <IconButton onClick={() => handleEdit(item)}>
                          <EditIcon className="text-blue-500 hover:text-blue-700" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
