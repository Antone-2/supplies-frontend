import React, { useState } from 'react';
import Sidebar from './Sidebar_enhanced';

interface AdminLayoutProps {
    children?: React.ReactNode;
    activeSection?: string;
    title?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
    children,
    activeSection = 'dashboard',
    title = 'Admin Panel'
}) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [currentActiveSection, setCurrentActiveSection] = useState(activeSection);

    const handleSetActiveSection = (section: string) => {
        setCurrentActiveSection(section);
    };

    return (
        <div className="relative min-h-screen bg-gray-50 font-['Roboto']">
            {/* Fixed Sidebar */}
            <div className="fixed left-0 top-0 z-50 h-full">
                <Sidebar
                    activeSection={currentActiveSection}
                    setActiveSection={handleSetActiveSection}
                    sections={[]}
                    isCollapsed={sidebarCollapsed}
                    onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                />
            </div>

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-500 ${sidebarCollapsed ? 'ml-20' : 'ml-72'}`}>
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
