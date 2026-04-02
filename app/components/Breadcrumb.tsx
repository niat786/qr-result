"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.qrresult.com' },
            ...items.map((item, i) => ({
                '@type': 'ListItem',
                position: i + 2,
                name: item.label,
                ...(item.href ? { item: `https://www.qrresult.com${item.href}` } : {}),
            })),
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
            <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-6 lg:px-12 pt-6 pb-0">
                <ol className="flex items-center gap-1.5 text-sm text-[#6E6E73]">
                    <li>
                        <Link href="/" className="hover:text-[#007AFF] transition-colors">Home</Link>
                    </li>
                    {items.map((item, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                            <ChevronRight size={14} className="text-[#6E6E73]/50" aria-hidden="true" />
                            {item.href ? (
                                <Link href={item.href} className="hover:text-[#007AFF] transition-colors">{item.label}</Link>
                            ) : (
                                <span className="text-[#1D1D1F] font-medium">{item.label}</span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}
