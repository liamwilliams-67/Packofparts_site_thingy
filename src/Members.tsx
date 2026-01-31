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
  Calendar,
  FileText,
  Shield,
  BookOpen,
  Award,
  Download,
  ExternalLink,
  Clock,
  AlertTriangle,
  CheckCircle,
  Linkedin
} from 'lucide-react';
import './Members.css';

function Members() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setScrollY] = useState(0);

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

  return (
    <div className="min-h-screen bg-white">
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

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-navy pt-20">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 hero-gradient" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-custom text-center px-4 py-20">
          <div 
            className="animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="inline-block text-light-blue font-orbitron text-sm md:text-base tracking-widest mb-4">
              TEAM RESOURCES
            </span>
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-4 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            For <span className="text-gradient">Members</span>
          </h1>
          
          <p 
            className="text-white/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            Essential resources, documents, and information for Pack of Parts team members
          </p>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: 'Meeting Calendar',
                icon: Calendar,
                description: 'View upcoming meetings and events',
                href: '#calendar'
              },
              {
                title: 'Team Handbook',
                icon: BookOpen,
                description: 'Read our complete team handbook',
                href: '#handbook'
              },
              {
                title: 'Safety Resources',
                icon: Shield,
                description: 'Safety guidelines and protocols',
                href: '#safety'
              }
            ].map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="reveal quick-link-card group"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="p-6">
                  <link.icon className="w-10 h-10 text-light-blue mb-4" />
                  <h3 className="text-navy font-orbitron font-semibold text-xl mb-2 group-hover:text-light-blue transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-gray-600">
                    {link.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Essential Documents Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
              Essential Documents
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Important resources and guides for all team members
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'STIMS',
                icon: FileText,
                description: 'The process of joining our team. This guides you through being officially registered with FIRST.',
                link: '#',
                badge: 'Required'
              },
              {
                title: 'Team Handbook',
                icon: BookOpen,
                description: 'Our Team Handbook outlines the expectations for all users and is a helpful resource for all new members.',
                link: '#',
                badge: 'Essential'
              },
              {
                title: 'Safety Notes',
                icon: AlertTriangle,
                description: 'Safety is an integral part of our team. This document details each machine in our shop and how to be safe around them.',
                link: '#',
                badge: 'Required'
              },
              {
                title: 'Safety Plan',
                icon: Shield,
                description: 'Here at Pack of Parts, we take safety very seriously. Here is our safety plan so we can always make sure that you are safe.',
                link: '#',
                badge: 'Important'
              },
              {
                title: 'Our Constitution',
                icon: Award,
                description: 'Our Constitution outlines our values and principles. We will strive to follow these principles to further our Gracious Professionalism.',
                link: '#',
                badge: 'Core'
              },
              {
                title: 'Our Bylaws',
                icon: FileText,
                description: 'Our Bylaws outline our detailed rules and regulations. This is our in-depth guide to running our club.',
                link: '#',
                badge: 'Core'
              }
            ].map((doc, index) => (
              <div 
                key={index}
                className="reveal document-card"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-full bg-light-blue/10 flex items-center justify-center">
                    <doc.icon className="w-7 h-7 text-light-blue" />
                  </div>
                  <span className="px-3 py-1 bg-light-blue/10 text-navy text-xs font-semibold rounded-full">
                    {doc.badge}
                  </span>
                </div>
                <h3 className="text-navy font-orbitron font-semibold text-xl mb-3">
                  {doc.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {doc.description}
                </p>
                <a 
                  href={doc.link}
                  className="inline-flex items-center gap-2 text-light-blue font-semibold hover:gap-3 transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meeting Calendar Section */}
      <section id="calendar" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
              Meeting Calendar
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay up to date with team meetings, events, and important dates
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="reveal calendar-embed-card">
              <div className="text-center py-16">
                <Calendar className="w-20 h-20 text-light-blue mx-auto mb-6" />
                <h3 className="text-2xl font-orbitron font-bold text-navy mb-4">
                  Team Calendar
                </h3>
                <p className="text-gray-600 mb-6">
                  View our full team calendar with all meetings, competitions, and events
                </p>
                <a 
                  href="#"
                  className="btn-primary-light inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  View Calendar
                </a>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="reveal meeting-info-card" style={{ transitionDelay: '0.1s' }}>
                <Clock className="w-8 h-8 text-light-blue mb-4" />
                <h3 className="text-navy font-orbitron font-semibold text-xl mb-3">
                  Build Season
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p><strong>January - February</strong></p>
                  <p>Monday - Saturday</p>
                  <p>3:00 PM - 8:00 PM</p>
                </div>
              </div>

              <div className="reveal meeting-info-card" style={{ transitionDelay: '0.2s' }}>
                <Clock className="w-8 h-8 text-light-blue mb-4" />
                <h3 className="text-navy font-orbitron font-semibold text-xl mb-3">
                  Off-Season
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p><strong>September - December</strong></p>
                  <p>Tuesday & Thursday</p>
                  <p>3:30 PM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Links Section */}
      <section className="section-padding bg-navy">
        <div className="container-custom">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-white mb-4">
              Important <span className="text-gradient">Links</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Quick access to frequently used resources and platforms
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Chief Delphi',
                description: 'FRC community forum',
                icon: ExternalLink,
                href: 'https://www.chiefdelphi.com'
              },
              {
                title: 'GitHub',
                description: 'Team code repository',
                icon: Github,
                href: '#'
              },
              {
                title: 'Drive Team',
                description: 'Google Drive folders',
                icon: ExternalLink,
                href: '#'
              },
              {
                title: 'Slack',
                description: 'Team communication',
                icon: ExternalLink,
                href: '#'
              }
            ].map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal important-link-card group"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <link.icon className="w-8 h-8 text-light-blue mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-orbitron font-semibold text-lg mb-2">
                  {link.title}
                </h3>
                <p className="text-white/70 text-sm">
                  {link.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* New Member Checklist */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 reveal">
              <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-navy mb-4">
                New Member Checklist
              </h2>
              <p className="text-gray-600">
                Complete these steps to get started as a Pack of Parts member
              </p>
            </div>

            <div className="space-y-4">
              {[
                'Complete STIMS registration process',
                'Read the Team Handbook thoroughly',
                'Review all Safety Notes and complete safety training',
                'Sign the Safety Plan acknowledgment',
                'Read the Constitution and Bylaws',
                'Join team Slack workspace',
                'Set up access to team Google Drive',
                'Attend new member orientation',
                'Get your team t-shirt and safety glasses',
                'Meet with sub-team leads to find your role'
              ].map((item, index) => (
                <div 
                  key={index}
                  className="reveal checklist-item"
                  style={{ transitionDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-light-blue flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy pt-16 pb-8 border-t border-white/10">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Logo & Tagline */}
            <div className="lg:col-span-2 reveal">
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
            <div className="reveal" style={{ transitionDelay: '0.1s' }}>
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
            <div className="reveal" style={{ transitionDelay: '0.2s' }}>
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

export default Members;
