import React, { useState } from 'react';
import {
    Box, Paper, TextField, InputAdornment, IconButton, CircularProgress,
    Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography
} from '@mui/material';
import { Add as AddIcon, Note as NoteIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector, useDispatch } from 'react-redux';
import { themLoaiChiPhiLocal } from '../../redux/slices/chiPhiSlice';
import MoneyInput from './MoneyInput';

const ChiPhiForm = ({ isLoading, onAdd }) => {
    const dispatch = useDispatch();
    const danhSachLoaiChiPhi = useSelector((state) => state.chiPhi.danhSachLoaiChiPhi);

    // Hooks cho Responsive Mobile
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);

    // State cho Modal thêm loại chi phí
    const [isAddTypeModalOpen, setIsAddTypeModalOpen] = useState(false);
    const [newTypeValue, setNewTypeValue] = useState('');

    const [formData, setFormData] = useState({
        tenChiPhi: '',
        loaiChiPhi: '',
        gia: '',
        ghiChu: '',
    });

    const handleChangeForm = (e) => {
        const { name, value } = e.target;

        // Mở Modal nếu user bấm "+ Thêm loại mới"
        if (name === 'loaiChiPhi' && value === 'ADD_NEW') {
            setNewTypeValue('');
            setIsAddTypeModalOpen(true);
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddNewType = () => {
        const trimmedType = newTypeValue.trim();
        if (trimmedType) {
            dispatch(themLoaiChiPhiLocal(trimmedType));
            setFormData(prev => ({ ...prev, loaiChiPhi: trimmedType }));
        }
        setIsAddTypeModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.tenChiPhi || !formData.loaiChiPhi || !formData.gia) {
            alert('Vui lòng nhập đầy đủ Tên, Loại và Giá chi phí!');
            return;
        }

        onAdd({ ...formData, gia: Number(formData.gia) });
        setFormData({ tenChiPhi: '', loaiChiPhi: '', gia: '', ghiChu: '' });

        // Đóng form mobile nếu đang mở
        if (isMobile) {
            setIsMobileFormOpen(false);
        }
    };

    return (
        <Paper elevation={0} className="rounded-xl border border-slate-200 overflow-hidden w-full">
            {isMobile ? (
                /* ================= GIAO DIỆN MOBILE ================= */
                <>
                    <Box
                        onClick={() => setIsMobileFormOpen(true)}
                        className="px-4 py-1 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                        <Typography fontWeight={600} color="text.secondary">
                            Thêm chi phí
                        </Typography>
                        <IconButton
                            size="small"
                            sx={{
                                bgcolor: '#22c55e',
                                color: 'white',
                                '&:hover': { bgcolor: '#16a34a' },
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Box>

                    {/* Modal chứa Form riêng cho Mobile */}
                    <Dialog
                        open={isMobileFormOpen}
                        onClose={() => setIsMobileFormOpen(false)}
                        fullWidth
                        maxWidth="xs"
                    >
                        <DialogTitle sx={{ fontWeight: 700, color: '#0c4a6e' }}>
                            Thêm chi phí
                        </DialogTitle>
                        <form onSubmit={handleSubmit}>
                            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2 }}>
                                <TextField
                                    size="small"
                                    name="tenChiPhi"
                                    label="Tên chi phí"
                                    value={formData.tenChiPhi}
                                    onChange={handleChangeForm}
                                    required
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                                        '& .MuiInputBase-input': { fontSize: '16px' }, // Ngăn iOS zoom
                                        '& .MuiInputLabel-root': { fontSize: '16px' }  // Đồng bộ size label
                                    }}
                                />

                                <FormControl size="small" required fullWidth>
                                    <InputLabel id="loai-chi-phi-label-mobile" sx={{ fontSize: '16px' }}>Loại chi phí</InputLabel>
                                    <Select
                                        labelId="loai-chi-phi-label-mobile"
                                        name="loaiChiPhi"
                                        value={formData.loaiChiPhi}
                                        onChange={handleChangeForm}
                                        label="Loại chi phí"
                                        sx={{
                                            borderRadius: '8px',
                                            fontSize: '16px' // Ngăn iOS zoom
                                        }}
                                    >
                                        <MenuItem
                                            value="ADD_NEW"
                                            sx={{ fontWeight: 'bold', color: '#0284c7', borderBottom: '1px solid #e2e8f0', mb: 1, fontSize: '16px' }}
                                        >
                                            + Thêm loại mới
                                        </MenuItem>
                                        {danhSachLoaiChiPhi.map((opt) => (
                                            <MenuItem key={opt} value={opt} sx={{ fontSize: '16px' }}>
                                                {opt}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Box>
                                    <InputLabel sx={{ fontSize: '12px', mb: 0.5, ml: 0.5 }}>
                                        Giá chi phí *
                                    </InputLabel>
                                    {/* Lưu ý: Nếu MoneyInput của bạn là component tuỳ chỉnh bọc thẻ input, 
                                        hãy chắc chắn truyền class hoặc style để input bên trong có fontSize: 16px */}
                                    <MoneyInput
                                        value={formData.gia}
                                        onValueChange={(val) => setFormData((prev) => ({ ...prev, gia: val }))}
                                        required
                                        className="text-base" // Hoặc style tuỳ thuộc vào cách bạn thiết kế MoneyInput
                                    />
                                </Box>

                                <TextField
                                    size="small"
                                    name="ghiChu"
                                    label="Ghi chú"
                                    value={formData.ghiChu}
                                    onChange={handleChangeForm}
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                                        '& .MuiInputBase-input': { fontSize: '16px' }, // Ngăn iOS zoom
                                        '& .MuiInputLabel-root': { fontSize: '16px' }  // Đồng bộ size label
                                    }}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <NoteIcon fontSize="small" className="text-slate-300" />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            </DialogContent>
                            <DialogActions sx={{ p: 2 }}>
                                <Button onClick={() => setIsMobileFormOpen(false)} color="inherit">
                                    Hủy
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                    disabled={isLoading}
                                    startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : null}
                                >
                                    Thêm
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </>
            ) : (
                /* ================= GIAO DIỆN DESKTOP ================= */
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    className="px-5 py-4 flex flex-wrap gap-3 items-end w-full"
                >
                    <TextField
                        size="small"
                        name="tenChiPhi"
                        label="Tên chi phí"
                        value={formData.tenChiPhi}
                        onChange={handleChangeForm}
                        required
                        sx={{
                            flex: '1 1 180px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                '& input': { fontSize: '16px' },
                            },
                        }}
                    />

                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-end', flex: '0 0 auto' }}>
                        <FormControl size="small" required sx={{ flex: '0 0 180px', minWidth: 0 }}>
                            <InputLabel id="loai-chi-phi-label">Loại chi phí</InputLabel>
                            <Select
                                labelId="loai-chi-phi-label"
                                name="loaiChiPhi"
                                value={formData.loaiChiPhi}
                                onChange={handleChangeForm}
                                label="Loại chi phí"
                                sx={{ borderRadius: '8px' }}
                            >
                                <MenuItem value="ADD_NEW" sx={{ fontWeight: 'bold', color: '#0284c7', borderBottom: '1px solid #e2e8f0', mb: 1 }}>
                                    + Thêm loại mới
                                </MenuItem>
                                {danhSachLoaiChiPhi.map((opt) => (
                                    <MenuItem key={opt} value={opt}>
                                        {opt}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box sx={{ flex: '0 0 160px', minWidth: 0 }}>
                            <MoneyInput
                                value={formData.gia}
                                onValueChange={(val) => setFormData((prev) => ({ ...prev, gia: val }))}
                                required
                            />
                        </Box>
                    </Box>

                    <TextField
                        size="small"
                        name="ghiChu"
                        label="Ghi chú"
                        value={formData.ghiChu}
                        onChange={handleChangeForm}
                        sx={{ flex: '1 1 180px', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <NoteIcon fontSize="small" className="text-slate-300" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <IconButton
                        type="submit"
                        disabled={isLoading}
                        sx={{
                            width: 40, height: 40, borderRadius: '50%',
                            bgcolor: '#22c55e', color: 'white',
                            '&:hover': { bgcolor: '#16a34a' },
                            '&.Mui-disabled': { bgcolor: '#86efac', color: 'white' },
                        }}
                    >
                        {isLoading ? <CircularProgress size={18} color="inherit" /> : <AddIcon />}
                    </IconButton>
                </Box>
            )}

            {/* Modal Thêm Loại Chi Phí Mới (Dùng chung cho cả Mobile và Desktop) */}
            <Dialog
                open={isAddTypeModalOpen}
                onClose={() => setIsAddTypeModalOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle sx={{ fontWeight: 700, color: '#0c4a6e' }}>
                    Thêm loại chi phí mới
                </DialogTitle>
                <DialogContent dividers>
                    <TextField
                        autoFocus
                        fullWidth
                        size="small"
                        label="Tên loại chi phí"
                        value={newTypeValue}
                        onChange={(e) => setNewTypeValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddNewType();
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setIsAddTypeModalOpen(false)} color="inherit">
                        Hủy
                    </Button>
                    <Button onClick={handleAddNewType} variant="contained" color="primary">
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default ChiPhiForm;