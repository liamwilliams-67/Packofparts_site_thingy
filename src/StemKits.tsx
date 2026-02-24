import { useEffect, useState } from 'react';
import { 
  Mail, 
  MapPin, 
  School, 
  Instagram,
  Facebook,
  Youtube,
  Github,
  Menu,
  X,
  BookOpen,
  Rocket,
  GraduationCap,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Target,
  Sparkles,
  DollarSign,
  Linkedin
} from 'lucide-react';
import './StemKits.css';

function StemKits() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setScrollY] = useState(0);
  const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);

  // Navigation links
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
    document.title = 'STEM Kits | Pack of Parts';
  }, []);

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
      {/* Navigation */}
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
              STEMUNBOXED
            </span>
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-4 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            STEM <span className="text-gradient">Kits</span>
          </h1>
          
          <p 
            className="text-white/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            Providing affordable and accessible STEM enrichment through engaging, 
            hands-on educational kits for elementary school students.
          </p>
        </div>
      </section>

      {/* About STEMUnboxed Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <span className="text-light-blue font-orbitron text-sm tracking-widest uppercase mb-4 block">
                Our Initiative
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-6">
                What is STEMUnboxed?
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  STEMUnboxed is Pack of Parts' initiative to bring engaging STEM education 
                  activities directly to elementary school students. Our kits are designed 
                  to immerse young learners in scientific concepts through interactive, 
                  hands-on experiences.
                </p>
                <p>
                  Each kit is carefully aligned with Next Generation Science Standards (NGSS), 
                  making them perfect for classroom integration. Teachers can easily incorporate 
                  our activities into their existing curriculum to enhance student learning.
                </p>
                <p>
                  We believe every student deserves access to quality STEM education. That's why 
                  our kits are designed to be cost-effective alternatives to commercial options, 
                  making hands-on science accessible to schools and families with any budget.
                </p>
              </div>
            </div>

            <div className="reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="stem-kit-card p-6">
                  <GraduationCap className="w-12 h-12 text-light-blue mb-4" />
                  <h3 className="text-navy font-orbitron font-semibold text-lg mb-2">NGSS Aligned</h3>
                  <p className="text-gray-600 text-sm">Meets Next Generation Science Standards</p>
                </div>
                <div className="stem-kit-card p-6">
                  <Sparkles className="w-12 h-12 text-light-blue mb-4" />
                  <h3 className="text-navy font-orbitron font-semibold text-lg mb-2">Hands-On Learning</h3>
                  <p className="text-gray-600 text-sm">Interactive experiences that spark curiosity</p>
                </div>
                <div className="stem-kit-card p-6">
                  <BookOpen className="w-12 h-12 text-light-blue mb-4" />
                  <h3 className="text-navy font-orbitron font-semibold text-lg mb-2">Curriculum Ready</h3>
                  <p className="text-gray-600 text-sm">Easy to incorporate into classroom teaching</p>
                </div>
                <div className="stem-kit-card p-6">
                  <DollarSign className="w-12 h-12 text-light-blue mb-4" />
                  <h3 className="text-navy font-orbitron font-semibold text-lg mb-2">Cost Effective</h3>
                  <p className="text-gray-600 text-sm">Affordable alternative to commercial kits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
              Our Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Engaging STEM kits designed specifically for elementary school students
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Crazy Catapult Kit */}
            <div className="reveal kit-type-card">
              <div className="p-8">
                <div className="w-16 h-16 rounded-full bg-light-blue/10 flex items-center justify-center mb-6">
                  <Rocket className="w-8 h-8 text-light-blue" />
                </div>
                <span className="text-xs font-semibold text-light-blue uppercase tracking-wide">
                  Available Now
                </span>
                <h3 className="text-navy font-orbitron font-bold text-2xl mb-4 mt-2">
                  Crazy Catapult STEM Kit
                </h3>
                <p className="text-gray-600 mb-6">
                  An exciting STEM kit that introduces students to fundamental physics concepts 
                  through the hands-on experience of building and launching their own catapult! 
                  Students learn about projectile motion, force, and energy transfer while having 
                  a blast with their creations.
                </p>
                <ul className="space-y-2">
                  {['Physics Concepts', 'Hands-On Building', 'Launching Activities', 'NGSS Aligned'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-light-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Coming Soon */}
            <div className="reveal kit-type-card" style={{ transitionDelay: '0.1s' }}>
              <div className="p-8">
                <div className="w-16 h-16 rounded-full bg-light-blue/10 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-light-blue" />
                </div>
                <span className="text-xs font-semibold text-light-blue uppercase tracking-wide">
                  Coming Soon
                </span>
                <h3 className="text-navy font-orbitron font-bold text-2xl mb-4 mt-2">
                  More Kits in Development
                </h3>
                <p className="text-gray-600 mb-6">
                  We're constantly developing new STEM kits covering various scientific topics. 
                  Stay tuned for more exciting hands-on learning experiences that will inspire 
                  the next generation of scientists, engineers, and innovators!
                </p>
                <ul className="space-y-2">
                  {['New Topics', 'More Experiments', 'Expanded Grade Levels', 'Teacher Resources'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-light-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 reveal">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
                Get Involved
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                There are many ways to engage with STEMUnboxed and bring STEM education to students
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Classroom Activities',
                  description: 'Invite us to conduct interactive STEM activities with students in your class or grade using our kits.',
                  cta: 'Schedule a Visit',
                  href: '/contact'
                },
                {
                  title: 'Take-Home Kits',
                  description: 'Distribute kits to students to take home and engage with the activities on their own time.',
                  cta: 'Request Kits',
                  href: '/contact'
                },
                {
                  title: 'Teacher-Led Sessions',
                  description: 'Get kits for your classrooms and lead the activities on your own schedule with our teacher guides.',
                  cta: 'Get Started',
                  href: '/contact'
                },
                {
                  title: 'Make a Donation',
                  description: 'Support our mission to bring STEM education to more students by making a donation.',
                  cta: 'Donate Now',
                  href: '/donate'
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="reveal involvement-card"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-navy font-orbitron font-semibold text-2xl mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {item.description}
                  </p>
                  <a 
                    href={item.href}
                    className="inline-flex items-center gap-2 text-light-blue font-semibold hover:gap-3 transition-all duration-200"
                  >
                    {item.cta}
                    <ChevronRight className="w-5 h-5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-navy">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center reveal">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-6">
              Connect With <span className="text-gradient">STEMUnboxed</span>
            </h2>
            <p className="text-white/70 mb-8">
              We'd love to hear from you! Whether you want to get involved, have questions, 
              or want to give us feedback, reach out and let's bring STEM education to more students together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:packofparts@gmail.com"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                packofparts@gmail.com
              </a>
              <a 
                href="/contact"
                className="px-8 py-3 border-2 border-light-blue text-light-blue font-semibold rounded-pill transition-all duration-300 hover:bg-light-blue hover:text-navy inline-flex items-center justify-center gap-2"
              >
                Contact Form
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-navy pt-16 pb-8 border-t border-white/10">
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

            {/* Quick Links */}
            <div className="reveal" style={{ transitionDelay: '0.1s' }}>
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

            {/* Contact Info */}
            <div className="reveal" style={{ transitionDelay: '0.2s' }}>
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

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/50 text-sm">
              &copy; {new Date().getFullYear()} Pack of Parts (FRC 1294). All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default StemKits;
