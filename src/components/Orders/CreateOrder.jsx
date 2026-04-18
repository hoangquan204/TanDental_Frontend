import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";
import { Add, Close, MoreVert } from "@mui/icons-material";
import ToothSelectorModal from "./ToothSelectorModal";
import AccessoryModal from "./AccessoryModal";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";

const CreateOrder = () => {
  const [products, setProducts] = useState([]);

  // modal state
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [tempTeeth, setTempTeeth] = useState([]);

  const addProduct = () => {
    setProducts([
      ...products,
      { name: "", position: [], quantity: 0, color: "", note: "" },
    ]);
  };

  const handleChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  // mở modal đúng row
  const handleOpenModal = (index) => {
    setCurrentIndex(index);
    setTempTeeth(products[index].position || []);
    setOpen(true);
  };

  // submit răng
  const handleSubmitTeeth = () => {
    const newProducts = [...products];
    newProducts[currentIndex].position = [...tempTeeth].sort((a, b) => a - b);
    setProducts(newProducts);
    setOpen(false);
  };

  //phụ kiện
  const [openAccessory, setOpenAccessory] = useState(false);
  const [accessories, setAccessories] = useState([]);

  const handleAccessorySubmit = (data) => {
    setAccessories(data);
    setOpenAccessory(false);
  };

  const handleDeleteProduct = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <Box className="bg-white p-4 rounded-2xl shadow-md">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar>AK</Avatar>
              <div className="flex-1">
                <Typography variant="caption">Nha khoa</Typography>
                <TextField fullWidth size="small" value="AN KHANG" />
              </div>
              <IconButton>
                <Close />
              </IconButton>
            </div>

            <div className="flex items-center gap-3">
              <Avatar>L</Avatar>
              <div className="flex-1">
                <Typography variant="caption">Bác sĩ</Typography>
                <TextField fullWidth size="small" value="Lợi" />
              </div>
              <IconButton>
                <Close />
              </IconButton>
            </div>

            <div className="flex items-center gap-3">
              <Avatar>HP</Avatar>
              <div className="flex-1">
                <Typography variant="caption">Bệnh nhân</Typography>
                <TextField fullWidth size="small" value="Hồ Thanh Phương" />
              </div>
              <IconButton>
                <Close />
              </IconButton>
            </div>
          </div>

          <div className="col-span-1 bg-blue-100 rounded-xl p-3">
            <Typography variant="body2">Địa chỉ: KDC Hồng Loan</Typography>
            <Typography variant="body2">Điện thoại:</Typography>
            <Typography variant="body2">Mô tả:</Typography>
          </div>

          <div className="space-y-3">
            <TextField
              label="Ngày nhận"
              type="datetime-local"
              fullWidth
              size="small"
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />

            <TextField
              label="Y/c hoàn thành"
              type="datetime-local"
              fullWidth
              size="small"
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />

            <TextField
              label="Hẹn giao"
              type="datetime-local"
              fullWidth
              size="small"
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
          </div>
        </div>
      </Box>

      {/* Table */}
      <Box className="mt-4 bg-white rounded-2xl shadow-md border overflow-hidden">
        {/* HEADER */}
        <div className="grid grid-cols-6 p-3 bg-gradient-to-r from-blue-50 to-blue-100 font-semibold text-sm text-gray-700">
          <div>Loại</div>
          <div>Sản phẩm</div>
          <div>Vị trí</div>
          <div>Số lượng</div>
          <div>Màu</div>
          <div className="flex justify-between items-center">
            <span>Ghi chú</span>
            <span className="text-xs text-gray-500">Thao tác</span>
          </div>
        </div>

        {/* BODY */}
        {products.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-6 gap-2 p-3 items-center border-t hover:bg-gray-50 transition"
          >
            <TextField size="small" value="Mới" disabled />

            <TextField
              size="small"
              value={item.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />

            {/* VỊ TRÍ */}
            <div>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleOpenModal(index)}
              >
                Chọn vị trí
              </Button>

              <div className="text-xs mt-1 text-gray-500">
                {item.position?.length ? item.position.join(", ") : "Chưa chọn"}
              </div>
            </div>

            <TextField
              size="small"
              type="number"
              value={item.quantity}
              inputProps={{ min: 1 }}
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
            />

            <TextField
              size="small"
              value={item.color}
              onChange={(e) => handleChange(index, "color", e.target.value)}
            />

            {/* NOTE + ACTION */}
            <div className="flex items-center gap-2">
              <TextField
                size="small"
                value={item.note}
                onChange={(e) => handleChange(index, "note", e.target.value)}
                fullWidth
              />

              {/* MENU */}
              <IconButton size="small">
                <MoreVertIcon fontSize="small" />
              </IconButton>

              {/* DELETE BUTTON */}
              <IconButton
                size="small"
                onClick={() => handleDeleteProduct(index)}
                className="hover:bg-red-50"
              >
                <DeleteOutlineIcon className="text-red-500" />
              </IconButton>
            </div>
          </div>
        ))}

        {/* FOOTER */}
        <div className="p-3 border-t bg-gray-50">
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={addProduct}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Thêm sản phẩm
          </Button>
        </div>
      </Box>
      {/* <Button
        variant="outlined"
        onClick={() => {
          setOpenAccessory(true);
        }}
      >
        Thêm phụ kiện
      </Button> */}
      <div className="bg-white rounded-xl shadow-md p-5 border">
        {/* HEADER + BUTTON */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Phụ kiện</h2>
            <p className="text-sm text-gray-500">
              Chọn và quản lý danh sách phụ kiện cho đơn hàng
            </p>
          </div>

          <button
            onClick={() => setOpenAccessory(true)}
            className="flex items-center gap-2 bg-[#00adef] hover:bg-[#0096d1] text-white px-4 py-2 rounded-lg shadow transition"
          >
            + Chọn phụ kiện
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-3 text-center">S.L</th>
                <th className="p-3 text-left">Phụ kiện</th>
                <th className="p-3 text-left">Sở hữu</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {accessories.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center p-6 text-gray-400">
                    Chưa có phụ kiện nào được chọn
                  </td>
                </tr>
              ) : (
                accessories.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="p-3 text-center font-medium">
                      {item.quantity}
                    </td>

                    <td className="p-3 font-medium text-gray-800">
                      {item.name}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.owner === "Lab"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.owner}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        <AccessoryModal
          open={openAccessory}
          onClose={() => setOpenAccessory(false)}
          onSubmit={handleAccessorySubmit}
          initialData={accessories}
        />
      </div>

      {/* Modal */}
      <ToothSelectorModal
        open={open}
        selectedTeeth={tempTeeth}
        setSelectedTeeth={setTempTeeth}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmitTeeth}
      />
    </Box>
  );
};

export default CreateOrder;
