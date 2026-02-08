"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';

export default function RedirectPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const id = params.id;
        if (!id) return;

        // Simulate Database Lookup
        const key = `qr_dynamic_${id}`;
        const dataStr = localStorage.getItem(key);

        if (dataStr) {
            try {
                const data = JSON.parse(dataStr);

                // Check if Active
                if (data.active === false) {
                    setError("This link has been temporarily suspended by the owner.");
                    return;
                }

                // Validate URL exists
                if (!data.url || typeof data.url !== 'string') {
                    setError("This link has an invalid destination URL.");
                    return;
                }

                // Increment Analytics
                data.scans = (data.scans || 0) + 1;
                data.lastScanned = new Date().toISOString();
                localStorage.setItem(key, JSON.stringify(data));

                // Simulate network delay for UX then redirect
                const timeoutId = setTimeout(() => {
                    try {
                        window.location.href = data.url;
                    } catch (e) {
                        setError("Failed to redirect. Please try again.");
                    }
                }, 800);

                return () => clearTimeout(timeoutId);

            } catch (e) {
                setError("This link appears to be corrupted.");
            }
        } else {
            setError("This link does not exist or has expired.");
        }
    }, [params.id, router]);

    if (error) {
        return (
            <main className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center text-[#1D1D1F] p-6">
                <article className="bg-white p-10 rounded-[32px] shadow-apple-card max-w-md w-full text-center border border-black/5" itemScope itemType="https://schema.org/WebPage">
                    <div className="w-16 h-16 bg-[#FF3B30]/10 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                        <AlertCircle size={32} className="text-[#FF3B30]" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#1D1D1F] mb-3" itemProp="headline">Link Unavailable</h1>
                    <p className="text-[#86868B] leading-relaxed mb-6" itemProp="description">{error}</p>
                    <a href="/" className="inline-flex items-center justify-center px-6 py-3 bg-[#E8E8ED] text-[#1D1D1F] font-medium rounded-xl hover:bg-[#D2D2D7] transition-all" aria-label="Go to homepage">
                        Go to Homepage
                    </a>
                </article>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center" role="status" aria-live="polite">
            <div className="bg-white p-4 rounded-full shadow-apple-glass mb-6" aria-hidden="true">
                <Loader2 size={32} className="text-[#007AFF] animate-spin" />
            </div>
            <p className="text-sm font-medium text-[#86868B] animate-pulse">Redirecting...</p>
            <span className="sr-only">Please wait while we redirect you to your destination</span>
        </main>
    );
}
