import { ReactNode } from 'react';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
  role: 'admin' | 'mentor';
}

export function AdminLayout({ children, role }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-admin-gradient">
      <AdminSidebar role={role} />
      <main className="ml-64 min-h-screen transition-all duration-300">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
