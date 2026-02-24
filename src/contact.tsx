import { useEffect, useState } from 'react';
import { 
  Mail, 
  MapPin, 
  School, 
  Instagram,
  Facebook,
  Youtube,
  Github,
  Clock,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Linkedin
} from 'lucide-react';
import './contact.css';

function Contact() {
  // Initialize nav visible as true so it doesn't pop in weirdly
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setScrollY] = useState(0);
  const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);

  // Updated links to match App.tsx structure
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Join The Club', href: '/join' },
    { name: 'For Members', href: '/members' },
    { 
      name: 'Community', 
      href: '/community',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Meet the Team', href: '/community/meet-the-team' },
        { name: 'STEM Kits', href: '/community/stem-kits' },
        { name: 'Recycling Initiative', href: '/community/recycling' }
      ]
    },
    { name: 'Donate', href: '/donate' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Summer Camps', href: '/summer-camps' },
  ];

  useEffect(() => {
    document.title = 'Contact | Pack of Parts';
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Consistent scroll behavior with App.tsx
      setIsNavVisible(window.scrollY > 100 || window.scrollY < 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to route
      window.location.href = href;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Matches App.tsx EXACTLY */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <div className="container-custom pt-4 pb-0">
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
                link.hasDropdown ? (
                  <div 
                    key={link.name}
                    className="relative flex items-center"
                    onMouseEnter={() => setIsCommunityDropdownOpen(true)}
                    onMouseLeave={() => setIsCommunityDropdownOpen(false)}
                  >
                    <a
                      href={link.href}
                      className="text-white/90 hover:text-light-blue text-xs xl:text-sm font-semibold uppercase tracking-wide link-underline transition-colors duration-200 inline-flex items-center gap-1"
                    >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCommunityDropdownOpen ? 'rotate-180' : ''}`} />
                    </a>
                    {/* Dropdown Menu */}
                    <div className={`absolute top-full left-0 mt-2 py-2 bg-navy/95 backdrop-blur-lg rounded-lg shadow-xl border border-white/10 min-w-[200px] transition-all duration-200 ${isCommunityDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                      {link.dropdownItems?.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-white/90 hover:text-light-blue hover:bg-white/5 text-sm font-medium transition-colors duration-200"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-white/90 hover:text-light-blue text-xs xl:text-sm font-semibold uppercase tracking-wide link-underline transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                )
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
          className={`lg:hidden fixed inset-0 top-20 transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="flex flex-col items-center justify-start h-full px-4 pt-6">
            <div className="nav-glass w-full max-w-xs rounded-3xl px-8 py-8 flex flex-col items-center gap-6">
              {navLinks.map((link, index) => (
                link.hasDropdown ? (
                  <div key={link.name} className="flex flex-col items-center gap-2">
                    <a
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white text-xl font-orbitron font-semibold hover:text-light-blue transition-colors duration-200"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      {link.name}
                    </a>
                    <div className="flex flex-col items-center gap-2">
                      {link.dropdownItems?.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-white/70 text-sm font-medium hover:text-light-blue transition-colors duration-200"
                        >
                          → {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
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
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Reduced height for sub-page */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-navy pt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative z-10 container-custom text-center px-4 py-20">
          <div 
            className="animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="inline-block text-light-blue font-orbitron text-sm md:text-base tracking-widest mb-4">
              GET IN TOUCH
            </span>
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-4 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            Contact <span className="text-gradient">Us</span>
          </h1>
          
          <p 
            className="text-white/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            Have questions about joining our team, sponsorship opportunities, or anything else? 
            We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Content Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-[52.5rem] mx-auto">
            
            {/* Contact Details */}
            <div>
              <div className="space-y-6">
                
                {/* Email Card */}
                <div className="reveal contact-card">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-light-blue/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-light-blue" />
                    </div>
                    <div>
                      <h3 className="text-navy font-orbitron font-semibold text-lg mb-1">Email Us</h3>
                      <a 
                        href="mailto:info@packofparts.org" 
                        className="text-gray-600 hover:text-light-blue transition-colors duration-200"
                      >
                        info@packofparts.org
                      </a>
                      <p className="text-gray-500 text-sm mt-1">Mentors: <a href="mailto:mentors@packofparts.org" className="hover:text-light-blue transition-colors duration-200">mentors@packofparts.org</a></p>
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="reveal contact-card" style={{ transitionDelay: '0.1s' }}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-light-blue/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-light-blue" />
                    </div>
                    <div>
                      <h3 className="text-navy font-orbitron font-semibold text-lg mb-1">Location</h3>
                      <p className="text-gray-600">Eastlake High School</p>
                      <p className="text-gray-600">400 228th AVE NE</p>
                      <p className="text-gray-600">Sammamish, WA 98074</p>
                      <p className="text-gray-500 text-sm mt-1">Shop: Room D-125 (back of school)</p>
                    </div>
                  </div>
                  <div className="w-full rounded-2xl overflow-hidden border-2 border-light-blue/20 shadow-md">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=PLACEHOLDER_EMBED_URL"
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Eastlake High School Location"
                    />
                  </div>
                </div>

                {/* School Card */}
                <div className="reveal contact-card" style={{ transitionDelay: '0.2s' }}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-light-blue/10 flex items-center justify-center">
                      <School className="w-6 h-6 text-light-blue" />
                    </div>
                    <div>
                      <h3 className="text-navy font-orbitron font-semibold text-lg mb-1">Home School</h3>
                      <p className="text-gray-600">Eastlake High School</p>
                    </div>
                  </div>
                </div>

                {/* Meeting Times */}
                <div className="reveal contact-card" style={{ transitionDelay: '0.3s' }}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-light-blue/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-light-blue" />
                    </div>
                    <div>
                      <h3 className="text-navy font-orbitron font-semibold text-lg mb-1">Meeting Times</h3>
                      <p className="text-gray-600 font-semibold mt-1">Build Season (January – February)</p>
                      <p className="text-gray-600 text-sm">Monday, Wednesday, Friday, Saturday</p>
                      <p className="text-gray-600 text-sm">Mon – Fri: 6:00 – 8:45 PM</p>
                      <p className="text-gray-600 text-sm">Saturday: 10:00 AM – 5:00 PM</p>
                      <p className="text-gray-600 font-semibold mt-2">Off-Season (September – December)</p>
                      <p className="text-gray-600 text-sm">Monday, Wednesday</p>
                      <p className="text-gray-600 text-sm">6:00 – 8:45 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="reveal mt-12" style={{ transitionDelay: '0.4s' }}>
                <h3 className="text-navy font-orbitron font-semibold text-xl mb-6">
                  Connect With Us
                </h3>
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: Instagram, href: 'https://www.instagram.com/packofparts', label: 'Instagram' },
                    { icon: Facebook, href: 'https://www.facebook.com/packofparts', label: 'Facebook' },
                    { icon: Youtube, href: 'https://youtube.com/@packofparts', label: 'YouTube' },
                    { icon: Linkedin, href: 'https://linkedin.com/company/packofparts', label: 'LinkedIn' },
                    { icon: Github, href: 'https://github.com/packofparts', label: 'GitHub' },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="social-icon w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                  <a
                    href="https://www.chiefdelphi.com/u/1294_pack_of_parts/summary"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon group relative w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center hover:bg-navy transition-all duration-300"
                    aria-label="ChiefDelphi"
                  >
                    <img src="/chiefdelphi-logo-navy.svg" alt="" aria-hidden="true" className="w-8 h-8 transition-opacity duration-300 opacity-100 group-hover:opacity-0" />
                    <img src="/chiefdelphi-logo.svg" alt="" aria-hidden="true" className="w-8 h-8 absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Reusing App.tsx footer styles */}
      <footer id="contact" className="bg-navy pt-16 pb-8 border-t border-white/10">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2 reveal">
              <div className="flex items-center gap-4 mb-4">
                <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
                <div>
                  <h3 className="text-white font-orbitron font-bold text-xl">Pack of Parts</h3>
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
                  { icon: Instagram, href: 'https://www.instagram.com/packofparts', label: 'Instagram' },
                  { icon: Facebook, href: 'https://www.facebook.com/packofparts', label: 'Facebook' },
                  { icon: Youtube, href: 'https://youtube.com/@packofparts', label: 'YouTube' },
                  { icon: Linkedin, href: 'https://linkedin.com/company/packofparts', label: 'Linkedin' },
                  { icon: Github, href: 'https://github.com/packofparts', label: 'Github' },
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
                <a
                  href="https://www.chiefdelphi.com/u/1294_pack_of_parts/summary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-light-blue"
                  aria-label="ChiefDelphi"
                >
                  <img src="/chiefdelphi-logo.svg" alt="ChiefDelphi" className="w-7 h-7" />
                </a>
              </div>
            </div>
            
            <div className="reveal">
              <h4 className="text-white font-orbitron font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.filter(link => !link.hasDropdown).map((link) => (
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
                <li>
                  <a href="/community" className="text-white/70 hover:text-light-blue transition-colors duration-200 flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    Community
                  </a>
                </li>
                <li>
                  <a href="/community/meet-the-team" className="text-white/70 hover:text-light-blue transition-colors duration-200 pl-4">
                    → Meet the Team
                  </a>
                </li>
                <li>
                  <a href="/community/stem-kits" className="text-white/70 hover:text-light-blue transition-colors duration-200 pl-4">
                    → STEM Kits
                  </a>
                </li>
                <li>
                  <a href="/community/recycling" className="text-white/70 hover:text-light-blue transition-colors duration-200 pl-4">
                    → Recycling Initiative
                  </a>
                </li>
              </ul>
            </div>

            <div className="reveal">
              <h4 className="text-white font-orbitron font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-light-blue mt-0.5" />
                  <div>
                    <p className="text-white/70">info@packofparts.org</p>
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
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Pack of Parts (FRC 1294). All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
