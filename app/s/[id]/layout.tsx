import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Redirecting...',
        description: 'Redirecting to your destination...',
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default function RedirectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
