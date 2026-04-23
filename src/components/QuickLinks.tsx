import { ChevronRight } from 'lucide-react';

export default function QuickLinks({
  scrollToSection,
}: {
  scrollToSection: (href: string) => void;
}) {
    const navLinks = [
      { name: 'Join The Club', href: '/join' },
      { name: 'For Members', href: '/members' },
      { name: 'Donate', href: '/donate' },
      { name: 'Contact Us', href: '/contact' },  // Change this from '#contact' to '/contact'
      { name: 'Summer Camps', href: '/summer-camps' },
    ];
  return (
    <div className="reveal" style={{ transitionDelay: '0.1s' }}>
      <h4 className="text-white font-orbitron font-semibold mb-4">Quick Links</h4>
      <ul className="space-y-3">
        {navLinks.map((link) => (
          <li key={link.name}>
            <button
              onClick={() => scrollToSection(link.href)}
              className="text-white/70 hover:text-light-blue transition-colors duration-200 flex items-center gap-2 group"
            >
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              {link.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
