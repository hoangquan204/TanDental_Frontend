import React, { useEffect, useMemo, useState } from 'react';

const upperLeft = [18, 17, 16, 15, 14, 13, 12, 11];
const upperRight = [21, 22, 23, 24, 25, 26, 27, 28];
const lowerLeft = [48, 47, 46, 45, 44, 43, 42, 41];
const lowerRight = [31, 32, 33, 34, 35, 36, 37, 38];

const allTeeth = [...upperLeft, ...upperRight, ...lowerLeft, ...lowerRight];

const ToothSVG = ({ isUpper, active, dragging, bridge }) => {
    const fill = dragging ? '#dbeafe' : active ? '#bfdbfe' : '#ffffff';
    const stroke = active ? '#2563eb' : '#93c5fd';

    return (
        <div className="relative flex items-center justify-center">
            {bridge && (
                <div
                    // ĐÃ THU NHỎ vạch cam chỉ báo Cầu
                    className={`absolute ${isUpper ? 'top-[4px]' : 'bottom-[4px]'} left-1/2 -translate-x-1/2 w-[32px] h-[2px] bg-orange-400 z-0`}
                />
            )}

            {/* ĐÃ THU NHỎ kích thước SVG */}
            <svg viewBox="0 0 60 90" className="w-[42px] h-[56px] relative z-10">
                <path
                    d={
                        isUpper
                            ? 'M30 6 C15 8 8 25 10 45 C12 63 18 80 30 86 C42 80 48 63 50 45 C52 25 45 8 30 6Z'
                            : 'M18 8 C12 18 10 38 16 58 C20 70 23 82 30 86 C37 82 40 70 44 58 C50 38 48 18 42 8Z'
                    }
                    fill={fill}
                    stroke={stroke}
                    strokeWidth="2"
                />
            </svg>
        </div>
    );
};

export default function ChonViTriRangModal({ isOpen, open, onClose, onSave, onConfirm, initialViTri = [], tenSanPham = "Sản phẩm" }) {
    const modalVisible = isOpen || open;

    const [selectedObjects, setSelectedObjects] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartTooth, setDragStartTooth] = useState(null);
    const [dragCurrentTooth, setDragCurrentTooth] = useState(null);

    useEffect(() => {
        if (modalVisible) {
            setSelectedObjects(initialViTri || []);
        }
    }, [modalVisible, initialViTri]);

    useEffect(() => {
        const stopDrag = () => handleMouseUp();
        window.addEventListener('mouseup', stopDrag);
        return () => window.removeEventListener('mouseup', stopDrag);
    }, [isDragging, dragStartTooth, dragCurrentTooth]);

    const selectedMap = useMemo(() => {
        const map = new Map();
        selectedObjects.forEach((obj) => {
            obj.soRang.forEach((tooth) => {
                map.set(tooth, obj.kieu);
            });
        });
        return map;
    }, [selectedObjects]);

    const getToothStatus = (toothNumber) => {
        const selected = selectedMap.has(toothNumber);

        const isDraggingRange = (() => {
            if (!isDragging || dragStartTooth == null || dragCurrentTooth == null) return false;
            const startIndex = allTeeth.indexOf(dragStartTooth);
            const endIndex = allTeeth.indexOf(dragCurrentTooth);
            const currentIndex = allTeeth.indexOf(toothNumber);
            const min = Math.min(startIndex, endIndex);
            const max = Math.max(startIndex, endIndex);
            return currentIndex >= min && currentIndex <= max;
        })();

        return {
            isRoi: selected && selectedMap.get(toothNumber) === 'Rời',
            isCau: selected && selectedMap.get(toothNumber) === 'Cầu',
            isDragging: isDraggingRange,
        };
    };

    const handleMouseDown = (tooth) => {
        setIsDragging(true);
        setDragStartTooth(tooth);
        setDragCurrentTooth(tooth);
    };

    const handleMouseEnter = (tooth) => {
        if (!isDragging) return;
        setDragCurrentTooth(tooth);
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const startIndex = allTeeth.indexOf(dragStartTooth);
        const endIndex = allTeeth.indexOf(dragCurrentTooth);

        if (startIndex === -1 || endIndex === -1) return;

        const min = Math.min(startIndex, endIndex);
        const max = Math.max(startIndex, endIndex);

        const selectedRange = allTeeth.slice(min, max + 1);

        setSelectedObjects((prev) => {
            let updated = [...prev];

            if (selectedRange.length === 1) {
                const tooth = selectedRange[0];
                const exists = updated.some((obj) => obj.soRang.includes(tooth));

                if (exists) {
                    updated = updated.filter((obj) => !obj.soRang.includes(tooth));
                } else {
                    updated.push({ kieu: 'Rời', soRang: [tooth] });
                }
            } else {
                const duplicated = updated.some((obj) => JSON.stringify(obj.soRang) === JSON.stringify(selectedRange));
                if (!duplicated) {
                    updated.push({ kieu: 'Cầu', soRang: selectedRange });
                }
            }

            const used = new Set();
            updated = updated.filter((obj) => {
                const duplicatedInside = obj.soRang.some((tooth) => used.has(tooth));
                if (duplicatedInside) return false;
                obj.soRang.forEach((tooth) => used.add(tooth));
                return true;
            });

            return updated.slice(0, 32);
        });

        setDragStartTooth(null);
        setDragCurrentTooth(null);
    };

    const renderTooth = (toothNumber, isUpper) => {
        const status = getToothStatus(toothNumber);

        return (
            <div
                key={toothNumber}
                // ĐÃ THU NHỎ width cột chứa răng (w-[72px] -> w-[45px]) và cỡ chữ số (text-[20px] -> text-[14px])
                className={`flex items-center justify-center cursor-pointer select-none w-[45px] ${!isUpper ? 'flex-col-reverse' : 'flex-col'}`}
                onMouseDown={() => handleMouseDown(toothNumber)}
                onMouseEnter={() => handleMouseEnter(toothNumber)}
            >
                <ToothSVG isUpper={isUpper} active={status.isRoi || status.isCau} dragging={status.isDragging} bridge={status.isCau} />
                <span className={`mt-1 text-[14px] ${status.isRoi || status.isCau ? 'text-blue-600 font-bold' : 'text-gray-700'}`}>
                    {toothNumber}
                </span>
            </div>
        );
    };

    if (!modalVisible) return null;

    const roiText = selectedObjects.filter(s => s.kieu === 'Rời').map(s => s.soRang[0]).join(', ');
    const cauText = selectedObjects.filter(s => s.kieu === 'Cầu').map(s => `${s.soRang[0]}->${s.soRang[s.soRang.length - 1]}`).join(', ');

    return (
        <div className="fixed inset-0 z-[100000] bg-black/40 flex items-center justify-center p-4">
            {/* ĐÃ FIX: Chỉnh thành 60% Width và 60% Height */}
            <div className="bg-white w-[60%] h-[60%] min-w-[800px] min-h-[500px] rounded-lg overflow-hidden shadow-2xl flex flex-col">
                <div className="bg-[#00a8ff] text-white px-6 py-3 flex items-center justify-between shrink-0">
                    <div className="text-[18px] font-semibold">Vị trí</div>
                    <button onClick={onClose} className="text-white text-[24px] hover:opacity-80 font-bold leading-none">&times;</button>
                </div>

                <div className="px-8 py-6 flex-1 overflow-y-auto">
                    <div className="flex gap-10 items-start mb-6">
                        <div className="text-[16px] font-bold text-gray-800 uppercase mt-1">
                            {tenSanPham}
                        </div>
                        <div className="text-sm text-gray-700 space-y-1">
                            {roiText && <div><span className="font-medium mr-2">Rời:</span> {roiText}</div>}
                            {cauText && <div><span className="font-medium mr-2">Cầu:</span> {cauText}</div>}
                            {!roiText && !cauText && <div className="italic text-gray-400">Chưa chọn răng nào</div>}
                        </div>
                    </div>

                    <div className="relative mt-6">
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-300" />
                        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gray-300" />

                        {/* ĐÃ THU NHỎ khoảng cách dọc giữa 2 hàm (gap-14 -> gap-8) */}
                        <div className="flex flex-col gap-8 relative z-10">
                            <div className="flex justify-between">
                                {[...upperLeft, ...upperRight].map((tooth) => renderTooth(tooth, true))}
                            </div>
                            <div className="flex justify-between">
                                {[...lowerLeft, ...lowerRight].map((tooth) => renderTooth(tooth, false))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center px-8 py-4 border-t shrink-0 bg-gray-50">
                    <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1.5 rounded text-xs shadow">
                        Cập nhật phiên bản mới!
                    </button>

                    <button
                        onClick={() => {
                            if (onSave) onSave(selectedObjects);
                            if (onConfirm) onConfirm(selectedObjects);
                            onClose();
                        }}
                        className="bg-[#00a8ff] hover:bg-blue-500 text-white px-8 py-2 rounded-full text-sm font-bold shadow-md transition"
                    >
                        Đồng ý
                    </button>
                </div>
            </div>
        </div>
    );
}