import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function CongTy() {
  return (
    <Box className="p-6">
      <Paper className="p-6">
        <Typography variant="h5" className="font-bold mb-4">
          Công Ty
        </Typography>
        <Typography color="textSecondary">
          Trang này đang được phát triển. Sẽ sớm có nội dung.
        </Typography>
      </Paper>
    </Box>
  );
}
