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
  GraduationCap,
  Wrench,
  Code,
  Lightbulb,
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import './Join.css';

function Join() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setScrollY] = useState(0);

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Join The Club', href: '/join' },
    { name: 'For Members', href: '/#members' },
    { name: 'Community', href: '/#community' },
    { name: 'Donate', href: '/#donate' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Summer Camps', href: '/#camps' },
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
              JOIN THE TEAM
            </span>
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-4 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            Build <span className="text-gradient">The Future</span>
          </h1>
          
          <p 
            className="text-white/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            Join FRC Team 1294 and become part of a community that builds robots, 
            develops skills, and creates lifelong memories.
          </p>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
              Why Join <span className="text-gradient">Pack of Parts</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're more than just a robotics team—we're a family dedicated to innovation, 
              learning, and competition.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Wrench,
                title: 'Hands-On Learning',
                description: 'Build real robots using professional tools and techniques. Gain practical engineering experience.'
              },
              {
                icon: Code,
                title: 'Learn to Code',
                description: 'Program autonomous systems and teleoperated controls using industry-standard languages.'
              },
              {
                icon: Users,
                title: 'Build Community',
                description: 'Connect with like-minded students from 5 schools. Make friends and mentors for life.'
              },
              {
                icon: Trophy,
                title: 'Compete & Win',
                description: 'Participate in regional and world championships. Travel and represent your school.'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="reveal benefit-card"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-light-blue/10 flex items-center justify-center mb-4">
                    <item.icon className="w-8 h-8 text-light-blue" />
                  </div>
                  <h3 className="text-navy font-orbitron font-semibold text-xl mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-navy mb-6">
                Who Can <span className="text-gradient">Join</span>?
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                We welcome students from Eastlake High School and surrounding schools. 
                No prior robotics or engineering experience is required—just enthusiasm and 
                a willingness to learn!
              </p>

              <div className="space-y-4">
                {[
                  'High school students (grades 9-12)',
                  'Students from Eastlake HS and partner schools',
                  'Commitment to attend meetings and competitions',
                  'Passion for STEM, teamwork, and innovation',
                  'No experience necessary—we teach everything!'
                ].map((req, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-light-blue flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="info-card">
                <h3 className="text-white font-orbitron font-semibold text-2xl mb-6">
                  Team Details
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Calendar className="w-6 h-6 text-light-blue flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Season Schedule</h4>
                      <p className="text-white/70 text-sm">
                        Build Season: January - February (Mon-Sat)<br />
                        Competition Season: February - April<br />
                        Off-Season: May - December (flexible schedule)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-light-blue flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Time Commitment</h4>
                      <p className="text-white/70 text-sm">
                        Build Season: 15-20 hours/week<br />
                        Off-Season: 5-8 hours/week<br />
                        Flexible based on your role
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <School className="w-6 h-6 text-light-blue flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Meeting Location</h4>
                      <p className="text-white/70 text-sm">
                        Eastlake High School<br />
                        Robotics Lab & Workshop<br />
                        Sammamish, WA
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Users className="w-6 h-6 text-light-blue flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Team Size</h4>
                      <p className="text-white/70 text-sm">
                        40-50 active members<br />
                        Multiple sub-teams (Build, Programming, Design, etc.)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teams/Roles Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
              Find Your <span className="text-gradient">Role</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team is divided into specialized sub-teams. Explore different roles 
              and find where your interests and skills fit best.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Mechanical Engineering',
                icon: Wrench,
                description: 'Design and build the robot\'s physical structure using CAD software and machine tools.',
                skills: ['CAD Design', 'Machining', 'Assembly', 'Prototyping']
              },
              {
                title: 'Programming',
                icon: Code,
                description: 'Write code for autonomous and teleoperated robot control systems.',
                skills: ['Java/Python', 'Robot Control', 'Vision Processing', 'Debugging']
              },
              {
                title: 'Electrical',
                icon: Lightbulb,
                description: 'Wire and integrate electrical systems, sensors, and motor controllers.',
                skills: ['Wiring', 'Electronics', 'Pneumatics', 'Troubleshooting']
              },
              {
                title: 'Business & Marketing',
                icon: Users,
                description: 'Manage team finances, fundraising, community outreach, and social media.',
                skills: ['Fundraising', 'Sponsorships', 'Social Media', 'Events']
              },
              {
                title: 'Strategy & Scouting',
                icon: GraduationCap,
                description: 'Analyze game strategy, scout opponents, and plan competition tactics.',
                skills: ['Data Analysis', 'Strategy', 'Scouting', 'Alliance Selection']
              },
              {
                title: 'Media & Documentation',
                icon: Camera,
                description: 'Create videos, photos, and documentation for team promotion and awards.',
                skills: ['Photography', 'Video Editing', 'Graphic Design', 'Writing']
              }
            ].map((team, index) => (
              <div 
                key={index}
                className="reveal role-card"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-light-blue/10 flex items-center justify-center flex-shrink-0">
                    <team.icon className="w-6 h-6 text-light-blue" />
                  </div>
                  <h3 className="text-navy font-orbitron font-semibold text-xl">
                    {team.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {team.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {team.skills.map((skill, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-light-blue/10 text-navy text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section className="section-padding bg-navy">
        <div className="container-custom">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-white mb-4">
              How to <span className="text-gradient">Join</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Ready to become part of the team? Follow these simple steps to get started.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Reach Out',
                description: 'Contact us via email or attend one of our meetings to express your interest.'
              },
              {
                step: '02',
                title: 'Meet the Team',
                description: 'Visit our lab, meet current members, and learn about our different sub-teams.'
              },
              {
                step: '03',
                title: 'Get Started',
                description: 'Complete registration, attend orientation, and start your robotics journey!'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="reveal text-center"
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="text-light-blue font-orbitron text-5xl font-bold mb-4 opacity-50">
                  {item.step}
                </div>
                <h3 className="text-white font-orbitron font-semibold text-2xl mb-3">
                  {item.title}
                </h3>
                <p className="text-white/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <a 
              href="/contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              Contact Us to Join
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Do I need prior robotics experience?",
                answer: "No! We welcome students of all skill levels. Our experienced members and mentors will teach you everything you need to know."
              },
              {
                question: "What if I'm not good at engineering or coding?",
                answer: "We have roles for everyone! Business, marketing, strategy, media, and documentation are just as important as technical roles."
              },
              {
                question: "How much does it cost to join?",
                answer: "We work hard to keep costs low through fundraising and sponsorships. Contact us to discuss current team dues and financial assistance options."
              },
              {
                question: "Can I join mid-season?",
                answer: "Yes! While it's best to join at the start of build season (January), we accept new members throughout the year."
              },
              {
                question: "Will this help with college applications?",
                answer: "Absolutely! FIRST Robotics demonstrates STEM skills, leadership, teamwork, and dedication—all qualities colleges value highly."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="reveal faq-item"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-navy font-orbitron font-semibold text-lg mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
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
import { Camera, Trophy } from 'lucide-react';

export default Join;
