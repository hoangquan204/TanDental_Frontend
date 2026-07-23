import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Box, Tabs, Tab } from '@mui/material';

import ConfirmModal from './ConfirmModal';
import ChiPhiFilterBar from './ChiPhiFilterBar';
import ChiPhiHangNgay from './ChiPhiHangNgay';
import BaoCaoChiPhi from './BaoCaoChiPhi';
import BaoCaoThuChi from './BaoCaoThuChi';
import QuyChiPhiWidget from './QuyChiPhiWidget';

import { fetchChiPhi, addChiPhi, deleteChiPhi, fetchLoaiChiPhi, fetchQuyChiPhi } from '../../redux/slices/chiPhiSlice';
import { getChiPhiSelector } from '../../redux/selector';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Ho_Chi_Minh');

const TAB_STYLES = {
    minHeight: 'unset',
    '& .MuiTab-root': {
        minHeight: 'unset !important',
        padding: '16px 0 8px 0 !important',
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.95rem',
        gap: '16px'
    },
    '& .MuiTabs-indicator': {
        height: 2,
    },
};

const ChiPhiPage = () => {
    const dispatch = useDispatch();
    const { danhSachChiPhi, isLoading } = useSelector(getChiPhiSelector);

    const user = useSelector((state) => state.auth?.user);
    const isAdmin = user?.quyenSuDung?.ten?.toLowerCase() === "admin" || user?.appRole?.toLowerCase() === "admin";

    const now = dayjs().tz('Asia/Ho_Chi_Minh');
    const [filter, setFilter] = useState({ ngay: 0, thang: now.month() + 1, nam: now.year() });
    const [currentTab, setCurrentTab] = useState(0);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        dispatch(fetchChiPhi(filter));
        dispatch(fetchLoaiChiPhi());
        dispatch(fetchQuyChiPhi());
    }, [dispatch, filter]);

    const handleAddChiPhi = (data) => dispatch(addChiPhi(data));

    const handleDeleteChiPhi = (id) => {
        setItemToDelete(id);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (itemToDelete) dispatch(deleteChiPhi(itemToDelete));
        setIsConfirmOpen(false);
        setItemToDelete(null);
    };

    const tabBar = (
        <Tabs value={currentTab} onChange={(e, v) => setCurrentTab(v)} sx={TAB_STYLES}>
            <Tab sx={{ mr: { xs: 2, md: 4 } }} label="CHI PHÍ HẰNG NGÀY" />
            <Tab label="BÁO CÁO TỔNG HỢP" />
        </Tabs>
    );

    return (
        <Box className="bg-slate-50 px-2 mb-2 relative flex flex-col" style={{ height: 'calc(100vh - 80px)', overflow: 'hidden' }}>

            {isAdmin ? (
                /*
                 * Desktop — grid 2 cột 2 dòng:
                 *   [tabs   — trái trên] [           ]
                 *   [filter — trái dưới] [right — phải dưới]
                 *
                 * Mobile: tabs → right-panel → filter
                 */
                <Box sx={{
                    mt: 1, mb: 2,
                    display: 'grid',
                    gap: { xs: 2, md: 1.5 },
                    gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
                    gridTemplateAreas: {
                        xs: '"tabs" "right-panel" "filter"',
                        md: '"tabs right-panel" "filter right-panel"',
                    },
                }}>
                    {/* Cột 1 dòng 1: Tabs — trái trên */}
                    <Box sx={{ gridArea: 'tabs', display: 'flex', alignItems: 'flex-start', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                        {tabBar}
                    </Box>

                    {/* Cột 1 dòng 2: Bộ lọc — trái dưới */}
                    <Box sx={{ mt: { xs: 1, md: 2 }, gridArea: 'filter', display: 'flex', alignItems: 'flex-end', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                        <ChiPhiFilterBar filter={filter} setFilter={setFilter} />
                    </Box>

                    {/* Cột 2 span 2 dòng: Widget/Báo cáo — căn phải dưới bên trong ô */}
                    <Box sx={{
                        gridArea: 'right-panel',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: { xs: 'center', md: 'flex-end' },
                        justifyContent: 'flex-end',
                    }}>
                        {currentTab === 0
                            ? <QuyChiPhiWidget />
                            : <Box sx={{ width: '100%' }}><BaoCaoThuChi filter={filter} /></Box>
                        }
                    </Box>
                </Box>
            ) : (
                /* NON-ADMIN: FilterBar + QuyWidget */
                <Box sx={{
                    mt: { xs: 1, md: 2 }, mb: 1,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'stretch', md: 'center' },
                    gap: { xs: 2, md: 1.5 },
                }}>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                        <ChiPhiFilterBar filter={filter} setFilter={setFilter} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                        <QuyChiPhiWidget />
                    </Box>
                </Box>
            )}

            {/* NỘI DUNG CHÍNH */}
            <Box className="flex-1 mt-2" sx={{ minHeight: 0, overflow: 'hidden' }}>
                {isAdmin ? (
                    <>
                        {currentTab === 0 && (
                            <ChiPhiHangNgay
                                danhSachChiPhi={danhSachChiPhi}
                                isLoading={isLoading}
                                filter={filter}
                                onAdd={handleAddChiPhi}
                                onDelete={handleDeleteChiPhi}
                            />
                        )}
                        {currentTab === 1 && (
                            <BaoCaoChiPhi
                                danhSachChiPhi={danhSachChiPhi}
                                filter={filter}
                                isLoading={isLoading}
                                onDelete={handleDeleteChiPhi}
                            />
                        )}
                    </>
                ) : (
                    <ChiPhiHangNgay
                        danhSachChiPhi={danhSachChiPhi}
                        isLoading={isLoading}
                        filter={filter}
                        onAdd={handleAddChiPhi}
                        onDelete={handleDeleteChiPhi}
                    />
                )}
            </Box>

            {isConfirmOpen && (
                <ConfirmModal
                    isOpen={isConfirmOpen}
                    title="Xác nhận xóa"
                    message="Bạn có chắc chắn muốn xóa chi phí này không?"
                    onCancel={() => setIsConfirmOpen(false)}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </Box>
    );
};

export default ChiPhiPage;