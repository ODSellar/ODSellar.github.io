'use client';

import { ThemeProvider } from 'next-themes';

interface IProps {
  children: any;
}

export function Providers({ children }: IProps) {
  return <ThemeProvider attribute={`class`}>{children}</ThemeProvider>;
}
