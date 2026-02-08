import React from 'react';
import { QR_TYPES, CategoryId } from '../lib/qr-data';

interface TypeSelectorProps {
    activeCategory: CategoryId;
    activeTypeId: string;
    onSelectType: (id: string, initialInputs: any) => void;
}

export function TypeSelector({ activeCategory, activeTypeId, onSelectType }: TypeSelectorProps) {
    const types = QR_TYPES.filter(t => t.category === activeCategory);

    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 mb-6">
            {types.map((type) => (
                <button
                    key={type.id}
                    onClick={() => onSelectType(type.id, {})} // Reset inputs on type switch
                    className={`flex flex-col items-center justify-center p-2 rounded-xl gap-1.5 transition-all duration-200 border ${activeTypeId === type.id
                            ? 'bg-white border-[#007AFF]/20 text-[#007AFF] shadow-md shadow-blue-500/10 ring-1 ring-[#007AFF]/20'
                            : 'bg-white border-transparent text-[#86868B] hover:text-[#1D1D1F] hover:shadow-sm'
                        }`}
                >
                    <type.icon size={18} />
                    <span className="text-[10px] sm:text-xs font-medium text-center leading-tight">
                        {type.label}
                    </span>
                </button>
            ))}
        </div>
    );
}
