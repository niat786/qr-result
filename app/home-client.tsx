"use client";

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Sliders, Image as ImageIcon, RotateCcw, ShieldCheck, Maximize, Layers, Loader2, Palette, Sparkles, Zap, Settings2 } from 'lucide-react';

import { Sidebar } from './components/Sidebar';
import { TypeSelector } from './components/TypeSelector';
import { QRForm } from './components/QRForm';
import { QR_TYPES, CategoryId } from './lib/qr-data';

import { useSearchParams } from 'next/navigation';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

function HomeContent() {
    const searchParams = useSearchParams();
    const initialCategory = (searchParams.get('category') as CategoryId) || 'web';

    const [activeCategory, setActiveCategory] = useState<CategoryId>(initialCategory);
    const [activeTypeId, setActiveTypeId] = useState('url');

    // Update state if URL changes while on page
    useEffect(() => {
        const cat = searchParams.get('category') as CategoryId;
        if (cat) setActiveCategory(cat);
    }, [searchParams]);

    const [qrValue, setQrValue] = useState('https://example.com');
    const [inputs, setInputs] = useState<any>({});

    // Customization State
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [margin, setMargin] = useState(2);
    const [logoSrc, setLogoSrc] = useState<string | undefined>(undefined);
    const [qrSize, setQrSize] = useState(240);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [borderRadius, setBorderRadius] = useState(0);
    const [shadow, setShadow] = useState(true);
    const [gradient, setGradient] = useState(false);
    const [gradientColor, setGradientColor] = useState('#007AFF');

    // Advanced Options
    const [ecc, setEcc] = useState<'L' | 'M' | 'Q' | 'H'>('M');
    const [logoSize, setLogoSize] = useState(40);
    const [noLogoBg, setNoLogoBg] = useState(false);
    const [resolution, setResolution] = useState(1024);

    const qrRef = useRef<HTMLDivElement>(null);

    const activeType = QR_TYPES.find(t => t.id === activeTypeId) || QR_TYPES[0];

    useEffect(() => {
        if (activeType.template) {
            const result = activeType.template(inputs);
            if (result) {
                setQrValue(result);
            } else {
                // Set default value if template returns empty
                setQrValue('https://example.com');
            }
        } else {
            setQrValue('https://example.com');
        }
    }, [inputs, activeType]);

    const handleDownload = (format: 'png' | 'svg') => {
        const canvas = qrRef.current?.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL(`image/${format}`);
            const link = document.createElement('a');
            link.download = `qr-code-${activeTypeId}-${Date.now()}.${format}`;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => setLogoSrc(event.target?.result as string);
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Header with Mobile Sidebar */}
            <Header
                title="QR Result"
                badge="Pro"
                mobileMenu={(close) => (
                    <Sidebar
                        activeCategory={activeCategory}
                        onSelect={(id) => { setActiveCategory(id); close(); }}
                    />
                )}
            />

            <div className="flex flex-1 overflow-hidden">
                {/* Navigation Sidebar (Desktop) */}
                <nav className="hidden md:block w-64 border-r border-black/5 bg-[#F5F5F7] p-4 overflow-y-auto" aria-label="Main navigation">
                    <Sidebar activeCategory={activeCategory} onSelect={setActiveCategory} />
                </nav>

                {/* Main Workspace */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-10 scrollbar-clean">
                    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
                        {/* Left Column: Pro Inputs (Paper-like) */}
                        <section className="flex-1 space-y-8 min-w-0" aria-label="QR Code Generator">
                            <header>
                                <h1 className="text-2xl font-bold text-[#1D1D1F] mb-6 flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-xl shadow-sm border border-black/5" aria-hidden="true">
                                        {React.createElement(activeType.icon, { size: 24, className: "text-[#007AFF]" })}
                                    </div>
                                    {activeType.label}
                                </h1>
                                <TypeSelector
                                    activeCategory={activeCategory}
                                    activeTypeId={activeTypeId}
                                    onSelectType={(id, init) => { setActiveTypeId(id); setInputs(init); }}
                                />
                            </header>

                            <article className="card-pro p-8">
                                <div className="mb-6 pb-4 border-b border-black/5">
                                    <h2 className="text-sm font-semibold text-[#86868B] uppercase tracking-wide">Enter Content</h2>
                                </div>
                                <QRForm
                                    type={activeType}
                                    inputs={inputs}
                                    onChange={(k, v) => setInputs(prev => ({ ...prev, [k]: v }))}
                                />
                            </article>

                            {/* Appearance Settings */}
                            <article className="card-pro p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-sm font-semibold text-[#86868B] flex items-center gap-2 uppercase tracking-wide">
                                        <Sliders size={16} className="text-[#007AFF]" aria-hidden="true" /> Customization
                                    </h2>
                                    <button
                                        onClick={() => setShowAdvanced(!showAdvanced)}
                                        className="text-xs text-[#86868B] hover:text-[#007AFF] flex items-center gap-1 transition-colors"
                                        aria-label={showAdvanced ? 'Hide advanced options' : 'Show advanced options'}
                                        aria-expanded={showAdvanced}
                                    >
                                        <Settings2 size={14} aria-hidden="true" />
                                        {showAdvanced ? 'Basic' : 'Advanced'}
                                    </button>
                                </div>

                                <div className="space-y-8">
                                    {/* Color Section */}
                                    <div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <label htmlFor="fg-color" className="text-xs font-semibold text-[#86868B] uppercase tracking-wider flex items-center gap-1">
                                                    <Palette size={12} aria-hidden="true" /> Foreground
                                                </label>
                                                <div className="flex items-center gap-3 bg-[#F5F5F7] p-2.5 rounded-xl border border-black/5">
                                                    <input
                                                        id="fg-color"
                                                        type="color"
                                                        value={fgColor}
                                                        onChange={(e) => setFgColor(e.target.value)}
                                                        className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                                                        aria-label="Foreground color picker"
                                                    />
                                                    <span className="text-xs text-[#1D1D1F] font-mono flex-1 text-center" aria-label={`Foreground color: ${fgColor}`}>{fgColor}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <label htmlFor="bg-color" className="text-xs font-semibold text-[#86868B] uppercase tracking-wider flex items-center gap-1">
                                                    <Palette size={12} aria-hidden="true" /> Background
                                                </label>
                                                <div className="flex items-center gap-3 bg-[#F5F5F7] p-2.5 rounded-xl border border-black/5">
                                                    <input
                                                        id="bg-color"
                                                        type="color"
                                                        value={bgColor}
                                                        onChange={(e) => setBgColor(e.target.value)}
                                                        className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                                                        aria-label="Background color picker"
                                                    />
                                                    <span className="text-xs text-[#1D1D1F] font-mono flex-1 text-center" aria-label={`Background color: ${bgColor}`}>{bgColor}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {showAdvanced && (
                                            <div className="mt-4 pt-4 border-t border-black/5">
                                                <div className="flex items-center justify-between mb-3">
                                                    <label htmlFor="gradient-toggle" className="text-xs font-semibold text-[#86868B] uppercase tracking-wider flex items-center gap-1">
                                                        <Sparkles size={12} aria-hidden="true" /> Gradient Effect
                                                    </label>
                                                    <button
                                                        id="gradient-toggle"
                                                        onClick={() => setGradient(!gradient)}
                                                        className={`px-3 py-1.5 text-xs rounded-lg border transition-all font-medium ${
                                                            gradient ? 'bg-[#007AFF] border-[#007AFF] text-white' : 'bg-white border-black/10 text-[#86868B]'
                                                        }`}
                                                        aria-pressed={gradient}
                                                        aria-label={`Gradient effect ${gradient ? 'enabled' : 'disabled'}`}
                                                    >
                                                        {gradient ? 'On' : 'Off'}
                                                    </button>
                                                </div>
                                                {gradient && (
                                                    <div className="flex items-center gap-3 bg-[#F5F5F7] p-2.5 rounded-xl border border-black/5">
                                                        <input
                                                            type="color"
                                                            value={gradientColor}
                                                            onChange={(e) => setGradientColor(e.target.value)}
                                                            className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                                                            aria-label="Gradient color picker"
                                                        />
                                                        <span className="text-xs text-[#86868B]">Gradient Color</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Size & Quality */}
                                    <div className="grid grid-cols-2 gap-6 border-t border-black/5 pt-6">
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <label htmlFor="qr-size" className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">QR Size</label>
                                                <span className="text-xs text-[#86868B] font-mono" aria-live="polite">{qrSize}px</span>
                                            </div>
                                            <input
                                                id="qr-size"
                                                type="range"
                                                min="120"
                                                max="400"
                                                value={qrSize}
                                                onChange={(e) => setQrSize(Number(e.target.value))}
                                                className="w-full h-1.5 bg-[#E8E8ED] rounded-lg appearance-none cursor-pointer accent-[#007AFF]"
                                                aria-label={`QR code size: ${qrSize} pixels`}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label htmlFor="ecc-level" className="text-xs font-semibold text-[#86868B] uppercase tracking-wider flex items-center gap-1">
                                                <ShieldCheck size={12} aria-hidden="true" /> Error Correction
                                            </label>
                                            <select
                                                id="ecc-level"
                                                value={ecc}
                                                onChange={(e) => setEcc(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                                                className="w-full apple-input text-xs font-mono"
                                                aria-label="Error correction level"
                                            >
                                                <option value="L">L - Low (~7%)</option>
                                                <option value="M">M - Medium (~15%)</option>
                                                <option value="Q">Q - Quartile (~25%)</option>
                                                <option value="H">H - High (~30%)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Margin & Resolution */}
                                    <div className="grid grid-cols-2 gap-6 border-t border-black/5 pt-6">
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <label htmlFor="margin" className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">Margin</label>
                                                <span className="text-xs text-[#86868B] font-mono" aria-live="polite">{margin}px</span>
                                            </div>
                                            <input
                                                id="margin"
                                                type="range"
                                                min="0"
                                                max="50"
                                                value={margin}
                                                onChange={(e) => setMargin(Number(e.target.value))}
                                                className="w-full h-1.5 bg-[#E8E8ED] rounded-lg appearance-none cursor-pointer accent-[#007AFF]"
                                                aria-label={`Margin: ${margin} pixels`}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label htmlFor="resolution" className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">Download Resolution</label>
                                            <select
                                                id="resolution"
                                                value={resolution}
                                                onChange={(e) => setResolution(Number(e.target.value))}
                                                className="w-full apple-input text-xs font-mono"
                                                aria-label="Download resolution"
                                            >
                                                <option value={512}>512px (Fast)</option>
                                                <option value={1024}>1024px (Standard)</option>
                                                <option value={2048}>2048px (High Quality)</option>
                                                <option value={4096}>4096px (Ultra HD)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Advanced Options */}
                                    {showAdvanced && (
                                        <div className="border-t border-black/5 pt-6 space-y-6">
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <div className="flex justify-between">
                                                        <label htmlFor="border-radius" className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">Border Radius</label>
                                                        <span className="text-xs text-[#86868B] font-mono" aria-live="polite">{borderRadius}px</span>
                                                    </div>
                                                    <input
                                                        id="border-radius"
                                                        type="range"
                                                        min="0"
                                                        max="30"
                                                        value={borderRadius}
                                                        onChange={(e) => setBorderRadius(Number(e.target.value))}
                                                        className="w-full h-1.5 bg-[#E8E8ED] rounded-lg appearance-none cursor-pointer accent-[#007AFF]"
                                                        aria-label={`Border radius: ${borderRadius} pixels`}
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label htmlFor="shadow-toggle" className="text-xs font-semibold text-[#86868B] uppercase tracking-wider flex items-center gap-1">
                                                        <Layers size={12} aria-hidden="true" /> Shadow
                                                    </label>
                                                    <button
                                                        id="shadow-toggle"
                                                        onClick={() => setShadow(!shadow)}
                                                        className={`w-full py-2 px-3 text-xs rounded-lg border transition-all font-medium ${
                                                            shadow ? 'bg-[#007AFF] border-[#007AFF] text-white' : 'bg-white border-black/10 text-[#86868B]'
                                                        }`}
                                                        aria-pressed={shadow}
                                                        aria-label={`Shadow effect ${shadow ? 'enabled' : 'disabled'}`}
                                                    >
                                                        {shadow ? 'Enabled' : 'Disabled'}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Quick Presets */}
                                            <div>
                                                <label className="text-xs font-semibold text-[#86868B] uppercase tracking-wider mb-3 block">Quick Presets</label>
                                                <div className="grid grid-cols-3 gap-2" role="group" aria-label="Color presets">
                                                    <button
                                                        onClick={() => {
                                                            setFgColor('#000000');
                                                            setBgColor('#ffffff');
                                                            setGradient(false);
                                                        }}
                                                        className="py-2 px-3 text-xs rounded-lg border border-black/10 bg-white hover:bg-[#F5F5F7] transition-colors"
                                                        aria-label="Classic preset: black on white"
                                                    >
                                                        Classic
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setFgColor('#007AFF');
                                                            setBgColor('#ffffff');
                                                            setGradient(false);
                                                        }}
                                                        className="py-2 px-3 text-xs rounded-lg border border-black/10 bg-white hover:bg-[#F5F5F7] transition-colors"
                                                        aria-label="Blue preset"
                                                    >
                                                        Blue
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setFgColor('#000000');
                                                            setBgColor('#FFD700');
                                                            setGradient(false);
                                                        }}
                                                        className="py-2 px-3 text-xs rounded-lg border border-black/10 bg-white hover:bg-[#F5F5F7] transition-colors"
                                                        aria-label="Gold preset"
                                                    >
                                                        Gold
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setFgColor('#ffffff');
                                                            setBgColor('#000000');
                                                            setGradient(false);
                                                        }}
                                                        className="py-2 px-3 text-xs rounded-lg border border-black/10 bg-white hover:bg-[#F5F5F7] transition-colors"
                                                        aria-label="Dark preset: white on black"
                                                    >
                                                        Dark
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setFgColor('#34C759');
                                                            setBgColor('#ffffff');
                                                            setGradient(false);
                                                        }}
                                                        className="py-2 px-3 text-xs rounded-lg border border-black/10 bg-white hover:bg-[#F5F5F7] transition-colors"
                                                        aria-label="Green preset"
                                                    >
                                                        Green
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setFgColor('#FF3B30');
                                                            setBgColor('#ffffff');
                                                            setGradient(false);
                                                        }}
                                                        className="py-2 px-3 text-xs rounded-lg border border-black/10 bg-white hover:bg-[#F5F5F7] transition-colors"
                                                        aria-label="Red preset"
                                                    >
                                                        Red
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Logo Section */}
                                    <div className="border-t border-black/5 pt-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="text-xs font-semibold text-[#86868B] uppercase tracking-wider flex items-center gap-1">
                                                <ImageIcon size={12} aria-hidden="true" /> Brand Logo
                                            </label>
                                            {logoSrc && (
                                                <button
                                                    onClick={() => setLogoSrc(undefined)}
                                                    className="text-[10px] text-[#FF3B30] hover:underline flex items-center gap-1"
                                                    aria-label="Remove logo"
                                                >
                                                    <RotateCcw size={10} aria-hidden="true" /> Remove
                                                </button>
                                            )}
                                        </div>

                                        {!logoSrc ? (
                                            <label className="flex items-center justify-center gap-2 cursor-pointer bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#86868B] hover:text-[#1D1D1F] py-8 rounded-xl border border-dashed border-black/10 hover:border-[#007AFF]/30 transition-all">
                                                <ImageIcon size={18} aria-hidden="true" />
                                                <span className="text-sm font-medium">Click to Upload Logo</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleLogoUpload}
                                                    className="hidden"
                                                    aria-label="Upload logo image"
                                                />
                                            </label>
                                        ) : (
                                            <div className="bg-[#F5F5F7] p-4 rounded-xl border border-black/5 space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label htmlFor="logo-size" className="text-xs font-medium text-[#86868B]">Size</label>
                                                        <input
                                                            id="logo-size"
                                                            type="range"
                                                            min="20"
                                                            max="120"
                                                            value={logoSize}
                                                            onChange={(e) => setLogoSize(Number(e.target.value))}
                                                            className="w-full h-1.5 bg-[#E8E8ED] rounded-lg appearance-none cursor-pointer accent-[#007AFF]"
                                                            aria-label={`Logo size: ${logoSize} pixels`}
                                                        />
                                                        <span className="text-xs text-[#86868B]" aria-live="polite">{logoSize}px</span>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-medium text-[#86868B]">Background</label>
                                                        <button
                                                            onClick={() => setNoLogoBg(!noLogoBg)}
                                                            className={`w-full py-2 px-3 text-xs rounded-lg border transition-all font-medium ${
                                                                !noLogoBg ? 'bg-white border-[#007AFF] text-[#007AFF]' : 'bg-white border-black/10 text-[#86868B]'
                                                            }`}
                                                            aria-pressed={noLogoBg}
                                                            aria-label={`Logo background: ${noLogoBg ? 'transparent' : 'solid box'}`}
                                                        >
                                                            {noLogoBg ? 'Transparent' : 'Solid Box'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </article>
                        </section>

                        {/* Right Column: Premium Preview (Liquid/Glass) */}
                        <aside className="lg:w-[420px] shrink-0" aria-label="QR Code Preview">
                            <div className="sticky top-24 space-y-6">
                                <div className="card-premium p-10 flex flex-col items-center justify-center relative overflow-hidden group">
                                    {/* Subtle gradient behind glass */}
                                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-[#007AFF]/20 to-[#5AC8FA]/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none opacity-50" aria-hidden="true"></div>
                                    <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-gradient-to-tr from-[#AF52DE]/10 to-[#FF2D55]/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none opacity-50" aria-hidden="true"></div>

                                    <div
                                        ref={qrRef}
                                        className={`bg-white p-6 relative z-10 transition-all duration-500 hover:scale-[1.02] ${
                                            shadow ? 'shadow-2xl shadow-black/10' : 'shadow-none'
                                        }`}
                                        style={{
                                            borderRadius: `${borderRadius}px`,
                                            background: gradient && gradientColor
                                                ? `linear-gradient(135deg, ${bgColor} 0%, ${gradientColor} 100%)`
                                                : bgColor
                                        }}
                                        role="img"
                                        aria-label={`QR code preview for ${activeType.label}`}
                                    >
                                        <div style={{ borderRadius: `${borderRadius}px`, overflow: 'hidden' }}>
                                            <QRCodeCanvas
                                                value={qrValue}
                                                size={qrSize}
                                                fgColor={fgColor}
                                                bgColor={gradient ? 'transparent' : bgColor}
                                                level={ecc}
                                                marginSize={Math.min(4, Math.max(0, Math.floor(margin / 12)))}
                                                imageSettings={logoSrc ? { src: logoSrc, height: logoSize, width: logoSize, excavate: !noLogoBg } : undefined}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-8 text-center space-y-1">
                                        <p className="text-sm font-medium text-[#1D1D1F]">Preview</p>
                                        <p className="text-xs text-[#86868B]">{resolution}x{resolution} - Level {ecc}</p>
                                    </div>
                                </div>

                                <div className="card-pro p-6 space-y-3">
                                    <button
                                        onClick={() => handleDownload('png')}
                                        className="btn-primary w-full flex items-center justify-center gap-2"
                                        aria-label="Download QR code as PNG"
                                    >
                                        <Download size={18} aria-hidden="true" /> Download PNG
                                    </button>
                                    <button
                                        onClick={() => handleDownload('svg')}
                                        className="btn-secondary w-full flex items-center justify-center gap-2"
                                        aria-label="Download QR code as SVG"
                                    >
                                        <Download size={18} aria-hidden="true" /> Download SVG
                                    </button>
                                </div>
                            </div>
                        </aside>
                    </div>

                    {/* Sample article section – content can be updated later */}
                    <article className="max-w-6xl mx-auto py-16 border-t border-black/5">
                        <div className="card-glossy p-8 md:p-10">
                            <header className="mb-8 relative z-10">
                                <h2 className="text-2xl font-bold text-[#1D1D1F] mb-2">
                                    Why Use a Free QR Code Generator?
                                </h2>
                                <p className="text-[#86868B] text-sm">
                                    Quick tips and ideas for using QR codes in your projects.
                                </p>
                            </header>
                            <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4 relative z-10">
                                <p>
                                    QR codes make it easy to share links, Wi‑Fi details, contact cards, and more. With QRResult you can create custom QR codes in seconds—no sign-up required. Choose from URLs, Wi‑Fi, vCards, plain text, and other formats, then customize colors and add your logo for a professional look.
                                </p>
                                <p>
                                    All QR codes generated here are static and never expire. Download high-resolution PNG or SVG files for print or digital use. We’ll add more guides and examples here soon.
                                </p>
                            </div>
                        </div>
                    </article>

                    <Footer />
                </main>
            </div>
        </div>
    );
}

export default function HomeClient() {
    return (
        <main className="min-h-screen text-[#1D1D1F] overflow-hidden font-sans selection:bg-[#007AFF]/20 selection:text-[#007AFF]">
            <Suspense fallback={
                <div className="flex h-screen items-center justify-center" role="status" aria-label="Loading">
                    <Loader2 className="animate-spin text-[#007AFF]" size={32} aria-hidden="true" />
                    <span className="sr-only">Loading QR code generator...</span>
                </div>
            }>
                <HomeContent />
            </Suspense>
        </main>
    );
}
