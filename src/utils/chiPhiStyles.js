export const THEAD_SX = {
    fontWeight: 700,
    fontSize: '0.86rem',
    color: '#0c4a6e',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    py: 1.25,
    borderBottom: 'none',
    bgcolor: '#e0f2fe',
    '&.MuiTableCell-stickyHeader': {
        bgcolor: '#e0f2fe',
    },
};

export const tableCardSx = {
    '& .MuiTable-root': { borderCollapse: 'collapse' },
    '& .MuiTableHead-root': { display: { xs: 'none', md: 'table-header-group' } },

    // Đổi TableRow thành column trên mobile để các Cell xếp dọc
    '& .MuiTableBody-root .MuiTableRow-root': {
        display: { xs: 'flex', md: 'table-row' },
        flexDirection: { xs: 'column', md: 'row' },
        mb: { xs: 2, md: 0 },
        boxShadow: { xs: '0 2px 8px rgba(0,0,0,0.08)', md: 'none' },
        borderRadius: { xs: '12px', md: 0 },
        border: { xs: '1px solid #bae6fd', md: 'none' },
        overflow: 'hidden',
        bgcolor: { xs: '#ffffff', md: 'transparent' }
    },

    // Style mặc định cho Cell (Dành cho dòng 2, 3, 4 có label)
    '& .MuiTableBody-root .MuiTableCell-root': {
        display: { xs: 'flex', md: 'table-cell' },
        justifyContent: { xs: 'space-between', md: 'flex-start' },
        alignItems: 'center',
        textAlign: { xs: 'right', md: 'left' },
        py: { xs: 1, md: 0.75 },
        px: { xs: 2, md: 2 },
        borderBottom: { xs: '1px solid #f1f5f9', md: '1px solid #e2e8f0' },
        '&::before': {
            content: 'attr(data-label)',
            fontWeight: 600,
            color: '#64748b',
            display: { xs: 'block', md: 'none' },
            marginRight: '16px',
            textAlign: 'left'
        },
        '&:last-child': {
            borderBottom: 'none'
        }
    },

    /* ======================================================== */
    /* 1. ẨN CỘT TRÊN MOBILE (Vì dữ liệu đã được gom lên Dòng 1)*/
    /* ======================================================== */
    '& .hide-on-mobile-card': {
        display: { xs: 'none !important', md: 'table-cell !important' }
    },

    /* ======================================================== */
    /* 2. DÒNG 1 (THỜI GIAN - TIỀN - ICON) CHỈ HIỂN THỊ Ở MOBILE*/
    /* ======================================================== */
    '& .mobile-card-header': {
        display: { xs: 'flex !important', md: 'none !important' },
        justifyContent: 'space-between !important',
        alignItems: 'center !important',
        bgcolor: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        py: { xs: '12px !important', md: '0 !important' },
        '&::before': { display: 'none !important' } // Vô hiệu hoá label
    },

    // Footer
    '& .MuiTableFooter-root .MuiTableRow-root': {
        display: { xs: 'flex', md: 'table-row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        px: { xs: 2, md: 0 },
        py: { xs: 1.25, md: 0 },
        bgcolor: '#6db6e3',
        borderRadius: { xs: '12px', md: 0 },
        mt: { xs: 2, md: 0 }
    },
    '& .MuiTableFooter-root .MuiTableCell-root': {
        display: { xs: 'block', md: 'table-cell' },
        border: 'none',
        p: { xs: 0, md: 1.25 },
        color: '#fff',
        '&::before': { display: 'none' }
    },
    '& .hide-on-mobile': { display: { xs: 'none', md: 'table-cell' } },
    '& .empty-row .MuiTableCell-root': {
        justifyContent: 'center',
        '&::before': { display: 'none' }
    }
};