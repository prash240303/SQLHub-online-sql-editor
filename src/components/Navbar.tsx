import React from 'react';
import { BsGithub } from 'react-icons/bs';
import QueriesDrawer from './Queries/QueriesDrawer';
import ThemeSwitch from './ThemeSwitch';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

interface NavbarProps {
  usePredefinedQuery: (value: string) => void;
  setValue: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ usePredefinedQuery, setValue }) => {
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-between p-2 w-full border-b border-neutral-300 bg-white dark:bg-gray-800">
      <div className="flex gap-2 items-center justify-center">
        <QueriesDrawer
          usePredefinedQuery={usePredefinedQuery}
          displayText={false}
          setValue={setValue}
        />
        <Image
          src={theme === 'dark' ? '/logo_dark.png' : '/logo.png'}
          alt="SQL Online Editor"
          className='w-36'
          width={1000}
          height={1000}
        />
      </div>

      <div className="flex space-x-4">
        <Link href="https://github.com/prash240303/sql-editor-nextjs">
          <BsGithub size={24} />
        </Link>

        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Navbar;
