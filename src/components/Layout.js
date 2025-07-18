import './Layout.css';

const Layout = ({ children, darkMode = false }) => {
  return (
    <div className={`layout ${darkMode ? 'layout--dark' : 'layout--light'}`}>
      {children}
    </div>
  );
};

export default Layout; 