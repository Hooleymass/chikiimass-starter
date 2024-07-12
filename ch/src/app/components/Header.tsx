'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ExternalSidebar from './SideBar/ExternalSideBar';
import { Menu } from 'lucide-react';

const Header = () => {
    const [isExternalSidebarOpen, setIsExternalSidebarOpen] = useState(false);
    const pathname = usePathname();
  
    const toggleExternalSidebar = () => {
      setIsExternalSidebarOpen(!isExternalSidebarOpen);
    };
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (isExternalSidebarOpen && !(event.target as Element).closest('.external-sidebar')) {
          setIsExternalSidebarOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isExternalSidebarOpen]);
  
    return (
      <header className="sticky top-0 w-full  p-4 z-10">
        <button onClick={toggleExternalSidebar} >
          <Menu size={24} />
        </button>
        {/* External Sidebar */}
        <ExternalSidebar isOpen={isExternalSidebarOpen} toggleSidebar={toggleExternalSidebar} />
      </header>
    );
};

export default Header;