import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { SideBar } from '@/components/SideBar';
import ToastContainer from '@/components/ToastContainer';
import LoginModal from '@/components/LoginModal';
import Provider from '@/components/Provider';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Behind Marygift admin panel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}, bg-white`}>
        <Provider>
          <LoginModal />
          <div className="w-[50px] flex min-h-screen flex-col items-center pt-8 px-5 h-screen fixed inset-y-0 pb-6 z-20 bg-purple-900">
            <SideBar />
          </div>

          <main className="ml-14 bg-white">{children}</main>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
