import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ToothSelectorModal = ({
  selectedTeeth,
  setSelectedTeeth,
  open,
  onClose,
  onSubmit,
}) => {
  const upperTeeth = [
    [18, 17, 16, 15, 14, 13, 12, 11],
    [21, 22, 23, 24, 25, 26, 27, 28],
  ];
  const lowerTeeth = [
    [48, 47, 46, 45, 44, 43, 42, 41],
    [31, 32, 33, 34, 35, 36, 37, 38],
  ];

  const toggleTooth = (id) => {
    setSelectedTeeth((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const ToothIcon = ({ selected }) => (
    <svg
      viewBox="0 0 40 60"
      className={`w-8 h-12 transition-colors ${
        selected
          ? "fill-blue-500 stroke-blue-700"
          : "fill-none stroke-gray-400 hover:stroke-blue-300"
      }`}
      strokeWidth="1.5"
    >
      <path d="M10,10 Q20,0 30,10 L35,40 Q35,55 25,58 L20,50 L15,58 Q5,55 5,40 Z" />
    </svg>
  );

  const RenderRow = ({ groups }) => (
    <div className="flex justify-center gap-1">
      {groups.map((g, i) => (
        <React.Fragment key={i}>
          <div className="flex gap-1">
            {g.map((id) => (
              <div
                key={id}
                onClick={() => toggleTooth(id)}
                className="cursor-pointer flex flex-col items-center"
              >
                <span className="text-xs">{id}</span>
                <ToothIcon selected={selectedTeeth.includes(id)} />
              </div>
            ))}
          </div>
          {i === 0 && <div className="w-[2px] bg-gray-200 mx-4" />}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle className="bg-blue-500 text-white flex justify-between">
        Vị trí
        <IconButton onClick={onClose} className="text-white">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <div className="mb-4">
          Răng đã chọn: {selectedTeeth.sort().join(", ")}
        </div>

        <RenderRow groups={upperTeeth} />
        <div className="h-[1px] bg-gray-300 my-6" />
        <RenderRow groups={lowerTeeth} />
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={onSubmit}>
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ToothSelectorModal;
