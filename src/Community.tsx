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
  Heart,
  Award,
  Globe,
  Handshake,
  Calendar,
  Megaphone,
  GraduationCap,
  Rocket,
  Target,
  Sparkles
} from 'lucide-react';
import './Community.css';

function Community() {
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
              COMMUNITY IMPACT
            </span>
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-4 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            Making a <span className="text-gradient">Difference</span>
          </h1>
          
          <p 
            className="text-white/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            Beyond building robots, we're building a better community through 
            outreach, education, and inspiring the next generation.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
              Our <span className="text-gradient">Core Values</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              FIRST's core values guide everything we do, from the workshop to the community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Handshake,
                title: 'Coopertition',
                description: 'Competing while cooperating. We help other teams succeed even as we compete against them.'
              },
              {
                icon: Target,
                title: 'Gracious Professionalism',
                description: 'Competing fiercely while treating everyone with respect and kindness.'
              },
              {
                icon: Sparkles,
                title: 'Discovery',
                description: 'Exploring new skills and ideas, learning from mistakes, and celebrating innovation.'
              },
              {
                icon: Heart,
                title: 'Fun',
                description: 'Enjoying and celebrating what we do, building lasting friendships and memories.'
              },
              {
                icon: Users,
                title: 'Teamwork',
                description: 'Working together, respecting all team members, and achieving more than individuals could alone.'
              },
              {
                icon: Rocket,
                title: 'Innovation',
                description: 'Thinking creatively, taking risks, and pushing the boundaries of what\'s possible.'
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="reveal value-card"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-light-blue/10 flex items-center justify-center mb-4">
                    <value.icon className="w-8 h-8 text-light-blue" />
                  </div>
                  <h3 className="text-navy font-orbitron font-semibold text-xl mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outreach Programs Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
              Outreach <span className="text-gradient">Programs</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to spreading STEM education and robotics throughout our community
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                icon: GraduationCap,
                title: 'Summer Robotics Camps',
                description: 'Week-long camps for middle school students introducing robotics, programming, and engineering concepts.',
                impact: '100+ students reached annually',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: School,
                title: 'Elementary School Demos',
                description: 'Interactive robot demonstrations at local elementary schools to inspire young students.',
                impact: '15+ schools visited each year',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: Globe,
                title: 'FLL/FTC Mentorship',
                description: 'Mentoring younger FIRST Lego League and FIRST Tech Challenge teams in our area.',
                impact: '8+ teams mentored',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: Megaphone,
                title: 'STEM Advocacy',
                description: 'Promoting STEM education through community events, presentations, and demonstrations.',
                impact: '1000+ community members engaged',
                color: 'from-orange-500 to-orange-600'
              }
            ].map((program, index) => (
              <div 
                key={index}
                className="reveal outreach-card"
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className={`w-full h-2 rounded-t-2xl bg-gradient-to-r ${program.color}`} />
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-light-blue/10 flex items-center justify-center flex-shrink-0">
                      <program.icon className="w-7 h-7 text-light-blue" />
                    </div>
                    <div>
                      <h3 className="text-navy font-orbitron font-semibold text-2xl mb-2">
                        {program.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {program.description}
                      </p>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-light-blue/10 rounded-full">
                        <Award className="w-4 h-4 text-light-blue" />
                        <span className="text-navy font-semibold text-sm">{program.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Events Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
              Community <span className="text-gradient">Events</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Throughout the year, we host and participate in events that bring our community together
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Open Houses',
                description: 'Visit our lab, meet the team, and see our robots in action',
                frequency: 'Quarterly'
              },
              {
                title: 'Robot Demonstrations',
                description: 'Public demos at schools, fairs, and community events',
                frequency: 'Monthly'
              },
              {
                title: 'Fundraising Events',
                description: 'Community fundraisers supporting our team and local causes',
                frequency: 'Seasonal'
              },
              {
                title: 'STEM Nights',
                description: 'Family-friendly STEM activities and hands-on learning',
                frequency: 'Bi-annual'
              },
              {
                title: 'Competition Viewing',
                description: 'Watch our team compete live at regional championships',
                frequency: 'Annual'
              },
              {
                title: 'Volunteer Days',
                description: 'Give back to our community through service projects',
                frequency: 'Monthly'
              }
            ].map((event, index) => (
              <div 
                key={index}
                className="reveal event-card"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <Calendar className="w-6 h-6 text-light-blue flex-shrink-0" />
                  <span className="text-xs font-semibold text-light-blue uppercase tracking-wide">
                    {event.frequency}
                  </span>
                </div>
                <h3 className="text-navy font-orbitron font-semibold text-xl mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="section-padding bg-navy">
        <div className="container-custom">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-white mb-4">
              Our <span className="text-gradient">Impact</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Numbers that showcase our commitment to community engagement and STEM education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: '20+',
                label: 'Years of Service',
                icon: Award
              },
              {
                number: '500+',
                label: 'Students Inspired',
                icon: GraduationCap
              },
              {
                number: '1000+',
                label: 'Volunteer Hours',
                icon: Heart
              },
              {
                number: '5',
                label: 'Schools Represented',
                icon: School
              }
            ].map((stat, index) => (
              <div 
                key={index}
                className="reveal text-center"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-light-blue/10 mb-4">
                  <stat.icon className="w-10 h-10 text-light-blue" />
                </div>
                <div className="text-5xl font-orbitron font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 reveal">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
                Get <span className="text-gradient">Involved</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                There are many ways to support our mission and be part of our community
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Volunteer',
                  description: 'Help at events, mentor students, or share your expertise',
                  cta: 'Learn More',
                  href: '/contact'
                },
                {
                  title: 'Sponsor',
                  description: 'Support our team and help make STEM education accessible',
                  cta: 'Become a Sponsor',
                  href: '/#donate'
                },
                {
                  title: 'Partner',
                  description: 'Collaborate with us on community programs and initiatives',
                  cta: 'Partner With Us',
                  href: '/contact'
                },
                {
                  title: 'Attend Events',
                  description: 'Join us at competitions, open houses, and community events',
                  cta: 'View Calendar',
                  href: '/contact'
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

// Add missing import
import { ChevronRight } from 'lucide-react';

export default Community;
