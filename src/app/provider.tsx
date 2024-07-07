// provider.tsx
'use client';
import { ThemeProvider } from 'next-themes';
import React, { useEffect, useState, ReactNode } from 'react';

const Provider = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default Provider;
