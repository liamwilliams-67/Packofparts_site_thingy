import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function DesktopNav({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
}) {
  const { pathname } = useLocation();
  const navLinks = [
    { name: 'Join The Club', href: '/join' },
    { name: 'For Members', href: '/members' },
    { 
      name: 'Meet the Team', 
      href: '/meet-the-team'
    },
    { name: 'Donate', href: '/donate' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Summer Camps', href: '/summer-camps' },
  ];
  return (
    <div className="container-custom pt-4 pb-0">
      <div className="nav-glass rounded-pill px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Pack of Parts Logo" className="h-10 w-auto" />
          <span className="hidden sm:block text-white font-orbitron font-bold text-sm md:text-base">Pack of Parts</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs xl:text-sm font-semibold uppercase tracking-wide link-underline transition-colors duration-200 ${
                  isActive ? 'text-light-blue' : 'text-white/90 hover:text-light-blue'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-white p-3 min-w-[48px] min-h-[48px] flex items-center justify-center">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>
  );
}
