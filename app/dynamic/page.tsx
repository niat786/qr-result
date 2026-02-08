"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from '../components/Sidebar';
import { QRCodeCanvas } from 'qrcode.react';
import { 
    Plus, Trash2, ExternalLink, BarChart3, Link as LinkIcon, Download, RefreshCw, 
    ArrowRight, Search, Copy, Check, Edit2, X, Power, FileDown, FileUp, 
    Filter, SortAsc, Calendar, Clock, Eye, MoreVertical, Info, 
    CheckSquare, Square, Upload, FileText, Settings
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface DynamicLink {
    id: string;
    url: string;
    scans: number;
    createdAt: string;
    active: boolean;
    lastScanned?: string;
    notes?: string;
    expiresAt?: string;
    scanHistory?: string[]; // Array of ISO timestamps
}

type SortOption = 'newest' | 'oldest' | 'scans-high' | 'scans-low' | 'name';
type FilterOption = 'all' | 'active' | 'paused';

export default function DynamicDashboard() {
    const [links, setLinks] = useState<DynamicLink[]>([]);
    const [newUrl, setNewUrl] = useState('');
    const [customId, setCustomId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [notes, setNotes] = useState('');
    const [expiresAt, setExpiresAt] = useState('');

    // Edit State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editUrl, setEditUrl] = useState('');
    const [editNotes, setEditNotes] = useState('');

    // UI State
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [selectedLinks, setSelectedLinks] = useState<Set<string>>(new Set());
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [filterBy, setFilterBy] = useState<FilterOption>('all');
    const [showDetails, setShowDetails] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const qrRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Load links on mount
    useEffect(() => {
        loadLinks();
    }, []);

    // Show toast notification
    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const loadLinks = () => {
        const loaded: DynamicLink[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('qr_dynamic_')) {
                try {
                    const data = JSON.parse(localStorage.getItem(key)!);
                    loaded.push({
                        ...data,
                        id: key.replace('qr_dynamic_', ''),
                        active: data.active !== undefined ? data.active : true,
                        scanHistory: data.scanHistory || [],
                        lastScanned: data.lastScanned || undefined,
                        notes: data.notes || '',
                        expiresAt: data.expiresAt || undefined
                    });
                } catch (e) { }
            }
        }
        setLinks(loaded.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    };

    const createLink = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newUrl || !newUrl.trim()) {
            showToast('Please enter a valid URL', 'error');
            return;
        }

        // Validate URL format
        try {
            new URL(newUrl);
        } catch {
            showToast('Please enter a valid URL (e.g., https://example.com)', 'error');
            return;
        }

        const id = customId.trim() || Math.random().toString(36).substring(2, 8);
        
        // Validate custom ID format
        if (customId && !/^[a-zA-Z0-9-_]+$/.test(customId)) {
            showToast('Custom ID can only contain letters, numbers, hyphens, and underscores', 'error');
            return;
        }

        const key = `qr_dynamic_${id}`;

        if (localStorage.getItem(key)) {
            showToast('This ID is already taken. Please choose another', 'error');
            return;
        }

        // Validate expiration date
        let expiresAtValue: string | undefined = undefined;
        if (expiresAt) {
            const expDate = new Date(expiresAt);
            if (expDate < new Date()) {
                showToast('Expiration date must be in the future', 'error');
                return;
            }
            expiresAtValue = expDate.toISOString();
        }

        const newLink: DynamicLink = {
            id: id,
            url: newUrl.trim(),
            scans: 0,
            createdAt: new Date().toISOString(),
            active: true,
            scanHistory: [],
            notes: notes.trim() || undefined,
            expiresAt: expiresAtValue
        };

        localStorage.setItem(key, JSON.stringify(newLink));
        setNewUrl('');
        setCustomId('');
        setNotes('');
        setExpiresAt('');
        setShowAdvanced(false);
        loadLinks();
        showToast('Link created successfully!');
    };

    const deleteLink = (id: string) => {
        if (confirm('Are you sure you want to delete this link? The QR code will stop working.')) {
            localStorage.removeItem(`qr_dynamic_${id}`);
            loadLinks();
            showToast('Link deleted successfully');
        }
    };

    const deleteSelected = () => {
        if (selectedLinks.size === 0) return;
        if (confirm(`Are you sure you want to delete ${selectedLinks.size} link(s)?`)) {
            selectedLinks.forEach(id => {
                localStorage.removeItem(`qr_dynamic_${id}`);
            });
            setSelectedLinks(new Set());
            loadLinks();
            showToast(`${selectedLinks.size} link(s) deleted successfully`);
        }
    };

    const toggleStatus = (id: string) => {
        const key = `qr_dynamic_${id}`;
        const item = localStorage.getItem(key);
        if (item) {
            const data = JSON.parse(item);
            data.active = !data.active;
            localStorage.setItem(key, JSON.stringify(data));
            loadLinks();
            showToast(data.active ? 'Link activated' : 'Link paused');
        }
    };

    const toggleSelected = (id: string) => {
        const newSelected = new Set(selectedLinks);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedLinks(newSelected);
    };

    const toggleAllSelected = () => {
        if (selectedLinks.size === filteredAndSortedLinks.length) {
            setSelectedLinks(new Set());
        } else {
            setSelectedLinks(new Set(filteredAndSortedLinks.map(l => l.id)));
        }
    };

    const bulkToggleStatus = (activate: boolean) => {
        if (selectedLinks.size === 0) return;
        selectedLinks.forEach(id => {
            const key = `qr_dynamic_${id}`;
            const item = localStorage.getItem(key);
            if (item) {
                const data = JSON.parse(item);
                data.active = activate;
                localStorage.setItem(key, JSON.stringify(data));
            }
        });
        loadLinks();
        setSelectedLinks(new Set());
        showToast(`${selectedLinks.size} link(s) ${activate ? 'activated' : 'paused'}`);
    };

    const startEditing = (link: DynamicLink) => {
        setEditingId(link.id);
        setEditUrl(link.url);
        setEditNotes(link.notes || '');
    };

    const saveEdit = () => {
        if (!editingId || !editUrl) {
            showToast('Please enter a valid URL', 'error');
            return;
        }

        try {
            new URL(editUrl);
        } catch {
            showToast('Please enter a valid URL', 'error');
            return;
        }

        const key = `qr_dynamic_${editingId}`;
        const item = localStorage.getItem(key);
        if (item) {
            const data = JSON.parse(item);
            data.url = editUrl.trim();
            data.notes = editNotes.trim() || undefined;
            localStorage.setItem(key, JSON.stringify(data));
            loadLinks();
            setEditingId(null);
            setEditUrl('');
            setEditNotes('');
            showToast('Link updated successfully');
        }
    };

    const copyToClipboard = (id: string) => {
        const url = getFullUrl(id);
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
        showToast('Link copied to clipboard!');
    };

    const downloadQR = (id: string) => {
        const qrElement = qrRefs.current[id];
        if (!qrElement) return;

        const canvas = qrElement.querySelector('canvas');
        if (!canvas) return;

        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `qr-code-${id}-${Date.now()}.png`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('QR code downloaded!');
    };

    const exportLinks = (format: 'json' | 'csv') => {
        const dataToExport = links.map(link => ({
            id: link.id,
            url: link.url,
            shortUrl: getFullUrl(link.id),
            scans: link.scans,
            active: link.active,
            createdAt: link.createdAt,
            lastScanned: link.lastScanned || '',
            notes: link.notes || ''
        }));

        if (format === 'json') {
            const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `qr-links-${Date.now()}.json`;
            link.click();
            URL.revokeObjectURL(url);
        } else {
            const headers = ['ID', 'Short URL', 'Destination URL', 'Scans', 'Status', 'Created', 'Last Scanned', 'Notes'];
            const rows = dataToExport.map(link => [
                link.id,
                link.shortUrl,
                link.url,
                link.scans.toString(),
                link.active ? 'Active' : 'Paused',
                new Date(link.createdAt).toLocaleString(),
                link.lastScanned ? new Date(link.lastScanned).toLocaleString() : 'Never',
                link.notes || ''
            ]);
            const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `qr-links-${Date.now()}.csv`;
            link.click();
            URL.revokeObjectURL(url);
        }
        showToast(`Links exported as ${format.toUpperCase()}!`);
    };

    const importLinks = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target?.result as string);
                if (!Array.isArray(data)) {
                    showToast('Invalid file format', 'error');
                    return;
                }

                let imported = 0;
                data.forEach((link: any) => {
                    if (link.id && link.url) {
                        const key = `qr_dynamic_${link.id}`;
                        if (!localStorage.getItem(key)) {
                            localStorage.setItem(key, JSON.stringify({
                                url: link.url,
                                scans: link.scans || 0,
                                createdAt: link.createdAt || new Date().toISOString(),
                                active: link.active !== undefined ? link.active : true,
                                scanHistory: link.scanHistory || [],
                                notes: link.notes || '',
                                expiresAt: link.expiresAt || undefined
                            }));
                            imported++;
                        }
                    }
                });
                loadLinks();
                showToast(`${imported} link(s) imported successfully!`);
            } catch (error) {
                showToast('Failed to import file', 'error');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    const getFullUrl = (id: string) => {
        if (typeof window !== 'undefined') {
            return `${window.location.origin}/s/${id}`;
        }
        return `/s/${id}`;
    };

    const getLinkDetails = (id: string): DynamicLink | undefined => {
        return links.find(l => l.id === id);
    };

    // Filter and sort links
    const filteredAndSortedLinks = links
        .filter(link => {
            const matchesSearch = link.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                link.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (link.notes && link.notes.toLowerCase().includes(searchQuery.toLowerCase()));
            
            const matchesFilter = filterBy === 'all' || 
                (filterBy === 'active' && link.active) ||
                (filterBy === 'paused' && !link.active);
            
            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case 'oldest':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case 'scans-high':
                    return b.scans - a.scans;
                case 'scans-low':
                    return a.scans - b.scans;
                case 'name':
                    return a.id.localeCompare(b.id);
                default:
                    return 0;
            }
        });

    const totalScans = links.reduce((acc, curr) => acc + curr.scans, 0);
    const activeLinks = links.filter(l => l.active).length;
    const recentScans = links.filter(l => {
        if (!l.lastScanned) return false;
        const lastScan = new Date(l.lastScanned);
        const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return lastScan > dayAgo;
    }).length;

    return (
        <main className="min-h-screen text-[#1D1D1F] overflow-hidden font-sans selection:bg-[#007AFF]/20 selection:text-[#007AFF]">
            {/* Toast Notification */}
            {toast && (
                <div
                    role="alert"
                    aria-live="polite"
                    className={`fixed top-20 right-6 z-50 px-6 py-3 rounded-xl shadow-apple-glass border border-black/5 ${
                        toast.type === 'success' ? 'bg-[#34C759]/10 text-[#34C759]' : 'bg-[#FF3B30]/10 text-[#FF3B30]'
                    } flex items-center gap-2 animate-in slide-in-from-right`}
                >
                    <span className="text-sm font-medium">{toast.message}</span>
                    <button onClick={() => setToast(null)} className="ml-2" aria-label="Close notification">
                        <X size={16} />
                    </button>
                </div>
            )}

            {/* Header */}
            <Header
                title="Dynamic Manager"
                badge="Pro"
                badgeColor="text-[#FF9500] bg-[#FF9500]/10"
                icon={<div>D</div>}
                iconGradient="from-[#FF9500] to-[#FF5E3A]"
                mobileMenu={<Sidebar activeCategory="smart" onSelect={() => { }} />}
            />

            <div className="flex h-[calc(100vh-4rem)]">
                <nav className="hidden md:block w-64 border-r border-black/5 bg-[#F5F5F7] p-4 overflow-y-auto" aria-label="Navigation sidebar">
                    <Sidebar activeCategory="smart" onSelect={() => { }} />
                </nav>

                <div className="flex-1 overflow-y-auto p-4 lg:p-10 scrollbar-clean">
                    <div className="max-w-6xl mx-auto space-y-8 pb-20">
                        {/* Create New Card */}
                        <section className="card-pro p-8 relative overflow-hidden group" aria-label="Create new dynamic link">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-xl font-bold text-[#1D1D1F] flex items-center gap-2">
                                    <Plus size={22} className="text-[#007AFF]" aria-hidden="true" /> Create New Link
                                </h1>
                                <button
                                    onClick={() => setShowAdvanced(!showAdvanced)}
                                    className="text-xs text-[#86868B] hover:text-[#007AFF] flex items-center gap-1"
                                    aria-label={showAdvanced ? 'Hide advanced options' : 'Show advanced options'}
                                    aria-expanded={showAdvanced}
                                >
                                    <Settings size={14} aria-hidden="true" />
                                    {showAdvanced ? 'Hide' : 'Advanced'}
                                </button>
                            </div>

                            <form onSubmit={createLink} className="space-y-4" aria-label="Create dynamic link form">
                                <div className="grid md:grid-cols-12 gap-4">
                                    <div className="md:col-span-6 space-y-2">
                                        <label htmlFor="new-url" className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">Target Destination</label>
                                        <input
                                            id="new-url"
                                            type="url"
                                            required
                                            placeholder="https://your-website.com/promo"
                                            value={newUrl}
                                            onChange={e => setNewUrl(e.target.value)}
                                            className="w-full apple-input"
                                            aria-label="Target destination URL"
                                        />
                                    </div>
                                    <div className="md:col-span-4 space-y-2">
                                        <label htmlFor="custom-id" className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">Short ID (Optional)</label>
                                        <div className="flex items-center">
                                            <span className="bg-[#E8E8ED] text-[#86868B] text-sm px-4 py-3 rounded-l-xl font-medium select-none border-r border-white/50" aria-label="URL prefix">/s/</span>
                                            <input
                                                id="custom-id"
                                                type="text"
                                                placeholder="random"
                                                value={customId}
                                                onChange={e => setCustomId(e.target.value.replace(/[^a-zA-Z0-9-_]/, ''))}
                                                className="w-full apple-input rounded-l-none"
                                                aria-label="Custom short ID"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 flex items-end">
                                        <button type="submit" className="btn-primary w-full h-[46px] flex items-center justify-center gap-2 shadow-blue-500/20" aria-label="Create new dynamic link">
                                            Create <ArrowRight size={16} aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>

                                {showAdvanced && (
                                    <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-black/5">
                                        <div className="space-y-2">
                                            <label htmlFor="notes" className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">Notes (Optional)</label>
                                            <textarea
                                                id="notes"
                                                placeholder="Add a note about this link..."
                                                value={notes}
                                                onChange={e => setNotes(e.target.value)}
                                                className="w-full apple-input min-h-[80px]"
                                                aria-label="Link notes"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="expires-at" className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">Expires At (Optional)</label>
                                            <input
                                                id="expires-at"
                                                type="datetime-local"
                                                value={expiresAt}
                                                onChange={e => setExpiresAt(e.target.value)}
                                                className="w-full apple-input"
                                                aria-label="Link expiration date and time"
                                            />
                                        </div>
                                    </div>
                                )}
                            </form>
                        </section>

                        {/* Enhanced Stats */}
                        <section className="grid grid-cols-1 md:grid-cols-4 gap-6" aria-label="Statistics">
                            <div className="card-pro p-6 flex items-center gap-5">
                                <div className="p-3 bg-[#007AFF]/10 rounded-xl text-[#007AFF]" aria-hidden="true"><LinkIcon size={24} /></div>
                                <div>
                                    <div className="text-2xl font-bold text-[#1D1D1F]">{links.length}</div>
                                    <div className="text-xs font-medium text-[#86868B] uppercase tracking-wide">Total Links</div>
                                </div>
                            </div>
                            <div className="card-pro p-6 flex items-center gap-5">
                                <div className="p-3 bg-[#34C759]/10 rounded-xl text-[#34C759]" aria-hidden="true"><BarChart3 size={24} /></div>
                                <div>
                                    <div className="text-2xl font-bold text-[#1D1D1F]">{totalScans}</div>
                                    <div className="text-xs font-medium text-[#86868B] uppercase tracking-wide">Total Scans</div>
                                </div>
                            </div>
                            <div className="card-pro p-6 flex items-center gap-5">
                                <div className="p-3 bg-[#FF9500]/10 rounded-xl text-[#FF9500]" aria-hidden="true"><Power size={24} /></div>
                                <div>
                                    <div className="text-2xl font-bold text-[#1D1D1F]">{activeLinks}</div>
                                    <div className="text-xs font-medium text-[#86868B] uppercase tracking-wide">Active</div>
                                </div>
                            </div>
                            <div className="card-pro p-6 flex items-center gap-5">
                                <div className="p-3 bg-[#AF52DE]/10 rounded-xl text-[#AF52DE]" aria-hidden="true"><Clock size={24} /></div>
                                <div>
                                    <div className="text-2xl font-bold text-[#1D1D1F]">{recentScans}</div>
                                    <div className="text-xs font-medium text-[#86868B] uppercase tracking-wide">Scanned Today</div>
                                </div>
                            </div>
                        </section>

                        {/* Toolbar */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <h2 className="text-lg font-bold text-[#1D1D1F]">
                                    Links <span className="text-sm font-normal text-[#86868B] ml-2">({filteredAndSortedLinks.length})</span>
                                </h2>
                                {selectedLinks.size > 0 && (
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#007AFF]/10 rounded-lg" role="status" aria-label={`${selectedLinks.size} links selected`}>
                                        <span className="text-xs font-medium text-[#007AFF]">{selectedLinks.size} selected</span>
                                        <button
                                            onClick={() => bulkToggleStatus(true)}
                                            className="text-xs text-[#007AFF] hover:underline"
                                            aria-label="Activate selected links"
                                        >
                                            Activate
                                        </button>
                                        <span className="text-[#007AFF]/30" aria-hidden="true">•</span>
                                        <button
                                            onClick={() => bulkToggleStatus(false)}
                                            className="text-xs text-[#007AFF] hover:underline"
                                            aria-label="Pause selected links"
                                        >
                                            Pause
                                        </button>
                                        <span className="text-[#007AFF]/30" aria-hidden="true">•</span>
                                        <button
                                            onClick={deleteSelected}
                                            className="text-xs text-[#FF3B30] hover:underline"
                                            aria-label="Delete selected links"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <div className="relative">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868B]" aria-hidden="true" />
                                    <input
                                        type="text"
                                        placeholder="Search links..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        className="pl-9 pr-4 py-2 bg-white border border-[#D1D1D6] rounded-xl text-sm w-full md:w-64 focus:outline-none focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]"
                                        aria-label="Search links"
                                    />
                                </div>
                                <select
                                    value={filterBy}
                                    onChange={e => setFilterBy(e.target.value as FilterOption)}
                                    className="px-3 py-2 bg-white border border-[#D1D1D6] rounded-xl text-sm focus:outline-none focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]"
                                    aria-label="Filter links by status"
                                >
                                    <option value="all">All</option>
                                    <option value="active">Active</option>
                                    <option value="paused">Paused</option>
                                </select>
                                <select
                                    value={sortBy}
                                    onChange={e => setSortBy(e.target.value as SortOption)}
                                    className="px-3 py-2 bg-white border border-[#D1D1D6] rounded-xl text-sm focus:outline-none focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]"
                                    aria-label="Sort links"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="scans-high">Most Scans</option>
                                    <option value="scans-low">Least Scans</option>
                                    <option value="name">Name</option>
                                </select>
                                <div className="flex items-center gap-1 border border-[#D1D1D6] rounded-xl overflow-hidden" role="group" aria-label="Export and import options">
                                    <button
                                        onClick={() => exportLinks('json')}
                                        className="p-2 bg-white text-[#86868B] hover:text-[#007AFF] hover:bg-[#007AFF]/5 transition-colors"
                                        title="Export JSON"
                                        aria-label="Export links as JSON"
                                    >
                                        <FileDown size={18} aria-hidden="true" />
                                    </button>
                                    <button
                                        onClick={() => exportLinks('csv')}
                                        className="p-2 bg-white text-[#86868B] hover:text-[#007AFF] hover:bg-[#007AFF]/5 transition-colors border-l border-[#D1D1D6]"
                                        title="Export CSV"
                                        aria-label="Export links as CSV"
                                    >
                                        <FileText size={18} aria-hidden="true" />
                                    </button>
                                    <label className="p-2 bg-white text-[#86868B] hover:text-[#007AFF] hover:bg-[#007AFF]/5 transition-colors border-l border-[#D1D1D6] cursor-pointer" aria-label="Import links from JSON file">
                                        <FileUp size={18} aria-hidden="true" />
                                        <input type="file" accept=".json" onChange={importLinks} className="hidden" />
                                    </label>
                                </div>
                                <button onClick={loadLinks} className="p-2 bg-white border border-[#D1D1D6] rounded-xl text-[#86868B] hover:text-[#007AFF] transition-colors" aria-label="Refresh links">
                                    <RefreshCw size={18} aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        {/* Links List */}
                        <section aria-label="Dynamic links list">
                            <div className="grid gap-4">
                                {filteredAndSortedLinks.length === 0 ? (
                                    <div className="text-center py-16 border-2 border-dashed border-[#E5E5EA] rounded-3xl" role="status">
                                        <p className="text-[#86868B] text-sm font-medium">No links found.</p>
                                    </div>
                                ) : (
                                    <>
                                        {selectedLinks.size > 0 && (
                                            <div className="card-pro p-4 flex items-center justify-between">
                                                <button
                                                    onClick={toggleAllSelected}
                                                    className="flex items-center gap-2 text-sm text-[#86868B] hover:text-[#007AFF]"
                                                    aria-label={selectedLinks.size === filteredAndSortedLinks.length ? 'Deselect all links' : 'Select all links'}
                                                >
                                                    {selectedLinks.size === filteredAndSortedLinks.length ? (
                                                        <CheckSquare size={18} className="text-[#007AFF]" aria-hidden="true" />
                                                    ) : (
                                                        <Square size={18} aria-hidden="true" />
                                                    )}
                                                    Select All
                                                </button>
                                            </div>
                                        )}
                                        {filteredAndSortedLinks.map(link => {
                                            const isExpired = link.expiresAt && new Date(link.expiresAt) < new Date();
                                            return (
                                                <article
                                                    key={link.id}
                                                    className={`card-pro p-5 flex flex-col md:flex-row items-center gap-6 group transition-all duration-300 ${
                                                        !link.active || isExpired ? 'opacity-60 bg-[#F5F5F7]' : 'hover:shadow-apple-glass'
                                                    }`}
                                                    itemScope
                                                    itemType="https://schema.org/WebPage"
                                                >
                                                    {/* Checkbox */}
                                                    <button
                                                        onClick={() => toggleSelected(link.id)}
                                                        className="shrink-0"
                                                        aria-label={`${selectedLinks.has(link.id) ? 'Deselect' : 'Select'} link ${link.id}`}
                                                        aria-pressed={selectedLinks.has(link.id)}
                                                    >
                                                        {selectedLinks.has(link.id) ? (
                                                            <CheckSquare size={20} className="text-[#007AFF]" aria-hidden="true" />
                                                        ) : (
                                                            <Square size={20} className="text-[#86868B]" aria-hidden="true" />
                                                        )}
                                                    </button>

                                                    {/* QR Thumbnail */}
                                                    <div
                                                        ref={el => { qrRefs.current[link.id] = el; }}
                                                        className="bg-white p-2 rounded-xl border border-black/5 shrink-0 shadow-sm relative"
                                                        role="img"
                                                        aria-label={`QR code for ${link.id}`}
                                                    >
                                                        <QRCodeCanvas value={getFullUrl(link.id)} size={64} marginSize={1} />
                                                        {(!link.active || isExpired) && (
                                                            <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex items-center justify-center rounded-xl" aria-hidden="true">
                                                                <Power size={20} className="text-[#86868B]" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Details */}
                                                    <div className="flex-1 space-y-1.5 w-full text-center md:text-left min-w-0">
                                                        <div className="flex flex-col md:flex-row md:items-baseline gap-2">
                                                            <a
                                                                href={getFullUrl(link.id)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-lg font-semibold text-[#1D1D1F] hover:text-[#007AFF] hover:underline flex items-center justify-center md:justify-start gap-1"
                                                                itemProp="url"
                                                            >
                                                                <span itemProp="name">{link.id}</span> <ExternalLink size={12} className="opacity-40" aria-hidden="true" />
                                                            </a>
                                                            <span className="hidden md:inline text-[#C7C7CC]" aria-hidden="true">•</span>

                                                            {editingId === link.id ? (
                                                                <div className="flex flex-col gap-2 flex-1">
                                                                    <input
                                                                        type="text"
                                                                        value={editUrl}
                                                                        onChange={(e) => setEditUrl(e.target.value)}
                                                                        className="flex-1 h-8 px-2 text-sm border border-[#007AFF] rounded-lg focus:outline-none"
                                                                        autoFocus
                                                                        placeholder="Destination URL"
                                                                        aria-label="Edit destination URL"
                                                                    />
                                                                    <textarea
                                                                        value={editNotes}
                                                                        onChange={(e) => setEditNotes(e.target.value)}
                                                                        className="flex-1 h-16 px-2 py-1 text-sm border border-[#007AFF] rounded-lg focus:outline-none resize-none"
                                                                        placeholder="Notes (optional)"
                                                                        aria-label="Edit link notes"
                                                                    />
                                                                    <div className="flex items-center gap-2">
                                                                        <button onClick={saveEdit} className="px-3 py-1 bg-[#007AFF] text-white rounded-md text-xs font-medium" aria-label="Save changes">Save</button>
                                                                        <button onClick={() => setEditingId(null)} className="px-3 py-1 text-[#FF3B30] text-xs" aria-label="Cancel editing">Cancel</button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center gap-2 max-w-full justify-center md:justify-start">
                                                                    <span className="text-sm text-[#86868B] truncate font-medium max-w-[200px]" title={link.url} itemProp="description">
                                                                        {link.url}
                                                                    </span>
                                                                    {link.notes && (
                                                                        <span className="text-xs text-[#86868B] opacity-60" title={link.notes} aria-label={`Notes: ${link.notes}`}>
                                                                            📝
                                                                        </span>
                                                                    )}
                                                                    <button
                                                                        onClick={() => startEditing(link)}
                                                                        className="p-1 text-[#007AFF] opacity-0 group-hover:opacity-100 transition-opacity"
                                                                        title="Edit"
                                                                        aria-label={`Edit link ${link.id}`}
                                                                    >
                                                                        <Edit2 size={12} aria-hidden="true" />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-[#86868B] font-medium flex items-center justify-center md:justify-start gap-2 flex-wrap">
                                                            <time dateTime={link.createdAt} itemProp="dateCreated">
                                                                Created {new Date(link.createdAt).toLocaleDateString()}
                                                            </time>
                                                            {link.lastScanned && (
                                                                <>
                                                                    <span className="w-1 h-1 rounded-full bg-[#D1D1D6]" aria-hidden="true"></span>
                                                                    <time dateTime={link.lastScanned} itemProp="dateModified">
                                                                        Last scan: {new Date(link.lastScanned).toLocaleDateString()}
                                                                    </time>
                                                                </>
                                                            )}
                                                            {link.expiresAt && (
                                                                <>
                                                                    <span className="w-1 h-1 rounded-full bg-[#D1D1D6]" aria-hidden="true"></span>
                                                                    <time dateTime={link.expiresAt} className={isExpired ? 'text-[#FF3B30]' : ''}>
                                                                        {isExpired ? 'Expired' : `Expires: ${new Date(link.expiresAt).toLocaleDateString()}`}
                                                                    </time>
                                                                </>
                                                            )}
                                                            <span className="w-1 h-1 rounded-full bg-[#D1D1D6]" aria-hidden="true"></span>
                                                            <span className={link.active && !isExpired ? "text-[#34C759]" : "text-[#FF9500]"} itemProp="status">
                                                                {link.active && !isExpired ? "Active" : "Paused"}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Analytics */}
                                                    <div className="text-center px-6 md:border-l md:border-r border-[#E5E5EA] min-w-[100px]">
                                                        <div className="text-2xl font-bold text-[#1D1D1F]" itemProp="interactionStatistic">{link.scans}</div>
                                                        <div className="text-[10px] uppercase font-bold text-[#86868B] tracking-wider">Scans</div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex items-center gap-1" role="group" aria-label={`Actions for link ${link.id}`}>
                                                        <button
                                                            onClick={() => setShowDetails(link.id)}
                                                            className="p-2.5 text-[#86868B] hover:text-[#007AFF] hover:bg-[#007AFF]/10 rounded-xl transition-colors"
                                                            title="View Details"
                                                            aria-label={`View details for link ${link.id}`}
                                                        >
                                                            <Info size={20} aria-hidden="true" />
                                                        </button>
                                                        <button
                                                            onClick={() => downloadQR(link.id)}
                                                            className="p-2.5 text-[#86868B] hover:text-[#007AFF] hover:bg-[#007AFF]/10 rounded-xl transition-colors"
                                                            title="Download QR"
                                                            aria-label={`Download QR code for link ${link.id}`}
                                                        >
                                                            <Download size={20} aria-hidden="true" />
                                                        </button>
                                                        <button
                                                            onClick={() => copyToClipboard(link.id)}
                                                            className="p-2.5 text-[#86868B] hover:text-[#007AFF] hover:bg-[#007AFF]/10 rounded-xl transition-colors relative"
                                                            title="Copy Link"
                                                            aria-label={`Copy link ${link.id} to clipboard`}
                                                        >
                                                            {copiedId === link.id ? <Check size={20} className="text-[#34C759]" aria-hidden="true" /> : <Copy size={20} aria-hidden="true" />}
                                                        </button>
                                                        <button
                                                            onClick={() => toggleStatus(link.id)}
                                                            className={`p-2.5 rounded-xl transition-colors ${link.active ? 'text-[#86868B] hover:text-[#FF9500] hover:bg-[#FF9500]/10' : 'text-[#FF9500] bg-[#FF9500]/10'}`}
                                                            title={link.active ? "Pause Link" : "Resume Link"}
                                                            aria-label={link.active ? `Pause link ${link.id}` : `Resume link ${link.id}`}
                                                        >
                                                            <Power size={20} aria-hidden="true" />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteLink(link.id)}
                                                            className="p-2.5 text-[#86868B] hover:text-[#FF3B30] hover:bg-[#FF3B30]/10 rounded-xl transition-colors"
                                                            title="Delete"
                                                            aria-label={`Delete link ${link.id}`}
                                                        >
                                                            <Trash2 size={20} aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </article>
                                            );
                                        })}
                                    </>
                                )}
                            </div>
                        </section>

                        {/* Details Modal */}
                        {showDetails && (
                            <div
                                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
                                onClick={() => setShowDetails(null)}
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="modal-title"
                            >
                                <div className="card-pro p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} itemScope itemType="https://schema.org/WebPage">
                                    {(() => {
                                        const link = getLinkDetails(showDetails);
                                        if (!link) return null;
                                        return (
                                            <>
                                                <div className="flex items-center justify-between mb-6">
                                                    <h2 id="modal-title" className="text-xl font-bold text-[#1D1D1F]">Link Details</h2>
                                                    <button onClick={() => setShowDetails(null)} className="p-2 hover:bg-black/5 rounded-lg" aria-label="Close modal">
                                                        <X size={20} aria-hidden="true" />
                                                    </button>
                                                </div>
                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">Short URL</label>
                                                        <div className="mt-2 p-3 bg-[#F5F5F7] rounded-xl font-mono text-sm break-all" itemProp="url">
                                                            {getFullUrl(link.id)}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">Destination URL</label>
                                                        <div className="mt-2 p-3 bg-[#F5F5F7] rounded-xl text-sm break-all" itemProp="description">
                                                            {link.url}
                                                        </div>
                                                    </div>
                                                    {link.notes && (
                                                        <div>
                                                            <label className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">Notes</label>
                                                            <div className="mt-2 p-3 bg-[#F5F5F7] rounded-xl text-sm">
                                                                {link.notes}
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">Total Scans</label>
                                                            <div className="mt-2 text-2xl font-bold text-[#1D1D1F]" itemProp="interactionStatistic">{link.scans}</div>
                                                        </div>
                                                        <div>
                                                            <label className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">Status</label>
                                                            <div className="mt-2">
                                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                                    link.active ? 'bg-[#34C759]/10 text-[#34C759]' : 'bg-[#FF9500]/10 text-[#FF9500]'
                                                                }`} itemProp="status">
                                                                    {link.active ? 'Active' : 'Paused'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">Created</label>
                                                            <div className="mt-2 text-sm text-[#1D1D1F]">
                                                                <time dateTime={link.createdAt} itemProp="dateCreated">
                                                                    {new Date(link.createdAt).toLocaleString()}
                                                                </time>
                                                            </div>
                                                        </div>
                                                        {link.lastScanned && (
                                                            <div>
                                                                <label className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">Last Scanned</label>
                                                                <div className="mt-2 text-sm text-[#1D1D1F]">
                                                                    <time dateTime={link.lastScanned} itemProp="dateModified">
                                                                        {new Date(link.lastScanned).toLocaleString()}
                                                                    </time>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {link.expiresAt && (
                                                        <div>
                                                            <label className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">Expires At</label>
                                                            <div className={`mt-2 text-sm ${
                                                                new Date(link.expiresAt) < new Date() ? 'text-[#FF3B30]' : 'text-[#1D1D1F]'
                                                            }`}>
                                                                <time dateTime={link.expiresAt}>
                                                                    {new Date(link.expiresAt).toLocaleString()}
                                                                </time>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center justify-center pt-4 border-t border-black/5">
                                                        <div className="bg-white p-4 rounded-xl border border-black/5" role="img" aria-label={`QR code for ${link.id}`}>
                                                            <QRCodeCanvas value={getFullUrl(link.id)} size={200} marginSize={2} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        )}

                        <Footer />
                    </div>
                </div>
            </div>
        </main>
    );
}
