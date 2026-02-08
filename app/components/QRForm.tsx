import React from 'react';
import { QRType } from '../lib/qr-data';

interface QRFormProps {
    type: QRType;
    inputs: any;
    onChange: (key: string, value: string) => void;
}

export function QRForm({ type, inputs, onChange }: QRFormProps) {
    return (
        <div className="space-y-4">
            {type.fields.map((field) => (
                <div key={field.key} className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#86868B] uppercase tracking-wider block ml-1">
                        {field.label}
                    </label>

                    {field.type === 'textarea' ? (
                        <textarea
                            className="apple-input w-full min-h-[80px] text-[13px]"
                            placeholder={field.placeholder}
                            value={inputs[field.key] || field.defaultValue || ''}
                            onChange={(e) => onChange(field.key, e.target.value)}
                        />
                    ) : field.type === 'select' ? (
                        <div className="relative">
                            <select
                                className="apple-input w-full appearance-none text-[13px]"
                                value={inputs[field.key] || field.defaultValue || ''}
                                onChange={(e) => onChange(field.key, e.target.value)}
                            >
                                {field.options?.map(opt => (
                                    <option key={opt.value} value={opt.value} className="text-[#1D1D1F]">
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <input
                            type={field.type}
                            className="apple-input w-full h-[46px] text-[13px]"
                            placeholder={field.placeholder}
                            value={inputs[field.key] || field.defaultValue || ''}
                            onChange={(e) => onChange(field.key, e.target.value)}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
