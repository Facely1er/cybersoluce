import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        {/* Navigation */}
        <Navbar />
        
        {/* Main content area */}
        <main className="flex-1">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
  );
};

export default Layout;