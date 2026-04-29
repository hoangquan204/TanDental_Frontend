import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Tabs,
  Tab,
  TextField,
  Button,
  MenuItem,
  Modal,
  Divider,
  Card,
  IconButton,
  Stack,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  timelineItemClasses,
} from "@mui/lab";

// Icons
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Info,
  Calendar,
  MessageSquare,
  Save,
  X,
  Trash2,
} from "lucide-react";
import CallIcon from "@mui/icons-material/Call";

// Redux Actions (Đảm bảo đường dẫn đúng với cấu trúc dự án của bạn)
import {
  fetchChamSocByNhaKhoa,
  createChamSoc,
  deleteChamSoc,
  clearChamSoc,
} from "../../redux/slices/chamSocKhachHangSlice";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import MapIcon from "@mui/icons-material/Map";
import DescriptionIcon from "@mui/icons-material/Description";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const NhaKhoaDetailModal = ({ nhaKhoaData }) => {
  const dispatch = useDispatch();

  // 1. Lấy dữ liệu từ Redux Store
  const { data: logs, loading } = useSelector(
    (state) => state.chamSocKhachHang
  );

  // 2. Local State
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({
    type: "CALL",
    content: "",
    result: "",
    nextCareDate: "",
  });

  // 3. Xử lý đóng/mở Modal
  const handleOpen = () => {
    setOpen(true);
    if (nhaKhoaData?._id) {
      dispatch(fetchChamSocByNhaKhoa(nhaKhoaData._id));
    }
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(clearChamSoc()); // Xóa dữ liệu cũ khi đóng modal
    setTab(0);
  };

  // 4. Xử lý Thêm nhật ký mới
  const handleAddLog = async () => {
    if (!form.content) return;

    const payload = {
      nhaKhoaId: nhaKhoaData._id,
      hinhThuc: form.type,
      noiDung: form.content,
      ketQua: form.result,
      ngayHenTiep: form.nextCareDate,
    };

    const resultAction = await dispatch(createChamSoc(payload));
    if (createChamSoc.fulfilled.match(resultAction)) {
      // Reset form sau khi lưu thành công
      setForm({ type: "CALL", content: "", result: "", nextCareDate: "" });
    }
  };

  // 5. Xử lý Xóa nhật ký
  const handleDeleteLog = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhật ký này?")) {
      dispatch(deleteChamSoc(id));
    }
  };

  // Cấu hình Icon & Màu sắc cho từng loại hình chăm sóc
  const getTypeConfig = (type) => {
    switch (type) {
      case "CALL":
        return {
          label: "Gọi điện",
          color: "#3b82f6",
          icon: <Phone size={14} />,
        };
      case "ZALO":
        return {
          label: "Zalo",
          color: "#0068ff",
          icon: <MessageSquare size={14} />,
        };
      case "EMAIL":
        return { label: "Email", color: "#10b981", icon: <Mail size={14} /> };
      default:
        return { label: "Khác", color: "#6b7280", icon: <Info size={14} /> };
    }
  };

  return (
    <>
      <Tooltip title="Chi tiết & Chăm sóc">
        <IconButton
          onClick={handleOpen}
          sx={{
            bgcolor: "#10b981",
            color: "white",
            "&:hover": { bgcolor: "#059669" },
          }}
        >
          <CallIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: "950px",
            maxHeight: "90vh",
            bgcolor: "background.paper",
            borderRadius: "24px",
            boxShadow: 24,
            outline: "none",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 3,
              background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
              color: "white",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {nhaKhoaData?.hoVaTen}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  ID: {nhaKhoaData?._id}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}>
            <Tabs value={tab} onChange={(e, v) => setTab(v)}>
              <Tab
                label="Thông tin tổng quan"
                sx={{ textTransform: "none", fontWeight: 600 }}
              />
              <Tab
                label="Lịch sử chăm sóc"
                sx={{ textTransform: "none", fontWeight: 600 }}
              />
            </Tabs>
          </Box>

          <Box
            sx={{ p: 4, overflowY: "auto", bgcolor: "#f8fafc", flexGrow: 1 }}
          >
            {tab === 0 ? (
              <Stack spacing={3}>
                <Card
                  sx={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  {/* Phần tiêu đề phụ nhẹ nhàng */}
                  <Box sx={{ bgcolor: "#f1f5f9", px: 3, py: 1.5 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: "#475569",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Info size={18} /> THÔNG TIN CHI TIẾT
                    </Typography>
                  </Box>

                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={4}>
                      {/* CỘT 1: LIÊN HỆ */}
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            color: "primary.main",
                            textTransform: "uppercase",
                            mb: 2,
                            display: "block",
                          }}
                        >
                          Liên lạc
                        </Typography>
                        <Stack spacing={2}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Box
                              sx={{
                                bgcolor: "#eff6ff",
                                p: 1,
                                borderRadius: "10px",
                                display: "flex",
                              }}
                            >
                              <PhoneIcon
                                sx={{ fontSize: 20, color: "#3b82f6" }}
                              />
                            </Box>
                            <Box>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Số điện thoại
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: 600 }}
                              >
                                {nhaKhoaData?.soDienThoai || "Chưa cập nhật"}
                              </Typography>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Box
                              sx={{
                                bgcolor: "#eff6ff",
                                p: 1,
                                borderRadius: "10px",
                                display: "flex",
                              }}
                            >
                              <EmailIcon
                                sx={{ fontSize: 20, color: "#3b82f6" }}
                              />
                            </Box>
                            <Box>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Địa chỉ Email
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: 600 }}
                              >
                                {nhaKhoaData?.email || "Chưa cập nhật"}
                              </Typography>
                            </Box>
                          </Box>
                        </Stack>
                      </Grid>

                      {/* CỘT 2: VỊ TRÍ */}
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            color: "primary.main",
                            textTransform: "uppercase",
                            mb: 2,
                            display: "block",
                          }}
                        >
                          Vị trí
                        </Typography>
                        <Stack spacing={2}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Box
                              sx={{
                                bgcolor: "#fff1f2",
                                p: 1,
                                borderRadius: "10px",
                                display: "flex",
                              }}
                            >
                              <LocationOnIcon
                                sx={{ fontSize: 20, color: "#ef4444" }}
                              />
                            </Box>
                            <Box>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Địa chỉ cụ thể
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: 600 }}
                              >
                                {nhaKhoaData?.diaChiCuThe}
                              </Typography>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Box
                              sx={{
                                bgcolor: "#f0fdf4",
                                p: 1,
                                borderRadius: "10px",
                                display: "flex",
                              }}
                            >
                              <MapIcon
                                sx={{ fontSize: 20, color: "#22c55e" }}
                              />
                            </Box>
                            <Box>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Khu vực
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: 600 }}
                              >
                                {nhaKhoaData?.quanHuyen}, {nhaKhoaData?.tinh}
                              </Typography>
                            </Box>
                          </Box>
                        </Stack>
                      </Grid>

                      {/* PHẦN MÔ TẢ TRẢI DÀI */}
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            mt: 2,
                            p: 2,
                            bgcolor: "#f8fafc",
                            borderRadius: "12px",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 700,
                              mb: 1,
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <DescriptionIcon sx={{ fontSize: 18 }} /> Ghi chú &
                            Mô tả
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#475569", lineHeight: 1.6 }}
                          >
                            {nhaKhoaData?.moTa ||
                              "Hiện chưa có thông tin mô tả chi tiết cho nha khoa này."}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              </Stack>
            ) : (
              <Stack spacing={3}>
                {/* Form Nhập Log */}
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <TextField
                        select
                        fullWidth
                        size="small"
                        label="Hình thức"
                        value={form.type}
                        onChange={(e) =>
                          setForm({ ...form, type: e.target.value })
                        }
                        SelectProps={{
                          native: false,
                        }}
                      >
                        <MenuItem value="CALL">Gọi điện</MenuItem>

                        <MenuItem value="ZALO">Zalo</MenuItem>

                        <MenuItem value="EMAIL">Email</MenuItem>

                        <MenuItem value="OTHER">Khác...</MenuItem>
                      </TextField>

                      {form.type === "OTHER" && (
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="Nhập hình thức (VD: Facebook, gặp trực tiếp...)"
                          value={form.customType || ""}
                          onChange={(e) =>
                            setForm({
                              ...form,

                              customType: e.target.value,
                            })
                          }
                          sx={{ mt: 1 }}
                        />
                      )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Kết quả"
                        value={form.result}
                        onChange={(e) =>
                          setForm({ ...form, result: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <TextField
                        fullWidth
                        size="small"
                        type="datetime-local"
                        label="Hẹn chăm sóc tiếp"
                        value={form.nextCareDate}
                        onChange={(e) =>
                          setForm({ ...form, nextCareDate: e.target.value })
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{
                          "& input::-webkit-calendar-picker-indicator": {
                            cursor: "pointer",
                          },

                          // Đảm bảo label luôn ở trên cao khi có giá trị hoặc type là date

                          "& .MuiInputLabel-root": {
                            transform: "translate(14px, -9px) scale(0.75)",

                            bgcolor: "white",

                            px: 0.5,
                          },

                          "& .MuiInputLabel-shrink": {
                            transform: "translate(14px, -9px) scale(0.75)",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        label="Nội dung trao đổi"
                        value={form.content}
                        onChange={(e) =>
                          setForm({ ...form, content: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "right" }}>
                      <Button
                        variant="contained"
                        startIcon={<Save size={18} />}
                        onClick={handleAddLog}
                      >
                        Lưu nhật ký
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Timeline Lịch sử */}
                <Box>
                  {loading ? (
                    <Box sx={{ textAlign: "center", py: 4 }}>
                      <CircularProgress />
                    </Box>
                  ) : logs.length === 0 ? (
                    <Typography
                      align="center"
                      color="text.secondary"
                      sx={{ py: 4 }}
                    >
                      Chưa có lịch sử chăm sóc
                    </Typography>
                  ) : (
                    <Timeline
                      sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                          flex: 0,
                          padding: 0,
                        },
                      }}
                    >
                      {logs.map((log) => {
                        const config = getTypeConfig(log.hinhThuc);
                        return (
                          <TimelineItem key={log._id}>
                            <TimelineSeparator>
                              <TimelineDot sx={{ bgcolor: config.color }}>
                                <Box color="white">{config.icon}</Box>
                              </TimelineDot>
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ pb: 3 }}>
                              <Paper
                                sx={{
                                  p: 2,
                                  borderRadius: "12px",
                                  border: "1px solid #e2e8f0",
                                  position: "relative",
                                }}
                              >
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteLog(log._id)}
                                  sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    color: "#94a3b8",
                                  }}
                                >
                                  <Trash2 size={14} />
                                </IconButton>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                  mb={1}
                                >
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      fontWeight: 700,
                                      color: config.color,
                                    }}
                                  >
                                    {config.label.toUpperCase()}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {new Date(log.createdAt).toLocaleString(
                                      "vi-VN"
                                    )}
                                  </Typography>
                                </Stack>
                                <Typography
                                  variant="body2"
                                  sx={{ fontWeight: 600 }}
                                >
                                  {log.noiDung}
                                </Typography>
                                <Stack direction="row" spacing={2} mt={1}>
                                  <Typography variant="caption">
                                    Kết quả: <b>{log.ketQua || "N/A"}</b>
                                  </Typography>
                                  {log.ngayHenTiep && (
                                    <Typography
                                      variant="caption"
                                      color="error"
                                      sx={{ fontWeight: 600 }}
                                    >
                                      📅 Hẹn:{" "}
                                      {new Date(log.ngayHenTiep).toLocaleString(
                                        "vi-VN"
                                      )}
                                    </Typography>
                                  )}
                                </Stack>
                              </Paper>
                            </TimelineContent>
                          </TimelineItem>
                        );
                      })}
                    </Timeline>
                  )}
                </Box>
              </Stack>
            )}
          </Box>
          <Box sx={{ p: 2, textAlign: "right", bgcolor: "#f1f5f9" }}>
            <Button onClick={handleClose} variant="text" color="inherit">
              Đóng
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default NhaKhoaDetailModal;
