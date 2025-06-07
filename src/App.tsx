import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import EditorPanel from './components/EditorPanel';
import UserProfilePage from './components/profile/UserProfilePage';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <HeroUIProvider>
      <Router>
        <div className="min-h-screen bg-background dark">
          <Navbar onMenuClick={toggleSidebar} />
          <Routes>
            <Route path="/" element={
              <div className="relative flex">
                {/* Backdrop */}
                {isSidebarOpen && (
                  <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
                    onClick={closeSidebar}
                  />
                )}
                
                {/* Sidebar */}
                <div 
                  className={`fixed lg:static inset-y-0 left-0 z-40 w-[80vw] md:w-[350px] transform transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                  }`}
                >
                  <Sidebar onClose={closeSidebar} />
                </div>

                {/* Main Content */}
                <main className="flex-1 p-6 lg:pl-6">
                  <EditorPanel />
                </main>
              </div>
            } />
            <Route path="/profile" element={<UserProfilePage />} />
          </Routes>
        </div>
      </Router>
    </HeroUIProvider>
  );
}

export default App;