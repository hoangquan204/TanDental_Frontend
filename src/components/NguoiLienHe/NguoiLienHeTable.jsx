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
  InputAdornment,
  IconButton,
  Chip,
  MenuItem,
  Box,
  Tooltip,
} from "@mui/material";

import {
  Search as SearchIcon,
  Star,
  StarBorder,
  Edit,
  Close,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { fetchNguoiLienHe } from "../../redux/slices/nguoiLienHeSlice";
import NguoiLienHeModal from "./NguoiLienHeModal";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NguoiLienHeUpdateModal from "./NguoiLienHeUpdateModal";

export default function NguoiLienHeTable() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.nguoiLienHe);

  // ===== STATE =====
  const [search, setSearch] = useState("");
  const [selectedClinic, setSelectedClinic] = useState("");
  const [favorites, setFavorites] = useState([]);

  const clinicList = useMemo(() => {
    return [...new Set(data?.map((i) => i.nhaKhoa?.hoVaTen).filter(Boolean))];
  }, [data]);

  useEffect(() => {
    dispatch(fetchNguoiLienHe());
  }, [dispatch]);

  // ===== LẤY DANH SÁCH NHA KHOA =====
  const clinics = useMemo(() => {
    const map = {};
    data.forEach((item) => {
      if (item.nhaKhoa?._id) {
        map[item.nhaKhoa._id] = item.nhaKhoa.hoVaTen;
      }
    });
    return Object.entries(map).map(([id, name]) => ({ id, name }));
  }, [data]);

  // ===== FILTER =====
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        item.hoVaTen?.toLowerCase().includes(keyword) ||
        item.email?.toLowerCase().includes(keyword) ||
        item.soDienThoai?.includes(search);

      const matchClinic = selectedClinic
        ? item.nhaKhoa?.hoVaTen === selectedClinic // ✅ sửa ở đây
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

  useEffect(() => {
    dispatch(fetchNguoiLienHe());
  }, [dispatch]);

  //UPDATE
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <Box>
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
            placeholder="Tìm kiếm liên hệ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />

          <NguoiLienHeModal></NguoiLienHeModal>

          <IconButton onClick={() => dispatch(fetchNguoiLienHe())}>
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
              <TableCell></TableCell>
              <TableCell>
                <b>Họ tên</b>
              </TableCell>
              <TableCell>
                <b>Email</b>
              </TableCell>
              <TableCell>
                <b>SĐT</b>
              </TableCell>
              <TableCell>
                <b>Nha khoa</b>
              </TableCell>
              <TableCell>
                <b>Mô tả</b>
              </TableCell>
              <TableCell align="center">
                <b>Hành động</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* LOADING */}
            {loading && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}

            {/* ERROR */}
            {error && (
              <TableRow>
                <TableCell colSpan={7} align="center" className="text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            )}

            {/* EMPTY */}
            {!loading && filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}

            {/* DATA */}
            {!loading &&
              filteredData.map((item) => (
                <TableRow key={item._id} hover>
                  {/* ⭐ FAVORITE */}
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => toggleFavorite(item._id)}
                    >
                      {favorites.includes(item._id) ? (
                        <Star className="text-yellow-400" />
                      ) : (
                        <StarBorder className="text-gray-400" />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-gray-800">
                      {item.hoVaTen}
                    </div>
                    <div className="text-xs text-gray-500">
                      ID: {item._id.slice(-6)}
                    </div>
                  </TableCell>{" "}
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.soDienThoai}</TableCell>
                  <TableCell>
                    <div className="font-semibold text-gray-800">
                      {item.nhaKhoa?.hoVaTen || "-"}
                    </div>
                  </TableCell>
                  <TableCell>{item.moTa}</TableCell>
                  {/* ACTION */}
                  <TableCell align="center">
                    <Tooltip title="Chỉnh sửa">
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSelectedRow(item);
                          setOpenEdit(true);
                        }}
                      >
                        <Edit className="text-blue-500" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NguoiLienHeUpdateModal
        open={openEdit}
        setOpen={setOpenEdit}
        data={selectedRow}
      />
    </Box>
  );
}
