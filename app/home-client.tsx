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

                    {/* SEO Content Section */}
                    <article className="max-w-6xl mx-auto py-16 border-t border-black/5 space-y-12" itemScope itemType="https://schema.org/Article">
                        {/* Main Intro */}
                        <div className="card-glossy p-8 md:p-10">
                            <header className="mb-8 relative z-10">
                                <h2 className="text-2xl font-bold text-[#1D1D1F] mb-2" itemProp="headline">
                                    Free QR Code Generator — Create Custom QR Codes Instantly
                                </h2>
                                <p className="text-[#86868B] text-sm">
                                    The complete guide to generating professional QR codes for every purpose.
                                </p>
                            </header>
                            <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4 relative z-10" itemProp="articleBody">
                                <p>
                                    QR codes have transformed the way we share information. According to <a href="https://www.statista.com/topics/1145/internet-usage-worldwide/" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">Statista</a>, over 89 million smartphone users in the United States alone scanned a QR code in 2022. That number continues to grow every year. Businesses, educators, healthcare providers, and everyday people rely on QR codes to connect the physical and digital worlds.
                                </p>
                                <p>
                                    <strong>QRResult is a free QR code generator</strong> that lets you create beautiful, high-quality QR codes in seconds. You do not need to sign up, pay a subscription, or install any software. Everything happens right here in your browser. Simply choose your QR code type, enter your content, customize the design, and download. It really is that easy.
                                </p>
                                <p>
                                    We support over <strong>80 QR code types</strong> across <strong>18 categories</strong>. From website URLs and WiFi passwords to cryptocurrency wallets and medical information, QRResult handles it all. Every code you generate is fully customizable with your brand colors, logo, and preferred export format. Download in crisp PNG (up to 4096px) or scalable SVG for professional print use.
                                </p>
                            </div>
                        </div>

                        {/* Web & Links */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Web & Links — Turn Any URL Into a Scannable Code</h3>
                                <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4">
                                    <p>
                                        The most popular use of QR codes is sharing website links. With QRResult, you can create QR codes for standard URLs, shortened links, deep links, affiliate URLs, tracking URLs, and UTM campaign links. Marketers love our UTM Campaign builder because it lets you add source, medium, and campaign parameters directly — perfect for tracking performance in <a href="https://marketingplatform.google.com/about/analytics/" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">Google Analytics</a>.
                                    </p>
                                    <p>
                                        Need a multi-URL QR code? Link to your Linktree, bio page, or custom landing page. Every link you encode generates a permanent, scannable code that never expires.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Social Media */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Social Media — Share Your Profiles With a Single Scan</h3>
                                <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4">
                                    <p>
                                        Growing your social media presence starts with making it easy for people to find you. QRResult supports QR codes for <strong>Facebook, Instagram, Twitter, LinkedIn, YouTube, TikTok, GitHub, Reddit, Snapchat, Pinterest, Spotify, and Twitch</strong>. Place these codes on business cards, event banners, product packaging, or store windows.
                                    </p>
                                    <p>
                                        Instead of spelling out long usernames, let people scan and follow you instantly. According to <a href="https://datareportal.com/global-digital-overview" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">DataReportal</a>, there are over 5 billion social media users worldwide. QR codes are one of the fastest ways to convert offline interactions into online followers.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Communication */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Communication — Connect Through Every Channel</h3>
                                <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4">
                                    <p>
                                        QRResult makes it effortless to create QR codes for direct communication. Generate codes for <strong>SMS, phone calls, email, WhatsApp, Telegram, Discord, Slack, Signal, WeChat, Viber, LINE, and Skype</strong>. When someone scans your code, their device opens the right app with your contact details pre-filled.
                                    </p>
                                    <p>
                                        This is incredibly useful for customer support teams, event organizers, and small businesses. A WhatsApp QR code on your storefront window lets customers message you directly. An email QR code on a flyer pre-fills the subject line and recipient. These small touches save time and reduce friction.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Network */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Network — Share WiFi, Bluetooth, and VPN Settings</h3>
                                <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4">
                                    <p>
                                        Stop dictating complicated WiFi passwords to your guests. Our <strong>WiFi QR code generator</strong> creates scannable codes that connect devices automatically. It supports WPA, WPA2, WEP, and open networks. Guests simply scan the code with their phone camera and connect instantly.
                                    </p>
                                    <p>
                                        Beyond WiFi, QRResult also supports Bluetooth device pairing, VPN configuration sharing, and Ethernet connection details. Hotels, restaurants, co-working spaces, and offices use network QR codes daily. The <a href="https://www.wi-fi.org/" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">Wi-Fi Alliance</a> confirms that QR-based WiFi sharing is now a standard feature across all major smartphone platforms.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Identity / Contact */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Identity — Digital Business Cards and vCards</h3>
                                <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4">
                                    <p>
                                        Paper business cards get lost. Digital ones do not. QRResult generates <strong>vCard QR codes</strong> that save your name, phone number, email, and company directly to someone&apos;s contacts with a single scan. We also support Business Card URLs, Digital Resumes, and MeCard format for broader device compatibility.
                                    </p>
                                    <p>
                                        Networking at conferences, trade shows, and meetups becomes seamless. Share your professional details without handing over a physical card. The <a href="https://datatracker.ietf.org/doc/html/rfc6350" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">vCard standard (RFC 6350)</a> is supported by every major smartphone and email client worldwide.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Payments */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Payments — Accept Money With QR Codes</h3>
                                <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4">
                                    <p>
                                        QR codes have revolutionized digital payments globally. QRResult supports <strong>UPI, PayPal, Stripe, SEPA bank transfers, Venmo, Cash App, Zelle, Alipay, and WeChat Pay</strong>. Create payment QR codes that let customers pay you directly from their phone.
                                    </p>
                                    <p>
                                        Small businesses, freelancers, and street vendors use payment QR codes to accept contactless payments without expensive hardware. The <a href="https://www.worldbank.org/en/topic/financialinclusion" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">World Bank</a> reports that QR-based payments are driving financial inclusion in developing economies worldwide.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Crypto */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Cryptocurrency — Share Wallet Addresses Safely</h3>
                                <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4">
                                    <p>
                                        Cryptocurrency addresses are long and error-prone to type manually. QRResult generates QR codes for <strong>Bitcoin, Ethereum, USDT, BNB, Solana, Dogecoin, Litecoin, Cardano, and Polygon</strong> wallet addresses. Scanning eliminates typos and ensures funds reach the right destination.
                                    </p>
                                    <p>
                                        You can also include a specific payment amount in the QR code for Bitcoin transactions. This is essential for merchants accepting crypto payments. The <a href="https://bitcoin.org/en/" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">Bitcoin.org</a> protocol natively supports QR code encoding for wallet addresses and payment requests.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Files */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Files — Link to Documents, Images, Videos, and More</h3>
                                <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4">
                                    <p>
                                        Need to share a file quickly? QRResult creates QR codes for <strong>plain text, PDF links, image URLs, video links, audio files, cloud storage links, and documents</strong>. Point your QR code to any publicly accessible file and let people access it with a scan.
                                    </p>
                                    <p>
                                        This is perfect for sharing restaurant menus, event brochures, instruction manuals, training videos, and product catalogs. Link to files on Google Drive, Dropbox, OneDrive, or your own server. The QR code becomes a bridge between printed materials and digital content.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Location */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Location — Guide People to the Right Place</h3>
                                <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4">
                                    <p>
                                        Location QR codes open map applications directly with your address or coordinates. QRResult supports <strong>Google Maps, Apple Maps, geographic coordinates (lat/long), and Waze</strong>. Place these codes on event invitations, business cards, flyers, or delivery instructions.
                                    </p>
                                    <p>
                                        Your guests never have to search for directions manually. A single scan opens turn-by-turn navigation to your exact location. This is especially valuable for event venues, wedding invitations, retail stores, and real estate open houses.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Events */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Events — Calendar Invites and Meeting Links</h3>
                                <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4">
                                    <p>
                                        QRResult generates <strong>calendar event QR codes</strong> that add events directly to a person&apos;s calendar app. Set the title, start date, and end date. We also support direct meeting links for <strong>Zoom, Google Meet, Microsoft Teams, and Cisco Webex</strong>.
                                    </p>
                                    <p>
                                        Conference organizers print QR codes on session schedules so attendees can save talks to their calendars. Teachers share class meeting links via QR codes posted in classrooms. It eliminates the hassle of copying long URLs and manual calendar entries.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Apps */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Apps — Drive Downloads From Every Store</h3>
                                <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4">
                                    <p>
                                        Promote your mobile app with QR codes that link directly to the <strong>Apple App Store, Google Play Store, and Huawei AppGallery</strong>. Users scan the code and land on your app listing, ready to download. No searching required.
                                    </p>
                                    <p>
                                        App developers and marketers place these codes on websites, printed ads, product packaging, and email signatures. According to <a href="https://www.data.ai/" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">data.ai</a>, reducing friction in the app discovery process significantly increases download conversion rates.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Marketing */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Marketing — Track Campaigns and Boost Engagement</h3>
                                <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4">
                                    <p>
                                        QRResult is built for marketers. Our Web & Links category includes <strong>UTM campaign builders, tracking URLs, affiliate links, and short links</strong>. Combined with our <strong>dynamic QR code</strong> feature, you can change the destination URL after printing and track scan analytics in real time.
                                    </p>
                                    <p>
                                        Dynamic QR codes are a game-changer for marketing campaigns. Print a QR code on thousands of flyers, then update where it points without reprinting anything. Monitor how many people scan it, when they scan, and optimize your campaigns based on real data.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Security */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Security — Two-Factor Authentication and Secure Sharing</h3>
                                <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4">
                                    <p>
                                        Security-conscious users rely on QRResult for <strong>2FA/OTP setup codes, password-protected content, and WiFi password sharing</strong>. Our 2FA QR code generator creates TOTP-compatible codes that work with authenticator apps like Google Authenticator and Authy.
                                    </p>
                                    <p>
                                        The <a href="https://owasp.org/www-community/controls/Multi-Factor_Authentication" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">OWASP Foundation</a> recommends two-factor authentication as a critical security measure. QRResult makes it simple to generate setup codes for your applications and services.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Gaming */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Gaming — Connect With Fellow Gamers</h3>
                                <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4">
                                    <p>
                                        Share your gaming profiles effortlessly. QRResult generates QR codes for <strong>Steam, Xbox, PlayStation, Epic Games, Roblox, and Minecraft server connections</strong>. Friends can scan your code to add you instantly instead of typing long gamertags or server IPs.
                                    </p>
                                    <p>
                                        Minecraft server owners can share connection details with a single code. Esports teams use QR codes on their merchandise and social media to grow their community. Gaming QR codes make connecting fast and fun.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Health */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Health — Medical Information at Your Fingertips</h3>
                                <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4">
                                    <p>
                                        QR codes save lives by making critical health information instantly accessible. QRResult supports <strong>medication information, health record links, emergency contacts, and allergy information</strong>. Encode your medication name, dosage, and instructions into a scannable code that healthcare providers can read quickly.
                                    </p>
                                    <p>
                                        Emergency contact QR codes are especially valuable for people with medical conditions, elderly individuals, and children. The <a href="https://www.who.int/health-topics/digital-health" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">World Health Organization</a> supports the use of digital health tools to improve patient care and safety outcomes.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Education */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Education — Streamline Learning and Resources</h3>
                                <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4">
                                    <p>
                                        Educators around the world use QR codes to enhance the classroom experience. QRResult creates codes for <strong>course links, textbook ISBNs, classroom codes, library resources, and certificates</strong>. Students scan a code and land directly on the learning material they need.
                                    </p>
                                    <p>
                                        Teachers place QR codes on worksheets to link to supplementary videos. Universities embed them in campus maps to guide new students. Libraries use ISBN QR codes for quick catalog lookups. According to the <a href="https://www.ed.gov/technology" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">U.S. Department of Education</a>, technology integration in classrooms improves student engagement and learning outcomes.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Business */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Business — Invoices, Products, Reviews, and More</h3>
                                <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4">
                                    <p>
                                        QRResult powers everyday business operations. Create QR codes for <strong>invoices, receipts, product pages, store locations, customer review links, and loyalty programs</strong>. A QR code on a receipt can link to a feedback form. A code on product packaging can open detailed specifications or warranty registration.
                                    </p>
                                    <p>
                                        Loyalty program QR codes let customers collect points with a simple scan. Review link codes encourage satisfied customers to leave positive feedback on Google, Yelp, or Trustpilot. These small improvements add up to meaningful business growth.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Entertainment */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Entertainment — Movies, Music, Podcasts, and Books</h3>
                                <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4">
                                    <p>
                                        Share your favorite content with the world. QRResult generates QR codes for <strong>movies, TV shows, podcasts, music albums, concert tickets, and books</strong>. Content creators use these codes to promote their work across physical and digital channels.
                                    </p>
                                    <p>
                                        A podcast host can print a QR code on promotional stickers that links directly to their show. An author can add a QR code inside their book that leads to bonus content. A band can put a code on their poster that opens ticket sales. The possibilities are endless.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Why QRResult */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Why Choose QRResult Over Other QR Code Generators?</h3>
                                <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4">
                                    <p>
                                        Most QR code generators are cluttered with ads, require paid accounts for basic features, or add watermarks to your downloads. <strong>QRResult is different.</strong> Here is what makes us the preferred choice:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li><strong>Completely free</strong> — No hidden fees, no premium tiers for basic QR codes</li>
                                        <li><strong>No sign-up required</strong> — Start creating QR codes immediately</li>
                                        <li><strong>No watermarks</strong> — Every download is clean and professional</li>
                                        <li><strong>Privacy-first</strong> — Static codes are generated entirely in your browser. Your data never leaves your device</li>
                                        <li><strong>80+ QR code types</strong> — The widest selection of QR formats available for free</li>
                                        <li><strong>Full customization</strong> — Colors, gradients, logos, error correction, border radius, and shadows</li>
                                        <li><strong>High-resolution exports</strong> — PNG up to 4096px and scalable SVG for print</li>
                                        <li><strong>Dynamic QR codes</strong> — Change destinations after printing and track scans with analytics</li>
                                        <li><strong>Open source</strong> — Our entire codebase is available on <a href="https://github.com/niat786/qr-result-new" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">GitHub</a> for full transparency</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* How It Works */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">How to Create a QR Code in 3 Simple Steps</h3>
                                <div className="prose prose-neutral max-w-none text-[#1D1D1F] space-y-4">
                                    <p>
                                        Creating a QR code with QRResult takes less than 30 seconds. Follow these three simple steps:
                                    </p>
                                    <ol className="list-decimal pl-5 space-y-3">
                                        <li><strong>Choose your QR code type.</strong> Browse our 18 categories in the sidebar and select the format that matches your needs — URL, WiFi, vCard, payment, social media, and many more.</li>
                                        <li><strong>Enter your content and customize.</strong> Fill in the required fields, then personalize your QR code with custom colors, your brand logo, gradient effects, and your preferred error correction level.</li>
                                        <li><strong>Download and share.</strong> Preview your QR code in real time, then download it as a high-resolution PNG or SVG file. Print it, share it digitally, or embed it on your website.</li>
                                    </ol>
                                    <p>
                                        That is all it takes. No account creation, no payment, no waiting. Your QR code is ready to use the moment you download it.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Closing CTA */}
                        <section className="card-glossy p-8 md:p-10">
                            <div className="relative z-10 text-center">
                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Start Creating Your QR Codes Today</h3>
                                <p className="text-[#86868B] max-w-2xl mx-auto mb-2">
                                    QRResult is trusted by thousands of users worldwide. Whether you need a single QR code for your WiFi password or hundreds of codes for a marketing campaign, we have you covered. Scroll up to the generator, pick your category, and create your first QR code right now — completely free.
                                </p>
                            </div>
                        </section>
                    </article>

                    <Footer />
                </main>
            </div>
        </div>
    );
}

export default function HomeClient() {
    return (
        <main id="main-content" className="min-h-screen text-[#1D1D1F] overflow-hidden font-sans selection:bg-[#007AFF]/20 selection:text-[#007AFF]">
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
