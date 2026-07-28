import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, useMediaQuery, useTheme } from '@mui/material';
import { TrendingUp, TrendingDown, AccountBalanceWallet } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { getChiPhiSelector } from '../../redux/selector';
import { api } from '../../config/api';
import { formatVND } from '../../utils/chiPhiUtils';
import StatCard from './StatCard';

const BaoCaoThuChi = ({ filter }) => {
    const { danhSachChiPhi, isLoading: isLoadingChiPhi } = useSelector(getChiPhiSelector);
    const [tongThu, setTongThu] = useState(0);
    const [isLoadingThu, setIsLoadingThu] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Tính tổng chi dựa trên dữ liệu Redux
    const tongChi = danhSachChiPhi.reduce((sum, i) => sum + (i.gia ?? 0), 0);

    useEffect(() => {
        const fetchTongThu = async () => {
            setIsLoadingThu(true);
            try {
                const res = await api.get('/baocao/doanh-thu-thang', {
                    params: {
                        thang: filter.thang,
                        nam: filter.nam
                    }
                });

                if (res.data.success) {
                    setTongThu(res.data.tongHop.thanhToan);
                }
            } catch (err) {
                console.error(err);
                setTongThu(0);
            } finally {
                setIsLoadingThu(false);
            }
        };

        fetchTongThu();
        // CHỈ CHẠY LẠI KHI THÁNG HOẶC NĂM THAY ĐỔI
    }, [filter.thang, filter.nam]);

    const loiNhuan = tongThu - tongChi;

    if (isLoadingThu) {
        return (
            <Box className="flex justify-center items-center py-10 w-full">
                <CircularProgress size={32} sx={{ color: '#94a3b8' }} />
            </Box>
        );
    }

    return (
        <Box>
            {isMobile ? (
                /* GIAO DIỆN MOBILE: Tối giản, 3 box trên 1 dòng */
                <div className="flex flex-row gap-2 w-full">
                    <Box className="flex-1 flex items-center justify-center gap-1 border border-green-200 bg-green-50 p-2 rounded-lg">
                        <TrendingUp fontSize="small" className="text-green-600" />
                        <Typography variant="body2" fontWeight="700" className="text-green-700" noWrap>
                            {formatVND(tongThu)}
                        </Typography>
                    </Box>
                    <Box className="flex-1 flex items-center justify-center gap-1 border border-red-200 bg-red-50 p-2 rounded-lg">
                        <TrendingDown fontSize="small" className="text-red-600" />
                        <Typography variant="body2" fontWeight="700" className="text-red-700" noWrap>
                            {formatVND(tongChi)}
                        </Typography>
                    </Box>
                    <Box className="flex-1 flex items-center justify-center gap-1 border border-indigo-200 bg-indigo-50 p-2 rounded-lg">
                        <AccountBalanceWallet fontSize="small" className="text-indigo-600" />
                        <Typography variant="body2" fontWeight="700" className="text-indigo-700" noWrap>
                            {formatVND(loiNhuan)}
                        </Typography>
                    </Box>
                </div>
            ) : (
                /* GIAO DIỆN DESKTOP: Giữ nguyên StatCard */
                <div className="flex flex-row gap-4">
                    <StatCard
                        icon={<TrendingUp />}
                        title="Tổng Thu"
                        value={formatVND(tongThu)}
                        themeColors={{
                            wrapper: 'border-green-200 bg-green-50',
                            iconBg: 'bg-green-100',
                            iconColor: 'text-green-600',
                            textColor: 'text-green-600',
                            valueColor: 'text-green-700'
                        }}
                    />
                    <StatCard
                        icon={<TrendingDown />}
                        title="Tổng Chi"
                        value={formatVND(tongChi)}
                        themeColors={{
                            wrapper: 'border-red-200 bg-red-50',
                            iconBg: 'bg-red-100',
                            iconColor: 'text-red-600',
                            textColor: 'text-red-600',
                            valueColor: 'text-red-700'
                        }}
                    />
                    <StatCard
                        icon={<AccountBalanceWallet />}
                        title="Lợi Nhuận"
                        value={formatVND(loiNhuan)}
                        themeColors={{
                            wrapper: 'border-indigo-200 bg-indigo-50',
                            iconBg: 'bg-indigo-100',
                            iconColor: 'text-indigo-600',
                            textColor: 'text-indigo-600',
                            valueColor: 'text-indigo-700'
                        }}
                    />
                </div>
            )}
        </Box>
    );
};

export default BaoCaoThuChi;