export default function ChiTietModal({ open, onClose, title, columns, rows, accentClass }) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/40 sm:p-4"
            onClick={onClose}
        >
            <div
                className="w-full sm:max-w-2xl h-[65vh] sm:h-auto sm:max-h-[80vh] flex flex-col bg-white rounded-t-lg sm:rounded-lg shadow-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className={`flex items-center justify-between px-4 sm:px-5 py-3 shrink-0 ${accentClass}`}>
                    <h3 className="font-medium text-slate-800 text-sm sm:text-base pr-2 truncate">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="shrink-0 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-black/5 rounded-full text-xl leading-none"
                        aria-label="Đóng"
                    >
                        ×
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto table-scroll">
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm text-left whitespace-nowrap sm:whitespace-normal">
                            <thead className="sticky top-0 bg-gray-50 z-10">
                                <tr className="text-gray-500">
                                    {columns.map((col) => (
                                        <th
                                            key={col}
                                            className="py-2 px-3 sm:px-4 font-medium border-b border-gray-200"
                                        >
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.length === 0 ? (
                                    <tr>
                                        <td colSpan={columns.length} className="py-6 text-center text-gray-400">
                                            Không có dữ liệu
                                        </td>
                                    </tr>
                                ) : (
                                    rows.map((row) => (
                                        <tr key={row.key} className="border-b border-gray-100 last:border-0">
                                            {row.cells.map((cell, i) => (
                                                <td key={i} className="py-2 px-3 sm:px-4">{cell}</td>
                                            ))}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}