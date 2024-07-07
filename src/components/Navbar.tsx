import React from 'react';
import { BsGithub } from 'react-icons/bs';
import QueriesDrawer from './Queries/QueriesDrawer';
import ThemeSwitch from './ThemeSwitch';
import Image from 'next/image';

interface NavbarProps {
  usePredefinedQuery: (value: string) => void;
  setValue: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ usePredefinedQuery, setValue }) => {
  return (
    <div className="flex items-start justify-between p-2 w-full border-b border-neutral-300 bg-white dark:bg-gray-800">
      <div className="flex gap-2 items-center justify-center">
        <QueriesDrawer
          usePredefinedQuery={usePredefinedQuery}
          displayText={false}
          setValue={setValue}
          
        />
        <Image src="/logo.png" alt="SQL Online Editor" className='w-36' width={1000} height={1000} />
      </div>

      <div className="flex space-x-4">
        <a
          href="https://github.com/janvi01/sql-editor"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github Link"
          className="text-white"
        >
          <BsGithub size={24} />
        </a>
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Navbar;
