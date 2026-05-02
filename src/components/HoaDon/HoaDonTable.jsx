import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  Chip,
  Modal,
  Box,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Stack,
  Grid,
} from "@mui/material";
import {
  fetchAllHoaDonAdmin,
  updateHoaDon,
} from "../../redux/slices/hoaDonSlice";
import { fetchNhaKhoa } from "../../redux/slices/nhaKhoaSlice"; // Import action lấy danh sách nha khoa

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: 650 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const HoaDonTable = () => {
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux
  const { danhSachHoaDon, pagination, loading } = useSelector(
    (state) => state.hoaDon
  );
  const nhaKhoa = useSelector((state) => state.nhaKhoa);

  // State quản lý Modal
  const [selectedHD, setSelectedHD] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  // State cho phân trang và bộ lọc (Filters)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterNhaKhoa, setFilterNhaKhoa] = useState(""); // Lọc theo ID nha khoa
  const [filterTrangThai, setFilterTrangThai] = useState(""); // Lọc theo trạng thái
  const [statusUpdate, setStatusUpdate] = useState("");

  // Lấy danh sách nha khoa khi component mount
  useEffect(() => {
    dispatch(fetchNhaKhoa());
  }, [dispatch]);

  // Gọi API lấy hóa đơn khi page, limit hoặc bộ lọc thay đổi
  useEffect(() => {
    dispatch(
      fetchAllHoaDonAdmin({
        page: page + 1,
        limit: rowsPerPage,
        nhaKhoaId: filterNhaKhoa, // Truyền tham số lọc
        trangThai: filterTrangThai, // Truyền tham số lọc
      })
    );
  }, [dispatch, page, rowsPerPage, filterNhaKhoa, filterTrangThai]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDetail = (hd) => {
    setSelectedHD(hd);
    setOpenDetail(true);
  };

  const handleOpenUpdate = (hd) => {
    setSelectedHD(hd);
    setStatusUpdate(hd.trangThai);
    setOpenUpdate(true);
  };

  const handleConfirmUpdate = async () => {
    await dispatch(
      updateHoaDon({ id: selectedHD._id, data: { trangThai: statusUpdate } })
    );
    setOpenUpdate(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Quản lý Hóa Đơn Toàn Hệ Thống
      </h2>

      {/* BỘ LỌC (FILTERS) */}
      <Paper className="p-4 mb-6 shadow-sm">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Lọc theo Nha Khoa</InputLabel>
              <Select
                value={filterNhaKhoa}
                label="Lọc theo Nha Khoa"
                onChange={(e) => {
                  setFilterNhaKhoa(e.target.value);
                  setPage(0);
                }}
              >
                <MenuItem value=""> Tất cả nha khoa </MenuItem>
                {Array?.isArray(nhaKhoa?.data) &&
                  nhaKhoa?.data?.map((nk) => (
                    <MenuItem key={nk._id} value={nk._id}>
                      {nk.hoVaTen}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={filterTrangThai}
                label="Trạng thái"
                onChange={(e) => {
                  setFilterTrangThai(e.target.value);
                  setPage(0);
                }}
              >
                <MenuItem value="">Tất cả trạng thái</MenuItem>
                <MenuItem value="Chưa thanh toán">Chưa thanh toán</MenuItem>
                <MenuItem value="Đã thanh toán">Đã thanh toán</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="text"
              color="inherit"
              onClick={() => {
                setFilterNhaKhoa("");
                setFilterTrangThai("");
                setPage(0);
              }}
            >
              Xóa lọc
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell>Số Hóa Đơn</TableCell>
              <TableCell>Nha Khoa</TableCell>
              <TableCell>Tổng Tiền</TableCell>
              <TableCell>Trạng Thái</TableCell>
              <TableCell>Ngày Tạo</TableCell>
              <TableCell align="center">Thao Tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress size={30} className="my-4" />
                </TableCell>
              </TableRow>
            ) : danhSachHoaDon?.length > 0 ? (
              danhSachHoaDon.map((hd) => (
                <TableRow key={hd._id} hover>
                  <TableCell className="font-semibold">{hd.soHoaDon}</TableCell>
                  <TableCell>{hd.nhaKhoa?.hoVaTen}</TableCell>
                  <TableCell className="text-blue-600 font-medium">
                    {hd.thanhTien?.toLocaleString()}đ
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={hd.trangThai}
                      color={
                        hd.trangThai === "Đã thanh toán" ? "success" : "warning"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(hd.createdAt).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleOpenDetail(hd)}
                      >
                        Chi tiết
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenUpdate(hd)}
                      >
                        Cập nhật
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  className="py-10 text-gray-500"
                >
                  Không tìm thấy hóa đơn nào phù hợp.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={pagination.total || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang"
        />
      </TableContainer>

      {/* MODAL CHI TIẾT */}
      <Modal open={openDetail} onClose={() => setOpenDetail(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" className="font-bold mb-4 text-blue-700">
            Chi Tiết Hóa Đơn: {selectedHD?.soHoaDon}
          </Typography>
          <Divider className="mb-4" />

          <Grid container spacing={2} className="mb-6">
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Nha khoa
              </Typography>
              <Typography className="font-medium">
                {selectedHD?.nhaKhoa?.hoVaTen}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Trạng thái
              </Typography>
              <Chip label={selectedHD?.trangThai} size="small" color="info" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Tổng tiền chưa CK
              </Typography>
              <Typography>{selectedHD?.tongTien?.toLocaleString()}đ</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                color="textSecondary"
                className="text-red-500"
              >
                Thực thu (Sau CK)
              </Typography>
              <Typography className="text-lg font-bold text-red-600">
                {selectedHD?.thanhTien?.toLocaleString()}đ
              </Typography>
            </Grid>
          </Grid>

          <Typography className="font-semibold mb-2 text-sm uppercase text-gray-500">
            Danh sách đơn hàng & sản phẩm
          </Typography>

          <Box className="max-h-60 overflow-y-auto bg-gray-50 rounded border p-2">
            {selectedHD?.danhSachDonHang.map((item, idx) => (
              <Box key={idx} className="mb-3 pb-2 border-b last:border-0">
                <div className="flex justify-between items-start mb-1">
                  <Typography
                    variant="caption"
                    className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded"
                  >
                    ID Đơn: {item.donHang?._id?.slice(-6)}...
                  </Typography>
                  <Typography
                    variant="body2"
                    className="font-semibold text-blue-700"
                  >
                    {item.thanhTienSauCK?.toLocaleString()}đ
                  </Typography>
                </div>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {item.donHang?.danhSachSanPham?.map((spObj, i) => (
                    <Chip
                      key={i}
                      label={
                        spObj.sanPham?.tenSanPham || "Sản phẩm không xác định"
                      }
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: "0.75rem", height: "22px" }}
                    />
                  ))}
                </Stack>
              </Box>
            ))}
          </Box>

          <div className="flex justify-end mt-6">
            <Button onClick={() => setOpenDetail(false)} variant="outlined">
              Đóng
            </Button>
          </div>
        </Box>
      </Modal>

      {/* MODAL CẬP NHẬT TRẠNG THÁI */}
      <Modal open={openUpdate} onClose={() => setOpenUpdate(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" className="font-bold mb-6 text-center">
            Cập Nhật Trạng Thái Thanh Toán
          </Typography>
          <FormControl fullWidth className="mb-6">
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={statusUpdate}
              label="Trạng thái"
              onChange={(e) => setStatusUpdate(e.target.value)}
            >
              <MenuItem value="Chưa thanh toán">Chưa thanh toán</MenuItem>
              <MenuItem value="Đã thanh toán">Đã thanh toán</MenuItem>
            </Select>
          </FormControl>
          <div className="flex justify-end gap-3 mt-4">
            <Button onClick={() => setOpenUpdate(false)}>Hủy</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmUpdate}
            >
              Lưu thay đổi
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default HoaDonTable;
