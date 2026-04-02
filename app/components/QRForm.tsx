import React from 'react';
import { QRType } from '../lib/qr-data';

interface QRFormProps {
    type: QRType;
    inputs: any;
    onChange: (key: string, value: string) => void;
}

export function QRForm({ type, inputs, onChange }: QRFormProps) {
    return (
        <div className="space-y-5">
            {type.fields.map((field) => {
                const inputId = `qr-field-${field.key}`;
                const hintId = field.placeholder ? `${inputId}-hint` : undefined;

                return (
                    <div key={field.key} className="space-y-2">
                        <label
                            htmlFor={inputId}
                            className="text-[13px] font-semibold text-[#6E6E73] uppercase tracking-wider block ml-1"
                        >
                            {field.label}
                        </label>

                        {field.type === 'textarea' ? (
                            <textarea
                                id={inputId}
                                className="apple-input w-full min-h-[80px] text-sm"
                                placeholder={field.placeholder}
                                value={inputs[field.key] || field.defaultValue || ''}
                                onChange={(e) => onChange(field.key, e.target.value)}
                                aria-describedby={hintId}
                            />
                        ) : field.type === 'select' ? (
                            <div className="relative">
                                <select
                                    id={inputId}
                                    className="apple-input w-full appearance-none text-sm"
                                    value={inputs[field.key] || field.defaultValue || ''}
                                    onChange={(e) => onChange(field.key, e.target.value)}
                                    aria-describedby={hintId}
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
                                id={inputId}
                                type={field.type}
                                className="apple-input w-full h-[46px] text-sm"
                                placeholder={field.placeholder}
                                value={inputs[field.key] || field.defaultValue || ''}
                                onChange={(e) => onChange(field.key, e.target.value)}
                                aria-describedby={hintId}
                            />
                        )}

                        {field.placeholder && (
                            <p id={hintId} className="text-xs text-[#6E6E73] ml-1">
                                e.g. {field.placeholder}
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
