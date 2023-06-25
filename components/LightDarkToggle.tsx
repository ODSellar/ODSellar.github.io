'use client';

import { useTheme } from 'next-themes';
import { ReactElement, useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function LightDarkToggle(): ReactElement | null {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div
      className=" absolute top-0 right-0 m-5 flex bg-stone-700 dark:bg-stone-100 text-stone-200 dark:text-stone-700 p-1 rounded-full"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <div className=" absolute h-5 w-5 -m-0.5 rounded-full bg-stone-200 dark:bg-stone-700 dark:ml-4 duration-300" />
      <FiSun />
      <div className=" p-0.5" />
      <FiMoon />
    </div>
  );
}
