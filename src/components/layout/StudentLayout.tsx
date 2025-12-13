import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Gamepad2, 
  ClipboardList, 
  Trophy, 
  BarChart3, 
  User,
  Target,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { XPBadge, CoinBadge, StreakBadge } from '@/components/game/GameBadges';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/student/dashboard' },
  { icon: Gamepad2, label: 'Game World', href: '/student/game' },
  { icon: ClipboardList, label: 'My Tests', href: '/student/tests' },
  { icon: Target, label: 'Weak Areas', href: '/student/weak-tests' },
  { icon: Trophy, label: 'Leaderboard', href: '/student/leaderboard' },
  { icon: BarChart3, label: 'Analytics', href: '/student/analytics' },
  { icon: User, label: 'Profile', href: '/student/profile' },
];

// Mock student stats - will be replaced with real data
const mockStats = {
  xp: 2450,
  level: 12,
  coins: 350,
  streak: 7,
};

export function StudentNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <>
      {/* Main Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-card/95 backdrop-blur-sm border-b border-border z-50">
        <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/student/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-game-gold to-game-star flex items-center justify-center shadow-pixel">
              <span className="text-primary-foreground font-pixel text-xs">TQ</span>
            </div>
            <span className="font-game font-bold text-xl hidden sm:block">TestQuest</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon size={18} />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Stats & User */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <XPBadge xp={mockStats.xp} level={mockStats.level} size="sm" />
              <CoinBadge coins={mockStats.coins} size="sm" />
              <StreakBadge days={mockStats.streak} size="sm" />
            </div>

            {/* User Avatar */}
            <Link 
              to="/student/profile"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-game-pipe to-game-pipe-dark flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
            >
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt={user.full_name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-white font-bold">{user?.full_name?.charAt(0) || 'S'}</span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-card shadow-xl animate-slide-in-right">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="font-game font-bold text-lg">Menu</span>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} />
              </Button>
            </div>

            {/* Stats */}
            <div className="p-4 border-b border-border space-y-2">
              <XPBadge xp={mockStats.xp} level={mockStats.level} />
              <div className="flex gap-2">
                <CoinBadge coins={mockStats.coins} />
                <StreakBadge days={mockStats.streak} />
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut size={18} />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface StudentLayoutProps {
  children: ReactNode;
}

export function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <StudentNavbar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
