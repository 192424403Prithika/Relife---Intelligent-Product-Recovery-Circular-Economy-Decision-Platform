import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '../components/layout/Sidebar';
import { NavigationProvider } from '../context/NavigationContext';

export const metadata: Metadata = {
  title: 'ReLife AI — Universal Product Recovery Dashboard',
  description: 'AI-driven circular recovery and reverse-logistics platform for all returned products across retail, consumer goods, electronics, and appliances.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F4F7F5] text-slate-800 flex min-h-screen antialiased">
        <NavigationProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            {children}
          </div>
        </NavigationProvider>
      </body>
    </html>
  );
}
