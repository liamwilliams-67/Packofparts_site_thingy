import { useEffect, useRef, useState } from 'react';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Github, 
  Mail, 
  Menu, 
  X, 
  ChevronRight,
  Play,
  MapPin,
  School,
  Calendar,
  Users,
  Trophy,
  ArrowRight
} from 'lucide-react';
import './App.css';

function App() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

 const navLinks = [
  { name: 'Join The Club', href: '/join' },
  { name: 'For Members', href: '/members' },
  { name: 'Community', href: '/community' },
  { name: 'Donate', href: '/donate' },
  { name: 'Contact Us', href: '/contact' },  // Change this from '#contact' to '/contact'
  { name: 'Summer Camps', href: '/summer-camps' },
];

  // Sponsor logos
  const sponsors = [
    '/sponsor-1.png',
    '/sponsor-2.png',
    '/sponsor-3.png',
    '/sponsor-4.png',
    '/sponsor-5.png',
    '/sponsor-6.png',
    '/sponsor-7.png',
    '/sponsor-8.png',
    '/sponsor-9.png',
  ];

  // Team photos
  const teamPhotos = [
    '/team-photo-1.jpg',
    '/team-photo-2.jpg',
    '/team-photo-3.jpg',
    '/team-photo-4.jpg',
    '/team-photo-5.jpg',
    '/team-photo-6.jpg',
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsNavVisible(window.scrollY > 100);
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

    document.querySelectorAll('.reveal, .stagger-children').forEach((el) => {
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
        <div className="container-custom py-4">
          <div className="nav-glass rounded-pill px-4 md:px-8 py-3 flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
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
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-white/90 hover:text-light-blue text-xs xl:text-sm font-semibold uppercase tracking-wide link-underline transition-colors duration-200"
                >
                  {link.name}
                </button>
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
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-white text-xl font-orbitron font-semibold hover:text-light-blue transition-colors duration-200"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="/team-photo-2.jpg"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-robotic-arm-working-on-an-assembly-line-21913-large.mp4" type="video/mp4" />
          </video>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 hero-gradient" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-custom text-center px-4">
          <div 
            className="animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <span className="inline-block text-light-blue font-orbitron text-sm md:text-base tracking-widest mb-4">
              #1294
            </span>
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-4 animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          >
            Eastlake Robotics Club
          </h1>
          
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-gradient mb-6 animate-fade-in-up animate-float"
            style={{ animationDelay: '0.8s' }}
          >
            Pack of Parts
          </h2>
          
          <p 
            className="text-white/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up"
            style={{ animationDelay: '1.1s' }}
          >
            FRC Team 1294 | Sammamish, Washington
          </p>
          
          <div 
            className="animate-fade-in-up animate-pulse-glow"
            style={{ animationDelay: '1.4s' }}
          >
            <button 
              onClick={() => scrollToSection('#join')}
              className="btn-primary text-sm md:text-base"
            >
              Join The Club
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"
          style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/80 rounded-full" />
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section id="join" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <div className="reveal">
              <span className="text-light-blue font-orbitron text-sm tracking-widest uppercase mb-4 block">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-6">
                Inspiring the Next Generation of{' '}
                <span className="text-gradient">STEM Leaders</span>
              </h2>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  The purpose of the Eastlake Robotics (Pack of Parts) Team 1294 shall be to promote 
                  science and technology in Eastlake High School and the surrounding community through 
                  student and community programs involving engineering and other technical skills.
                </p>
                <p>
                  Our mission is to inspire young people to be science and technology leaders, by engaging 
                  them in exciting hands-on programs that build science, engineering, and technology skills, 
                  and inspire innovation, to foster well-rounded life capabilities including self-confidence, 
                  communication, and leadership.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 stagger-children">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Trophy className="w-6 h-6 text-light-blue mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-orbitron font-bold text-navy">22+</div>
                  <div className="text-xs text-gray-500">Years</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <School className="w-6 h-6 text-light-blue mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-orbitron font-bold text-navy">5</div>
                  <div className="text-xs text-gray-500">Schools</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Calendar className="w-6 h-6 text-light-blue mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-orbitron font-bold text-navy">6</div>
                  <div className="text-xs text-gray-500">Weeks</div>
                </div>
              </div>
            </div>

            {/* Photo Grid */}
            <div className="reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="img-zoom rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={teamPhotos[0]} 
                      alt="Team working" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="img-zoom rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={teamPhotos[2]} 
                      alt="Programming" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="img-zoom rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={teamPhotos[1]} 
                      alt="Competition" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="img-zoom rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={teamPhotos[3]} 
                      alt="Team photo" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About The Team Section */}
      <section id="members" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Video */}
            <div className="reveal order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <img 
                  src="/team-photo-4.jpg" 
                  alt="Chairman's Video Thumbnail" 
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-navy/40 flex items-center justify-center group-hover:bg-navy/30 transition-colors duration-300">
                  <button className="w-20 h-20 bg-light-blue rounded-full flex items-center justify-center shadow-glow transform group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-navy ml-1" fill="currentColor" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-semibold">Watch our Chairman's Video</p>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="reveal order-1 lg:order-2" style={{ transitionDelay: '0.2s' }}>
              <span className="text-light-blue font-orbitron text-sm tracking-widest uppercase mb-4 block">
                About The Team
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-6">
                Who We Are
              </h2>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  FRC Team 1294 Pack of Parts, formerly known as Top Gun, began in 2004. Over the past 
                  22 years, Pack of Parts (POP) has grown to be a consistently diverse group of dedicated 
                  students from the Sammamish area.
                </p>
                <p>
                  Based out of Eastlake High School, POP's members are high school (9-12) students from 
                  Eastlake High School, Redmond High School, Tesla STEM High School, International Community 
                  School, and homeschool.
                </p>
                <p>
                  We build a 120 lb. competition robot in just 6 weeks. Our meetings start in the fall, 
                  with the official season for the FIRST Robotics competition starting in January and going 
                  through April. No previous experience is necessary to join. We welcome new members!
                </p>
              </div>

              <button 
                onClick={() => scrollToSection('#join')}
                className="btn-primary mt-8 inline-flex items-center gap-2"
              >
                Learn More About Joining
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What is FIRST Section */}
      <section id="community" className="section-padding bg-white">
        <div className="container-custom">
          {/* FRC Block */}
          <div className="reveal mb-16 lg:mb-24">
            <div className="max-w-4xl">
              <span className="text-light-blue font-orbitron text-sm tracking-widest uppercase mb-4 block">
                The Competition
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-6">
                What is the <span className="text-gradient">FIRST Robotics Competition</span>?
              </h2>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                Combining the excitement of sport with the rigors of science and technology, we call the 
                FIRST Robotics Competition the ultimate Sport for the Mind. Under strict rules, limited 
                resources, and an intense six-week time limit, teams of students are challenged to raise 
                funds, design a team "brand," hone teamwork skills, and build & program industrialize robots 
                to play a difficult field game against like-minded competitors. It's as close to real-world 
                engineering as a student can get. Volunteer professional mentors lend their time and talents 
                to guide each team. Each season ends with an exciting FIRST Championship in Houston, TX.
              </p>
            </div>
          </div>

          {/* Connector Line */}
          <div className="hidden lg:block relative h-20 mb-16">
            <svg className="absolute left-1/4 top-0 w-1/2 h-full" viewBox="0 0 400 80" fill="none">
              <path 
                d="M0 0 Q200 80 400 0" 
                stroke="#80D3EE" 
                strokeWidth="2" 
                strokeDasharray="8 4"
                className="animate-pulse"
              />
            </svg>
          </div>

          {/* FIRST Block */}
          <div className="reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="max-w-4xl ml-auto text-right">
              <span className="text-light-blue font-orbitron text-sm tracking-widest uppercase mb-4 block">
                The Organization
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-6">
                What is <span className="text-gradient">FIRST</span>?
              </h2>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-6">
                FIRST (For Inspiration and Recognition of Science and Technology) is an international youth 
                organization that operates the FIRST Robotics Competition, FIRST Tech Challenge, FIRST LEGO 
                League, FIRST Lego League Jr., and FIRST LEGO League Jr. Discovery Edition competitions. 
                FIRST was founded by inventor Dean Kamen and former MIT professor Woodie Flowers in 1989 to 
                inspire young people's interest and participation in science and technology.
              </p>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-8">
                FIRST is "More Than Robots". FIRST participation is proven to encourage students to pursue 
                education and careers in STEM-related fields, inspire them to become leaders and innovators, 
                and enhance their work and life skills.
              </p>
              <a 
                href="https://www.firstinspires.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Visit FIRST Website
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="donate" className="section-padding bg-navy overflow-hidden">
        <div className="container-custom mb-12">
          <div className="text-center reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-white mb-4">
              Our <span className="text-gradient">Sponsors</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              We are incredibly grateful to the following organizations that keep our team running. 
              If you would like to become a sponsor, please contact us.
            </p>
            <button 
              onClick={() => scrollToSection('#contact')}
              className="mt-6 btn-primary"
            >
              Become a Sponsor
            </button>
          </div>
        </div>

        {/* Marquee Row 1 */}
        <div className="relative mb-8">
          <div className="flex animate-marquee pause-on-hover">
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <div 
                key={index}
                className="flex-shrink-0 mx-8 w-40 h-24 flex items-center justify-center"
              >
                <img 
                  src={sponsor} 
                  alt={`Sponsor ${index + 1}`}
                  className="sponsor-logo max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 - Reverse */}
        <div className="relative">
          <div className="flex animate-marquee-reverse pause-on-hover">
            {[...sponsors.slice().reverse(), ...sponsors.slice().reverse()].map((sponsor, index) => (
              <div 
                key={index}
                className="flex-shrink-0 mx-8 w-40 h-24 flex items-center justify-center"
              >
                <img 
                  src={sponsor} 
                  alt={`Sponsor ${index + 1}`}
                  className="sponsor-logo max-w-full max-h-full object-contain"
                />
              </div>
            ))}
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

      {/* Summer Camps Section - Anchor target */}
      <div id="camps" className="hidden" />
    </div>
  );
}

export default App;
