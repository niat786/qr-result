"use client";

import React from 'react';
import { CATEGORIES, CategoryId } from '../lib/qr-data';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SidebarProps {
    activeCategory: CategoryId | 'smart';
    onSelect: (id: CategoryId) => void;
}

export function Sidebar({ activeCategory, onSelect }: SidebarProps) {
    const router = useRouter();
    const isDynamic = activeCategory === 'smart';

    const handleCategoryClick = (id: CategoryId) => {
        if (isDynamic) {
            // Redirect to home with category
            router.push(`/?category=${id}`);
        } else {
            onSelect(id);
        }
    };

    return (
        <div className="flex flex-col gap-1 w-full overflow-y-auto scrollbar-clean">
            {/* Categories Section */}
            <div>
                <h3 className="text-xs font-semibold text-[#86868B] uppercase tracking-wide mb-3 px-3 mt-2">
                    Categories
                </h3>
                <div className="space-y-1">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.id as CategoryId)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 text-left ${
                                activeCategory === cat.id
                                    ? 'bg-[#007AFF]/10 text-[#007AFF] shadow-sm'
                                    : 'text-[#86868B] hover:bg-black/5 hover:text-[#1D1D1F]'
                            }`}
                        >
                            <cat.icon 
                                size={18} 
                                className={`shrink-0 ${activeCategory === cat.id ? 'text-[#007AFF]' : 'text-[#86868B]'}`} 
                            />
                            <span className="flex-1">{cat.label}</span>
                            {activeCategory === cat.id && (
                                <div className="w-1.5 h-1.5 rounded-full bg-[#007AFF] shrink-0"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
