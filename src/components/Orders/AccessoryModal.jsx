import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import {
  Close as CloseIcon,
  Search as SearchIcon,
  ArrowCircleRightOutlined as ArrowIcon,
} from "@mui/icons-material";

import DeleteIcon from "@mui/icons-material/Delete";
const AccessoryModal = ({ open, onClose, onSubmit, initialData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const availableAccessories = [
    "Analog",
    "Cây so màu",
    "Giá khớp",
    "Gối sáp",
    "Hàm khung",
    "Hàm đối diện",
    "Khay lấy dấu",
    "Răng cũ",
  ];

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setSelectedItems(initialData || []);
  }, [initialData]);

  // thêm phụ kiện
  const addItem = (name) => {
    const exist = selectedItems.find((i) => i.name === name);
    if (exist) return;

    setSelectedItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        owner: "Nha khoa",
        quantity: 1,
      },
    ]);
  };

  // đổi owner
  const handleUpdateOwner = (id, newOwner) => {
    setSelectedItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, owner: newOwner } : item))
    );
  };

  // xóa
  const removeItem = (id) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      {/* Header */}
      <DialogTitle className="bg-[#00adef] text-white flex justify-between">
        Phụ kiện
        <IconButton onClick={onClose} className="text-white">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className="p-4 flex gap-4 bg-gray-50 h-[500px]">
        {/* LEFT */}
        <div className="w-1/3 bg-white border rounded-md flex flex-col">
          <div className="p-2 border-b">
            <TextField
              size="small"
              fullWidth
              placeholder="Tìm kiếm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="overflow-y-auto flex-1">
            {availableAccessories
              .filter((a) => a.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((name, index) => (
                <div
                  key={index}
                  onClick={() => addItem(name)}
                  className="flex justify-between p-3 border-b cursor-pointer hover:bg-gray-50"
                >
                  <span className="text-sm">{name}</span>
                  <ArrowIcon fontSize="small" />
                </div>
              ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-2/3 bg-white border rounded-md flex flex-col">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-xs">S.L</th>
                <th className="p-2 text-xs">Phụ kiện</th>
                <th className="p-2 text-xs">Sở hữu</th>
                <th></th>
              </tr>
            </thead>
          </table>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full">
              <tbody>
                {selectedItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2 text-center">{item.quantity}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">
                      <RadioGroup
                        row
                        value={item.owner}
                        onChange={(e) =>
                          handleUpdateOwner(item.id, e.target.value)
                        }
                      >
                        <FormControlLabel
                          value="Lab"
                          control={<Radio size="small" />}
                          label="Lab"
                        />
                        <FormControlLabel
                          value="Nha khoa"
                          control={<Radio size="small" />}
                          label="Nha khoa"
                        />
                      </RadioGroup>
                    </td>
                    <td>
                      <IconButton onClick={() => removeItem(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={() => onSubmit(selectedItems)}>
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccessoryModal;
