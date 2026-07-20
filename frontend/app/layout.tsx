import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'BridgeCare AI - Healthcare Innovation Platform',
  description: 'Connect research, evidence, and clinical practice to accelerate healthcare translation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header />
        <main className="min-h-screen bg-bg">
          {children}
        </main>
      </body>
    </html>
  );
}

