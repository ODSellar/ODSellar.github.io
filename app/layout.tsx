import '../styles/globals.css';
import { Providers } from './providers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cottno',
  description: 'Welcome to Cottno',
};

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="absolute flex h-full w-full flex-col ">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
