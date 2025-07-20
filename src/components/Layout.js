import { useEffect } from 'react';
import { setupSidebarBalancing } from '../util';
import './Layout.css';

const Layout = ({ children, darkMode = false, leftSidebar, rightSidebar }) => {
  // Set up automatic sidebar width balancing
  useEffect(() => {
    const cleanup = setupSidebarBalancing();
    return cleanup;
  }, [leftSidebar]); // Re-run when left sidebar content changes
  return (
    <div className={`layout ${darkMode ? 'layout--dark' : 'layout--light'}`}>
      {/* Left sidebar container */}
      {leftSidebar && (
        <div className="layout__left-sidebar">
          {leftSidebar}
        </div>
      )}
      
      {/* Right sidebar container */}
      {rightSidebar && (
        <div className="layout__right-sidebar">
          {rightSidebar}
        </div>
      )}
      
      {/* Main content */}
      {children}
    </div>
  );
};

export default Layout; 