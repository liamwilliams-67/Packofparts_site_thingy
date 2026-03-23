export default function MobileNav({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
}) {
    const navLinks = [
      { name: 'Join The Club', href: '/join' },
      { name: 'For Members', href: '/members' },
      { 
        name: 'Meet the Team', 
        href: '/meet-the-team'
      },
      { name: 'Donate', href: '/donate' },
      { name: 'Contact Us', href: '/contact' },  // Change this from '#contact' to '/contact'
      { name: 'Summer Camps', href: '/summer-camps' },
    ];

  return (
    <div className={`lg:hidden fixed inset-0 top-20 bg-navy/95 backdrop-blur-sm transition-all duration-300 z-40 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className="flex flex-col items-center justify-start h-full px-4 pt-6">
        <div className="nav-glass w-full max-w-xs rounded-3xl px-8 py-8 flex flex-col items-center gap-6">
          {navLinks.map((link, index) => (

              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white text-xl font-orbitron font-semibold hover:text-light-blue transition-colors duration-200"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {link.name}
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}
