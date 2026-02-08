import {
    Link, Smartphone, Wifi, User, CreditCard, Bitcoin, FileText, MapPin, Calendar,
    AppWindow, Facebook, ShoppingBag, Lock, Cpu, Globe, Mail, MessageSquare,
    Video, Music, Cloud, Share2, Shield, Radio, Key, Mic, Anchor, Bluetooth,
    Briefcase, Landmark, Tv, PenTool, Hash, LockKeyhole, Clock, Search, Map,
    Image as ImageIcon, Gamepad2, Heart, GraduationCap, Building2, Film, 
    Github, Activity, Pill, Stethoscope, BookOpen, School, Store, DollarSign, 
    Wallet, Coins, Circle, Hexagon, Star, Award, 
    Zap, Code, Database, Server, Monitor, Printer, QrCode, ScanLine
} from 'lucide-react';

export type CategoryId = 'social' | 'web' | 'communication' | 'network' | 'contact' | 'payment' | 'crypto' | 'file' | 'location' | 'event' | 'app' | 'marketing' | 'security' | 'gaming' | 'health' | 'education' | 'business' | 'entertainment';

export interface QRType {
    id: string;
    label: string;
    category: CategoryId;
    icon: any; // Lucide icon
    fields: QRField[];
    template?: (data: any) => string;
}

export interface QRField {
    key: string;
    label: string;
    type: 'text' | 'url' | 'email' | 'tel' | 'number' | 'date' | 'select' | 'textarea' | 'color';
    placeholder?: string;
    options?: { label: string; value: string }[];
    defaultValue?: string;
}

export const CATEGORIES = [
    { id: 'web', label: 'Web & Links', icon: Globe },
    { id: 'social', label: 'Social Media', icon: Share2 },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'network', label: 'Network', icon: Wifi },
    { id: 'contact', label: 'Identity', icon: User },
    { id: 'payment', label: 'Payments', icon: CreditCard },
    { id: 'crypto', label: 'Crypto', icon: Bitcoin },
    { id: 'file', label: 'Files', icon: FileText },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'event', label: 'Events', icon: Calendar },
    { id: 'app', label: 'Apps', icon: AppWindow },
    { id: 'marketing', label: 'Marketing', icon: ShoppingBag },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
    { id: 'health', label: 'Health', icon: Heart },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'business', label: 'Business', icon: Building2 },
    { id: 'entertainment', label: 'Entertainment', icon: Film },
];

// Helpers
const urlTemplate = (d: any) => (d.url && typeof d.url === 'string') ? d.url : '';
const textTemplate = (d: any) => (d.text && typeof d.text === 'string') ? d.text : '';

export const QR_TYPES: QRType[] = [
    // --- COMMUNICATION ---
    { id: 'sms', label: 'SMS', category: 'communication', icon: MessageSquare, fields: [{ key: 'phone', label: 'Phone', type: 'tel' }, { key: 'message', label: 'Message', type: 'textarea' }], template: (d) => `smsto:${d.phone || ''}:${encodeURIComponent(d.message || '')}` },
    { id: 'call', label: 'Phone Call', category: 'communication', icon: Smartphone, fields: [{ key: 'phone', label: 'Phone Number', type: 'tel' }], template: (d) => `tel:${d.phone}` },
    { id: 'email', label: 'Email', category: 'communication', icon: Mail, fields: [{ key: 'email', label: 'Email', type: 'email' }, { key: 'subject', label: 'Subject', type: 'text' }, { key: 'body', label: 'Body', type: 'textarea' }], template: (d) => {
        const email = d.email || '';
        const subject = d.subject ? `subject=${encodeURIComponent(d.subject)}` : '';
        const body = d.body ? `body=${encodeURIComponent(d.body)}` : '';
        const params = [subject, body].filter(Boolean).join('&');
        return `mailto:${email}${params ? '?' + params : ''}`;
    } },
    { id: 'whatsapp', label: 'WhatsApp Chat', category: 'communication', icon: MessageSquare, fields: [{ key: 'phone', label: 'Phone', type: 'tel' }], template: (d) => `https://wa.me/${d.phone}` },
    { id: 'whatsapp_msg', label: 'WhatsApp Msg', category: 'communication', icon: MessageSquare, fields: [{ key: 'phone', label: 'Phone', type: 'tel' }, { key: 'text', label: 'Message', type: 'textarea' }], template: (d) => `https://wa.me/${d.phone}?text=${encodeURIComponent(d.text)}` },
    { id: 'telegram', label: 'Telegram Chat', category: 'communication', icon: MessageSquare, fields: [{ key: 'username', label: 'Username', type: 'text' }], template: (d) => `https://t.me/${d.username}` },
    { id: 'discord', label: 'Discord Invite', category: 'communication', icon: MessageSquare, fields: [{ key: 'url', label: 'Invite Link', type: 'url' }], template: urlTemplate },
    { id: 'slack', label: 'Slack Channel', category: 'communication', icon: Hash, fields: [{ key: 'url', label: 'Channel Link', type: 'url' }], template: urlTemplate },
    { id: 'signal', label: 'Signal', category: 'communication', icon: Lock, fields: [{ key: 'url', label: 'Profile Link', type: 'url', placeholder: 'https://signal.me/#p/...' }], template: urlTemplate },
    { id: 'wechat', label: 'WeChat', category: 'communication', icon: MessageSquare, fields: [{ key: 'id', label: 'WeChat ID', type: 'text' }], template: (d) => `weixin://dl/chat?${encodeURIComponent(d.id || '')}` },
    { id: 'viber', label: 'Viber', category: 'communication', icon: MessageSquare, fields: [{ key: 'phone', label: 'Phone', type: 'tel' }], template: (d) => `viber://chat?number=${d.phone}` },
    { id: 'line', label: 'LINE', category: 'communication', icon: MessageSquare, fields: [{ key: 'id', label: 'LINE ID', type: 'text' }], template: (d) => `line://ti/p/${d.id}` },
    { id: 'skype', label: 'Skype', category: 'communication', icon: Video, fields: [{ key: 'username', label: 'Username', type: 'text' }], template: (d) => `skype:${d.username}?call` },

    // --- WEB ---
    { id: 'url', label: 'Website URL', category: 'web', icon: Link, fields: [{ key: 'url', label: 'URL', type: 'url' }], template: urlTemplate },
    { id: 'multi-url', label: 'Multi-URL', category: 'web', icon: Share2, fields: [{ key: 'url', label: 'Linktree/Bio Link', type: 'url' }], template: urlTemplate },
    { id: 'deep-link', label: 'Deep Link', category: 'web', icon: Link, fields: [{ key: 'url', label: 'Deep Link URI', type: 'text', placeholder: 'myapp://path/to/content' }], template: urlTemplate },
    { id: 'tracking', label: 'Tracking URL', category: 'web', icon: Search, fields: [{ key: 'url', label: 'Tracking Link', type: 'url' }], template: urlTemplate },
    { id: 'affiliate', label: 'Affiliate URL', category: 'web', icon: ShoppingBag, fields: [{ key: 'url', label: 'Referral Link', type: 'url' }], template: urlTemplate },
    { id: 'short', label: 'Short Link', category: 'web', icon: Link, fields: [{ key: 'url', label: 'Shortened URL', type: 'url' }], template: urlTemplate },
    {
        id: 'utm', label: 'UTM Campaign', category: 'web', icon: Globe, fields: [
            { key: 'base', label: 'Base URL', type: 'url' },
            { key: 'source', label: 'Source (utm_source)', type: 'text' },
            { key: 'medium', label: 'Medium (utm_medium)', type: 'text' },
            { key: 'campaign', label: 'Campaign (utm_campaign)', type: 'text' }
        ], template: (d) => {
            const base = d.base || '';
            const params = [
                d.source ? `utm_source=${encodeURIComponent(d.source)}` : '',
                d.medium ? `utm_medium=${encodeURIComponent(d.medium)}` : '',
                d.campaign ? `utm_campaign=${encodeURIComponent(d.campaign)}` : ''
            ].filter(Boolean).join('&');
            return `${base}${params ? (base.includes('?') ? '&' : '?') + params : ''}`;
        }
    },
    { id: 'qr-code', label: 'QR Code', category: 'web', icon: QrCode, fields: [{ key: 'url', label: 'URL to Encode', type: 'url' }], template: urlTemplate },

    // --- NETWORK ---
    {
        id: 'wifi', label: 'Wi-Fi', category: 'network', icon: Wifi, fields: [
            { key: 'ssid', label: 'SSID', type: 'text' }, { key: 'password', label: 'Password', type: 'text' },
            { key: 'encryption', label: 'Encryption', type: 'select', options: [{ label: 'WPA/WPA2', value: 'WPA' }, { label: 'WEP', value: 'WEP' }, { label: 'None', value: 'nopass' }] }
        ], template: (d) => {
            const encryption = d.encryption || 'WPA';
            const ssid = (d.ssid || '').replace(/[;\\,]/g, '\\$&');
            const password = (d.password || '').replace(/[;\\,]/g, '\\$&');
            return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
        }
    },
    { id: 'bluetooth', label: 'Bluetooth', category: 'network', icon: Bluetooth, fields: [{ key: 'mac', label: 'MAC Address', type: 'text' }, { key: 'name', label: 'Device Name', type: 'text' }], template: (d) => `BLUE:${d.name}:${d.mac}` },
    { id: 'vpn', label: 'VPN Config', category: 'network', icon: Shield, fields: [{ key: 'config', label: 'Config/Link', type: 'text' }], template: textTemplate },
    { id: 'ethernet', label: 'Ethernet', category: 'network', icon: Server, fields: [{ key: 'ip', label: 'IP Address', type: 'text' }, { key: 'port', label: 'Port', type: 'number' }], template: (d) => `ethernet://${d.ip}:${d.port}` },

    // --- IDENTITY ---
    {
        id: 'vcard', label: 'vCard', category: 'contact', icon: User, fields: [
            { key: 'fn', label: 'First Name', type: 'text' }, { key: 'ln', label: 'Last Name', type: 'text' },
            { key: 'cell', label: 'Mobile', type: 'tel' }, { key: 'email', label: 'Email', type: 'email' },
            { key: 'org', label: 'Company', type: 'text' }
        ], template: (d) => {
            const escapeVCard = (str: string) => (str || '').replace(/[,;\\]/g, '\\$&').replace(/\n/g, '\\n');
            const ln = escapeVCard(d.ln || '');
            const fn = escapeVCard(d.fn || '');
            const org = escapeVCard(d.org || '');
            const cell = (d.cell || '').replace(/[,;\\]/g, '\\$&');
            const email = (d.email || '').replace(/[,;\\]/g, '\\$&');
            return `BEGIN:VCARD\nVERSION:3.0\nN:${ln};${fn}\nFN:${fn} ${ln}\nORG:${org}\nTEL;TYPE=CELL:${cell}\nEMAIL:${email}\nEND:VCARD`;
        }
    },
    { id: 'bizcard', label: 'Business Card', category: 'contact', icon: Briefcase, fields: [{ key: 'url', label: 'Digital Card URL', type: 'url' }], template: urlTemplate },
    { id: 'resume', label: 'Digital Resume', category: 'contact', icon: FileText, fields: [{ key: 'url', label: 'Resume/Linkedin URL', type: 'url' }], template: urlTemplate },
    { id: 'me-card', label: 'Me Card', category: 'contact', icon: User, fields: [{ key: 'name', label: 'Name', type: 'text' }, { key: 'phone', label: 'Phone', type: 'tel' }, { key: 'email', label: 'Email', type: 'email' }, { key: 'url', label: 'Website', type: 'url' }], template: (d) => `MECARD:N:${d.name};TEL:${d.phone};EMAIL:${d.email};URL:${d.url};;` },

    // --- PAYMENTS ---
    { id: 'upi', label: 'UPI', category: 'payment', icon: CreditCard, fields: [{ key: 'pa', label: 'VPA', type: 'text' }, { key: 'am', label: 'Amount', type: 'number' }], template: (d) => {
        const pa = encodeURIComponent(d.pa || '');
        const am = d.am ? `&am=${encodeURIComponent(String(d.am))}` : '';
        return `upi://pay?pa=${pa}${am}`;
    } },
    { id: 'paypal', label: 'PayPal', category: 'payment', icon: CreditCard, fields: [{ key: 'user', label: 'Username', type: 'text' }], template: (d) => `https://paypal.me/${d.user}` },
    { id: 'stripe', label: 'Stripe', category: 'payment', icon: CreditCard, fields: [{ key: 'url', label: 'Payment Link', type: 'url' }], template: urlTemplate },
    {
        id: 'sepa', label: 'SEPA', category: 'payment', icon: Landmark, fields: [
            { key: 'bic', label: 'BIC', type: 'text' }, { key: 'name', label: 'Recipient', type: 'text' }, { key: 'iban', label: 'IBAN', type: 'text' }, { key: 'amount', label: 'Amount', type: 'number' }
        ], template: (d) => {
            const bic = (d.bic || '').replace(/\n/g, '');
            const name = (d.name || '').replace(/\n/g, '');
            const iban = (d.iban || '').replace(/\n/g, '');
            const amount = d.amount != null ? String(d.amount) : '0';
            return `BCD\n001\n1\nSCT\n${bic}\n${name}\n${iban}\nEUR${amount}`;
        }
    },
    { id: 'venmo', label: 'Venmo', category: 'payment', icon: CreditCard, fields: [{ key: 'user', label: 'Username', type: 'text' }], template: (d) => `https://venmo.com/${d.user}` },
    { id: 'cashapp', label: 'Cash App', category: 'payment', icon: CreditCard, fields: [{ key: 'user', label: 'Username ($)', type: 'text' }], template: (d) => `https://cash.app/$${d.user}` },
    { id: 'zelle', label: 'Zelle', category: 'payment', icon: CreditCard, fields: [{ key: 'email', label: 'Email/Phone', type: 'text' }], template: (d) => `zelle://pay?email=${d.email}` },
    { id: 'alipay', label: 'Alipay', category: 'payment', icon: CreditCard, fields: [{ key: 'account', label: 'Account', type: 'text' }], template: (d) => `alipay://platformapi/startapp?saId=10000007&qrcode=${encodeURIComponent(d.account)}` },
    { id: 'wechat-pay', label: 'WeChat Pay', category: 'payment', icon: CreditCard, fields: [{ key: 'code', label: 'Payment Code', type: 'text' }], template: (d) => `wxp://${d.code}` },

    // --- CRYPTO ---
    { id: 'bitcoin', label: 'Bitcoin', category: 'crypto', icon: Bitcoin, fields: [{ key: 'addr', label: 'Address', type: 'text' }, { key: 'amt', label: 'Amount', type: 'number' }], template: (d) => {
        const addr = d.addr || '';
        const amt = d.amt ? `?amount=${encodeURIComponent(String(d.amt))}` : '';
        return `bitcoin:${addr}${amt}`;
    } },
    { id: 'ethereum', label: 'Ethereum', category: 'crypto', icon: Cpu, fields: [{ key: 'addr', label: 'Address', type: 'text' }], template: (d) => `ethereum:${d.addr}` },
    { id: 'usdt', label: 'USDT', category: 'crypto', icon: Globe, fields: [{ key: 'addr', label: 'Address', type: 'text' }], template: (d) => `${d.addr}` },
    { id: 'binance', label: 'BNB', category: 'crypto', icon: Globe, fields: [{ key: 'addr', label: 'Address', type: 'text' }], template: (d) => `${d.addr}` },
    { id: 'solana', label: 'Solana', category: 'crypto', icon: Globe, fields: [{ key: 'addr', label: 'Address', type: 'text' }], template: (d) => `${d.addr}` },
    { id: 'dogecoin', label: 'Dogecoin', category: 'crypto', icon: Coins, fields: [{ key: 'addr', label: 'Address', type: 'text' }], template: (d) => `dogecoin:${d.addr}` },
    { id: 'litecoin', label: 'Litecoin', category: 'crypto', icon: Coins, fields: [{ key: 'addr', label: 'Address', type: 'text' }], template: (d) => `litecoin:${d.addr}` },
    { id: 'cardano', label: 'Cardano', category: 'crypto', icon: Circle, fields: [{ key: 'addr', label: 'Address', type: 'text' }], template: (d) => `${d.addr}` },
    { id: 'polygon', label: 'Polygon', category: 'crypto', icon: Hexagon, fields: [{ key: 'addr', label: 'Address', type: 'text' }], template: (d) => `${d.addr}` },

    // --- FILES ---
    { id: 'text', label: 'Plain Text', category: 'file', icon: FileText, fields: [{ key: 'text', label: 'Content', type: 'textarea' }], template: textTemplate },
    { id: 'pdf', label: 'PDF Link', category: 'file', icon: FileText, fields: [{ key: 'url', label: 'PDF URL', type: 'url' }], template: urlTemplate },
    { id: 'image', label: 'Image Link', category: 'file', icon: ImageIcon, fields: [{ key: 'url', label: 'Image URL', type: 'url' }], template: urlTemplate },
    { id: 'video', label: 'Video Link', category: 'file', icon: Video, fields: [{ key: 'url', label: 'Video URL', type: 'url' }], template: urlTemplate },
    { id: 'audio', label: 'Audio Link', category: 'file', icon: Music, fields: [{ key: 'url', label: 'Audio URL', type: 'url' }], template: urlTemplate },
    { id: 'cloud', label: 'Cloud File', category: 'file', icon: Cloud, fields: [{ key: 'url', label: 'Drive/Dropbox Link', type: 'url' }], template: urlTemplate },
    { id: 'document', label: 'Document', category: 'file', icon: FileText, fields: [{ key: 'url', label: 'Document URL', type: 'url' }], template: urlTemplate },

    // --- LOCATION ---
    { id: 'gmaps', label: 'Google Maps', category: 'location', icon: MapPin, fields: [{ key: 'q', label: 'Query/Address', type: 'text' }], template: (d) => `https://maps.google.com/?q=${encodeURIComponent(d.q)}` },
    { id: 'apple', label: 'Apple Maps', category: 'location', icon: Map, fields: [{ key: 'q', label: 'Address', type: 'text' }], template: (d) => `http://maps.apple.com/?q=${encodeURIComponent(d.q)}` },
    { id: 'geo', label: 'Coordinates', category: 'location', icon: MapPin, fields: [{ key: 'lat', label: 'Lat', type: 'number' }, { key: 'long', label: 'Long', type: 'number' }], template: (d) => {
        const lat = d.lat != null ? String(d.lat) : '0';
        const long = d.long != null ? String(d.long) : '0';
        return `geo:${lat},${long}`;
    } },
    { id: 'waze', label: 'Waze', category: 'location', icon: MapPin, fields: [{ key: 'q', label: 'Address', type: 'text' }], template: (d) => `https://waze.com/ul?q=${encodeURIComponent(d.q)}` },

    // --- EVENT ---
    { id: 'event', label: 'Calendar Event', category: 'event', icon: Calendar, fields: [{ key: 's', label: 'Title', type: 'text' }, { key: 'start', label: 'Start', type: 'date' }, { key: 'end', label: 'End', type: 'date' }], template: (d) => {
        const summary = (d.s || '').replace(/[,;\\]/g, '\\$&').replace(/\n/g, '\\n');
        const start = (d.start || '').replace(/[-:]/g, '').replace(/T/g, '');
        const end = (d.end || '').replace(/[-:]/g, '').replace(/T/g, '');
        return `BEGIN:VEVENT\nSUMMARY:${summary}\nDTSTART:${start}\nDTEND:${end}\nEND:VEVENT`;
    } },
    { id: 'zoom', label: 'Zoom', category: 'event', icon: Video, fields: [{ key: 'url', label: 'Meeting Link', type: 'url' }], template: urlTemplate },
    { id: 'meet', label: 'Google Meet', category: 'event', icon: Video, fields: [{ key: 'url', label: 'Meeting Link', type: 'url' }], template: urlTemplate },
    { id: 'teams', label: 'Microsoft Teams', category: 'event', icon: Video, fields: [{ key: 'url', label: 'Meeting Link', type: 'url' }], template: urlTemplate },
    { id: 'webex', label: 'Cisco Webex', category: 'event', icon: Video, fields: [{ key: 'url', label: 'Meeting Link', type: 'url' }], template: urlTemplate },

    // --- APPS ---
    { id: 'appstore', label: 'App Store', category: 'app', icon: AppWindow, fields: [{ key: 'url', label: 'App Link', type: 'url' }], template: urlTemplate },
    { id: 'playstore', label: 'Google Play', category: 'app', icon: AppWindow, fields: [{ key: 'id', label: 'Package ID', type: 'text', placeholder: 'com.example.app' }], template: (d) => `market://details?id=${encodeURIComponent(d.id || '')}` },
    { id: 'huawei', label: 'Huawei AppGallery', category: 'app', icon: AppWindow, fields: [{ key: 'id', label: 'App ID', type: 'text' }], template: (d) => `appmarket://details?id=${d.id}` },

    // --- SOCIAL ---
    { id: 'facebook', label: 'Facebook', category: 'social', icon: Facebook, fields: [{ key: 'url', label: 'Profile URL', type: 'url' }], template: urlTemplate },
    { id: 'instagram', label: 'Instagram', category: 'social', icon: Share2, fields: [{ key: 'u', label: 'Username', type: 'text' }], template: (d) => `https://instagram.com/${d.u}` },
    { id: 'twitter', label: 'Twitter', category: 'social', icon: MessageSquare, fields: [{ key: 'u', label: 'Username', type: 'text' }], template: (d) => `https://twitter.com/${d.u}` },
    { id: 'linkedin', label: 'LinkedIn', category: 'social', icon: User, fields: [{ key: 'url', label: 'Profile URL', type: 'url' }], template: urlTemplate },
    { id: 'youtube', label: 'YouTube', category: 'social', icon: Video, fields: [{ key: 'url', label: 'Channel URL', type: 'url' }], template: urlTemplate },
    { id: 'tiktok', label: 'TikTok', category: 'social', icon: Video, fields: [{ key: 'u', label: 'Username', type: 'text' }], template: (d) => `https://tiktok.com/@${d.u}` },
    { id: 'github', label: 'GitHub', category: 'social', icon: Github, fields: [{ key: 'username', label: 'Username', type: 'text' }], template: (d) => `https://github.com/${d.username}` },
    { id: 'reddit', label: 'Reddit', category: 'social', icon: Share2, fields: [{ key: 'url', label: 'Profile/Subreddit URL', type: 'url' }], template: urlTemplate },
    { id: 'snapchat', label: 'Snapchat', category: 'social', icon: MessageSquare, fields: [{ key: 'username', label: 'Username', type: 'text' }], template: (d) => `https://snapchat.com/add/${d.username}` },
    { id: 'pinterest', label: 'Pinterest', category: 'social', icon: ImageIcon, fields: [{ key: 'username', label: 'Username', type: 'text' }], template: (d) => `https://pinterest.com/${d.username}` },
    { id: 'spotify', label: 'Spotify', category: 'social', icon: Music, fields: [{ key: 'url', label: 'Artist/Playlist URL', type: 'url' }], template: urlTemplate },
    { id: 'twitch', label: 'Twitch', category: 'social', icon: Video, fields: [{ key: 'username', label: 'Username', type: 'text' }], template: (d) => `https://twitch.tv/${d.username}` },

    // --- GAMING ---
    { id: 'steam', label: 'Steam', category: 'gaming', icon: Gamepad2, fields: [{ key: 'id', label: 'Steam ID', type: 'text' }], template: (d) => `steam://friends/add/${d.id}` },
    { id: 'xbox', label: 'Xbox', category: 'gaming', icon: Gamepad2, fields: [{ key: 'gamertag', label: 'Gamertag', type: 'text' }], template: (d) => `xbox://profile?gamertag=${encodeURIComponent(d.gamertag)}` },
    { id: 'playstation', label: 'PlayStation', category: 'gaming', icon: Gamepad2, fields: [{ key: 'id', label: 'PSN ID', type: 'text' }], template: (d) => `playstation://players?onlineId=${d.id}` },
    { id: 'epic', label: 'Epic Games', category: 'gaming', icon: Gamepad2, fields: [{ key: 'username', label: 'Username', type: 'text' }], template: (d) => `com.epicgames.launcher://friends?add=${d.username}` },
    { id: 'roblox', label: 'Roblox', category: 'gaming', icon: Gamepad2, fields: [{ key: 'username', label: 'Username', type: 'text' }], template: (d) => `https://roblox.com/users/${d.username}/profile` },
    { id: 'minecraft', label: 'Minecraft', category: 'gaming', icon: Gamepad2, fields: [{ key: 'server', label: 'Server IP', type: 'text' }, { key: 'port', label: 'Port', type: 'number', defaultValue: '25565' }], template: (d) => `minecraft://?addExternalServer=${d.server}|${d.port || 25565}` },

    // --- HEALTH ---
    { id: 'medication', label: 'Medication Info', category: 'health', icon: Pill, fields: [{ key: 'name', label: 'Medication Name', type: 'text' }, { key: 'dosage', label: 'Dosage', type: 'text' }, { key: 'instructions', label: 'Instructions', type: 'textarea' }], template: (d) => `MED:${d.name}|${d.dosage}|${d.instructions}` },
    { id: 'health-record', label: 'Health Record', category: 'health', icon: Stethoscope, fields: [{ key: 'url', label: 'Record URL', type: 'url' }], template: urlTemplate },
    { id: 'emergency', label: 'Emergency Contact', category: 'health', icon: Activity, fields: [{ key: 'name', label: 'Contact Name', type: 'text' }, { key: 'phone', label: 'Phone', type: 'tel' }, { key: 'relation', label: 'Relation', type: 'text' }], template: (d) => `EMERGENCY:${d.name}|${d.phone}|${d.relation}` },
    { id: 'allergy', label: 'Allergy Info', category: 'health', icon: Heart, fields: [{ key: 'allergen', label: 'Allergen', type: 'text' }, { key: 'severity', label: 'Severity', type: 'select', options: [{ label: 'Mild', value: 'mild' }, { label: 'Moderate', value: 'moderate' }, { label: 'Severe', value: 'severe' }] }], template: (d) => `ALLERGY:${d.allergen}|${d.severity}` },

    // --- EDUCATION ---
    { id: 'course', label: 'Course Link', category: 'education', icon: BookOpen, fields: [{ key: 'url', label: 'Course URL', type: 'url' }], template: urlTemplate },
    { id: 'textbook', label: 'Textbook', category: 'education', icon: BookOpen, fields: [{ key: 'isbn', label: 'ISBN', type: 'text' }], template: (d) => `ISBN:${d.isbn}` },
    { id: 'classroom', label: 'Classroom', category: 'education', icon: School, fields: [{ key: 'code', label: 'Class Code', type: 'text' }], template: (d) => `CLASSROOM:${d.code}` },
    { id: 'library', label: 'Library', category: 'education', icon: BookOpen, fields: [{ key: 'url', label: 'Library URL', type: 'url' }], template: urlTemplate },
    { id: 'certificate', label: 'Certificate', category: 'education', icon: Award, fields: [{ key: 'url', label: 'Certificate URL', type: 'url' }], template: urlTemplate },

    // --- BUSINESS ---
    { id: 'invoice', label: 'Invoice', category: 'business', icon: FileText, fields: [{ key: 'url', label: 'Invoice URL', type: 'url' }], template: urlTemplate },
    { id: 'receipt', label: 'Receipt', category: 'business', icon: FileText, fields: [{ key: 'url', label: 'Receipt URL', type: 'url' }], template: urlTemplate },
    { id: 'product', label: 'Product', category: 'business', icon: ShoppingBag, fields: [{ key: 'url', label: 'Product URL', type: 'url' }], template: urlTemplate },
    { id: 'store', label: 'Store Location', category: 'business', icon: Store, fields: [{ key: 'url', label: 'Store URL', type: 'url' }], template: urlTemplate },
    { id: 'review', label: 'Review Link', category: 'business', icon: Star, fields: [{ key: 'url', label: 'Review URL', type: 'url' }], template: urlTemplate },
    { id: 'loyalty', label: 'Loyalty Program', category: 'business', icon: Award, fields: [{ key: 'code', label: 'Loyalty Code', type: 'text' }], template: (d) => `LOYALTY:${d.code}` },

    // --- ENTERTAINMENT ---
    { id: 'movie', label: 'Movie', category: 'entertainment', icon: Film, fields: [{ key: 'url', label: 'Movie URL', type: 'url' }], template: urlTemplate },
    { id: 'tv-show', label: 'TV Show', category: 'entertainment', icon: Tv, fields: [{ key: 'url', label: 'Show URL', type: 'url' }], template: urlTemplate },
    { id: 'podcast', label: 'Podcast', category: 'entertainment', icon: Mic, fields: [{ key: 'url', label: 'Podcast URL', type: 'url' }], template: urlTemplate },
    { id: 'music-album', label: 'Music Album', category: 'entertainment', icon: Music, fields: [{ key: 'url', label: 'Album URL', type: 'url' }], template: urlTemplate },
    { id: 'concert', label: 'Concert', category: 'entertainment', icon: Music, fields: [{ key: 'url', label: 'Ticket/Event URL', type: 'url' }], template: urlTemplate },
    { id: 'book', label: 'Book', category: 'entertainment', icon: BookOpen, fields: [{ key: 'isbn', label: 'ISBN', type: 'text' }], template: (d) => `ISBN:${d.isbn}` },

    // --- SECURITY ---
    {
        id: 'otp', label: '2FA / OTP', category: 'security', icon: Lock, fields: [
            { key: 'sec', label: 'Secret', type: 'text' }, { key: 'iss', label: 'Issuer', type: 'text' }, { key: 'user', label: 'Account', type: 'text' }
        ], template: (d) => {
            const iss = encodeURIComponent(d.iss || '');
            const user = encodeURIComponent(d.user || '');
            const sec = encodeURIComponent(d.sec || '');
            return `otpauth://totp/${iss}:${user}?secret=${sec}&issuer=${encodeURIComponent(d.iss || '')}`;
        }
    },
    { id: 'pass', label: 'Password Protected', category: 'security', icon: LockKeyhole, fields: [{ key: 'text', label: 'Secret Content', type: 'text' }], template: textTemplate },
    { id: 'wifi-password', label: 'WiFi Password Share', category: 'security', icon: Wifi, fields: [{ key: 'ssid', label: 'SSID', type: 'text' }, { key: 'password', label: 'Password', type: 'text' }], template: (d) => `WIFI:T:WPA;S:${d.ssid};P:${d.password};;` },
];
