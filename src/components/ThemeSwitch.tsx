'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Switch } from './ui/switch';
import { FiSun, FiMoon } from 'react-icons/fi'; // Import icons

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setMounted(true);
    setChecked(theme === 'dark');
  }, [theme]);

  if (!mounted) return null;

  const toggleTheme = () => {
    const newTheme = checked ? 'light' : 'dark';
    setTheme(newTheme);
    setChecked(!checked);
  };

  return (
    <div className="flex items-center space-x-2">
      <FiSun className={`text-lg ${!checked ? 'text-yellow-500' : 'text-gray-500'}`} />
      <Switch 
        id="theme-switch" 
        checked={checked} 
        onCheckedChange={toggleTheme} 
      />
      <FiMoon className={`text-lg ${checked ? 'text-blue-500' : 'text-gray-500'}`} />
    </div>
  );
};

export default ThemeSwitch;
