import { useEffect, useState } from 'react';
import { 
  Mail, 
  MapPin, 
  School, 
  Users, 
  Instagram,
  Facebook,
  Youtube,
  Github,
  Menu,
  X,
  Home,
  Search,
  ArrowLeft,
  Linkedin,
  AlertCircle
} from 'lucide-react';
import './NotFound.css';

function NotFound() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Join The Club', href: '/join' },
    { name: 'For Members', href: '/members' },
    { name: 'Community', href: '/community' },
    { name: 'Donate', href: '/donate' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Summer Camps', href: '/summer-camps' },
  ];

  // Scroll handler for nav visibility
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsNavVisible(window.scrollY > 100 || window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <div className="container-custom py-4">
          <div className="nav-glass rounded-pill px-4 md:px-8 py-3 flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Pack of Parts Logo" 
                className="h-10 w-auto"
              />
              <span className="hidden sm:block text-white font-orbitron font-bold text-sm md:text-base">
                Pack of Parts
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/90 hover:text-light-blue text-xs xl:text-sm font-semibold uppercase tracking-wide link-underline transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden fixed inset-0 top-20 bg-navy/95 backdrop-blur-lg transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
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
            ))}
          </div>
        </div>
      </nav>

      {/* 404 Content */}
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-navy via-navy to-light-blue/20 pt-20">
        <div className="container-custom px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Animated 404 */}
            <div className="relative mb-8">
              <div className="text-[200px] md:text-[280px] font-orbitron font-bold leading-none error-number">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <AlertCircle className="w-20 h-20 md:w-32 md:h-32 text-light-blue animate-pulse" />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-white mb-6">
              Page <span className="text-gradient">Not Found</span>
            </h1>
            
            <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Looks like this page got lost in the robot parts bin! 
              The page you're looking for doesn't exist or has been moved.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a 
                href="/"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </a>
              <a 
                href="/contact"
                className="px-8 py-3 border-2 border-light-blue text-light-blue font-semibold rounded-pill transition-all duration-300 hover:bg-light-blue hover:text-navy inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Contact Us
              </a>
            </div>

            {/* Quick Links */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-white font-orbitron font-semibold text-xl mb-6">
                Looking for something? Try these pages:
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: 'Join The Team', href: '/join', icon: Users },
                  { name: 'For Members', href: '/members', icon: School },
                  { name: 'Community', href: '/community', icon: Users },
                  { name: 'Summer Camps', href: '/summer-camps', icon: School },
                  { name: 'Donate', href: '/donate', icon: Mail },
                  { name: 'Contact', href: '/contact', icon: Mail },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="quick-link group"
                  >
                    <link.icon className="w-5 h-5 text-light-blue group-hover:scale-110 transition-transform" />
                    <span className="text-white/90 group-hover:text-light-blue transition-colors">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-navy/95 pt-16 pb-8 border-t border-white/10">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Logo & Tagline */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="/logo.png" 
                  alt="Pack of Parts Logo" 
                  className="h-16 w-auto"
                />
                <div>
                  <h3 className="text-white font-orbitron font-bold text-xl">
                    Pack of Parts
                  </h3>
                  <p className="text-light-blue text-sm">FRC Team 1294</p>
                </div>
              </div>
              <p className="text-white/70 mb-6 max-w-md">
                Building robots. Building futures. Inspiring the next generation of STEM leaders 
                in Sammamish, Washington.
              </p>
              
              {/* Social Icons */}
              <div className="flex gap-4">
                {[
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Youtube, href: '#', label: 'YouTube' },
                  { icon: Github, href: '#', label: 'GitHub' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:contact@packofparts.org', label: 'Email' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="social-icon w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-light-blue"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-orbitron font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-light-blue transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-orbitron font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-light-blue mt-0.5" />
                  <div>
                    <p className="text-white/70">contact@packofparts.org</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-light-blue mt-0.5" />
                  <div>
                    <p className="text-white/70">Sammamish, Washington</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <School className="w-5 h-5 text-light-blue mt-0.5" />
                  <div>
                    <p className="text-white/70">Eastlake High School</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-light-blue mt-0.5" />
                  <div>
                    <p className="text-white/70">5 Schools Represented</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/50 text-sm">
              &copy; {new Date().getFullYear()} Pack of Parts (FRC 1294). All rights reserved.
            </p>
            <p className="text-white/30 text-xs mt-2">
              Made with ❤️ and lots of ☕
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default NotFound;
