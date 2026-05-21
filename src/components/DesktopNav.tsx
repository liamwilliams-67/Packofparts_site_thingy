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
    { name: 'Join The Club',  href: '/join' },
    { name: 'For Members',    href: '/members' },
    { name: 'Donate',         href: '/donate' },
    { name: 'Contact Us',     href: '/contact' },
    { name: 'Summer Camps',   href: '/summer-camps' },
  ];

  return (
    <div className="container-custom pt-4 pb-0">
      <div
        className="nav-glass rounded-pill px-4 md:px-8 py-3 flex items-center justify-between"
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.08)' }}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Pack of Parts Logo"
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <span className="hidden sm:block text-white font-orbitron font-bold text-sm md:text-base tracking-wide transition-colors duration-200 group-hover:text-light-blue">
            Pack of Parts
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`
                  relative px-3 xl:px-4 py-2 rounded-full
                  text-xs xl:text-sm font-semibold uppercase tracking-wide
                  transition-all duration-200
                  ${isActive
                    ? 'text-light-blue bg-light-blue/10'
                    : 'text-white/85 hover:text-light-blue hover:bg-white/5'
                  }
                `}
              >
                {link.name}
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-light-blue" />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-white p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>
  );
}
