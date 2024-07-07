import React from 'react';
import { BsGithub } from 'react-icons/bs';
import QueriesDrawer from './Queries/QueriesDrawer';
import ThemeSwitch from './ThemeSwitch';

interface NavbarProps {
  usePredefinedQuery: (value: string) => void;
  setValue: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ usePredefinedQuery, setValue }) => {
  return (
    <div className="flex items-start justify-between p-2 w-full bg-teal-500 dark:bg-gray-800">
      <div className="flex gap-2 items-center justify-center">
        <QueriesDrawer
          usePredefinedQuery={usePredefinedQuery}
          displayText={false}
          setValue={setValue}
        />
        <h1 className="text-black dark:text-white text-xl font-bold">
          SQL Online Editor
        </h1>
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
