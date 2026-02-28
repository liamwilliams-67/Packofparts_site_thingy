import { useEffect, useRef, useState } from 'react';
import { 
  Mail, 
  MapPin, 
  School, 
  Users, 
  Instagram,
  Facebook,
  Youtube,
  Github,
  Award,
  Wrench,
  Code,
  Lightbulb,
  ChevronRight,
  Star,
  Linkedin
} from 'lucide-react';
import './MeetTheTeam.css';
import DesktopNav from '@/components/DesktopNav';
import MobileNav from '@/components/MobileNav';
import QuickLinks from '@/components/QuickLinks';

// Team member type
interface TeamMember {
  name: string;
  role: string;
  image: string;
  year?: string;
  bio?: string;
}

// Generate an SVG data URI avatar with initials and a role-based color
function generateAvatar(name: string, role: string): string {
  const colors: Record<string, string> = {
    Captain: '#00b4d8',
    'Co-Captain': '#0096c7',
    President: '#ffc107',
    'Vice President': '#ff9800',
    'Lead Mentor': '#2e7d32',
    'Mechanical Mentor': '#1565c0',
    'Programming Mentor': '#6a1b9a',
    'Business Mentor': '#c62828',
    Mechanical: '#1565c0',
    Programming: '#6a1b9a',
    Electrical: '#f57f17',
    'Design/CAD': '#00838f',
    Business: '#c62828',
    Outreach: '#2e7d32',
  };
  const raw = colors[role] || '#001f3f';
  const bg = /^#[0-9a-fA-F]{6}$/.test(raw) ? raw : '#001f3f';
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="${bg}"/><text x="150" y="165" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-size="96" font-weight="bold">${initials}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// Team member card component — defined at module level for stable reference
function TeamMemberCard({ member, delay = 0 }: { member: TeamMember; delay?: number }) {
  return (
    <div 
      className="team-member-card reveal"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="member-image-container">
        <img src={member.image} alt={member.name} className="member-image" />
        <div className="member-overlay">
          {member.bio && <p className="member-bio">{member.bio}</p>}
        </div>
      </div>
      <div className="member-info">
        <h3 className="member-name">{member.name}</h3>
        <p className="member-role">{member.role}</p>
        {member.year && <span className="member-year">{member.year}</span>}
      </div>
    </div>
  );
}

function MeetTheTeam() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollYRef = useRef(0);
  
  // Leadership team — replace names/images with real data when ready
  const leadership: TeamMember[] = [
    { name: 'Team Captain', role: 'Captain', image: generateAvatar('Team Captain', 'Captain'), year: 'Senior', bio: 'Leading the team to success' },
    { name: 'Co-Captain', role: 'Co-Captain', image: generateAvatar('Co-Captain', 'Co-Captain'), year: 'Senior', bio: 'Coordinating team activities' },
    { name: 'President', role: 'President', image: generateAvatar('President', 'President'), year: 'Senior', bio: 'Managing team operations' },
    { name: 'Vice President', role: 'Vice President', image: generateAvatar('Vice President', 'Vice President'), year: 'Junior', bio: 'Supporting team leadership' },
  ];

  // Mentors — replace names/images with real data when ready
  const mentors: TeamMember[] = [
    { name: 'Lead Mentor', role: 'Lead Mentor', image: generateAvatar('Lead Mentor', 'Lead Mentor'), bio: 'Guiding the team since 2015' },
    { name: 'Mechanical Mentor', role: 'Mechanical Mentor', image: generateAvatar('Mechanical Mentor', 'Mechanical Mentor'), bio: 'Professional engineer' },
    { name: 'Programming Mentor', role: 'Programming Mentor', image: generateAvatar('Programming Mentor', 'Programming Mentor'), bio: 'Software developer' },
    { name: 'Business Mentor', role: 'Business Mentor', image: generateAvatar('Business Mentor', 'Business Mentor'), bio: 'Marketing professional' },
  ];

  // Subteam leads — replace names/images with real data when ready
  const subteamLeads: TeamMember[] = [
    { name: 'Mechanical Lead', role: 'Mechanical', image: generateAvatar('Mechanical Lead', 'Mechanical'), year: 'Senior' },
    { name: 'Programming Lead', role: 'Programming', image: generateAvatar('Programming Lead', 'Programming'), year: 'Junior' },
    { name: 'Electrical Lead', role: 'Electrical', image: generateAvatar('Electrical Lead', 'Electrical'), year: 'Senior' },
    { name: 'Design Lead', role: 'Design/CAD', image: generateAvatar('Design Lead', 'Design/CAD'), year: 'Junior' },
    { name: 'Business Lead', role: 'Business', image: generateAvatar('Business Lead', 'Business'), year: 'Senior' },
    { name: 'Outreach Lead', role: 'Outreach', image: generateAvatar('Outreach Lead', 'Outreach'), year: 'Junior' },
  ];

  useEffect(() => {
    document.title = 'Meet the Team | Pack of Parts';
  }, []);

  // Scroll handler for nav visibility
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
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

    // Fallback: ensure content becomes visible even if IntersectionObserver
    // doesn't fire (e.g. in Codespaces iframe preview)
    const fallback = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.active)').forEach((el) => {
        el.classList.add('active');
      });
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        <DesktopNav isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <MobileNav isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </nav>

      {/* Hero Section */}
      <section className="hero-section relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-light-blue rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 reveal">
            <Users className="w-5 h-5 text-light-blue" />
            <span className="text-light-blue font-semibold text-sm uppercase tracking-wider">FRC Team 1294</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-6 reveal" style={{ transitionDelay: '0.1s' }}>
            Meet the <span className="text-gradient">Pack</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto reveal" style={{ transitionDelay: '0.2s' }}>
            Get to know the students and mentors who make up our award-winning robotics team. 
            Together, we're building robots and building futures.
          </p>
        </div>
      </section>

      {/* Team Photo Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="team-photo-container reveal">
            <img 
              src="/team-photo-1.jpg" 
              alt="Pack of Parts Team" 
              className="team-photo"
            />
            <div className="team-photo-overlay">
              <div className="team-photo-content">
                <h2 className="text-3xl font-orbitron font-bold text-white mb-2">Pack of Parts</h2>
                <p className="text-white/90">2024-2025 Season</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8 reveal" style={{ transitionDelay: '0.1s' }}>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our team is made up of passionate students from Eastlake High School and surrounding schools, 
              united by our love for robotics, engineering, and making a positive impact in our community.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="section-header reveal">
            <div className="section-icon">
              <Star className="w-8 h-8 text-gold" />
            </div>
            <h2 className="section-title">Student Leadership</h2>
            <p className="section-subtitle">
              Our student leaders drive the team forward, coordinating activities and inspiring excellence
            </p>
          </div>
          
          <div className="team-grid team-grid-4">
            {leadership.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="section-header reveal">
            <div className="section-icon section-icon-blue">
              <Award className="w-8 h-8 text-light-blue" />
            </div>
            <h2 className="section-title">Our Mentors</h2>
            <p className="section-subtitle">
              Dedicated professionals who volunteer their time and expertise to guide our team
            </p>
          </div>
          
          <div className="team-grid team-grid-4">
            {mentors.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Subteam Leads Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="section-header reveal">
            <div className="section-icon section-icon-navy">
              <Wrench className="w-8 h-8 text-navy" />
            </div>
            <h2 className="section-title">Subteam Leads</h2>
            <p className="section-subtitle">
              Student leaders who head our specialized subteams and drive technical excellence
            </p>
          </div>
          
          <div className="team-grid team-grid-6">
            {subteamLeads.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Subteams Overview */}
      <section className="py-20 bg-navy">
        <div className="container-custom">
          <div className="section-header reveal">
            <h2 className="section-title" style={{ color: 'white' }}>Our Subteams</h2>
            <p className="section-subtitle text-white/70">
              Every member finds their place on one of our specialized subteams
            </p>
          </div>
          
          <div className="subteams-grid">
            <div className="subteam-card reveal">
              <Wrench className="subteam-icon" />
              <h3 className="subteam-name">Design</h3>
              <p className="subteam-desc">Design and build the robot's physical structure using CAD software and machine tools</p>
            </div>
            <div className="subteam-card reveal" style={{ transitionDelay: '0.1s' }}>
              <Code className="subteam-icon" />
              <h3 className="subteam-name">Programming</h3>
              <p className="subteam-desc">Write code for autonomous and teleoperated robot control systems</p>
            </div>
            <div className="subteam-card reveal" style={{ transitionDelay: '0.2s' }}>
              <Wrench className="subteam-icon" />
              <h3 className="subteam-name">Mechanical</h3>
              <p className="subteam-desc">Builds the physical frame of the robot which gets passed on to the other teams to do their part</p>
            </div>
            <div className="subteam-card reveal" style={{ transitionDelay: '0.3s' }}>
              <Lightbulb className="subteam-icon" />
              <h3 className="subteam-name">Electrical</h3>
              <p className="subteam-desc">Wire and integrate electrical systems, sensors, and motor controllers</p>
            </div>
            <div className="subteam-card reveal" style={{ transitionDelay: '0.4s' }}>
              <Users className="subteam-icon" />
              <h3 className="subteam-name">Business & PR</h3>
              <p className="subteam-desc">Manage team finances, fundraising, community outreach, and social media</p>
            </div>
            <div className="subteam-card reveal" style={{ transitionDelay: '0.5s' }}>
              <Users className="subteam-icon" />
              <h3 className="subteam-name">Scouting</h3>
              <p className="subteam-desc">Analyze game strategy, scout opponents, and plan competition tactics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA Section */}
      <section className="py-20 bg-gradient-to-r from-light-blue to-gold">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-6 reveal">
            Want to Join the Pack?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto reveal" style={{ transitionDelay: '0.1s' }}>
            We're always looking for passionate students who want to learn, build, and compete!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal" style={{ transitionDelay: '0.2s' }}>
            <a 
              href="/join" 
              className="inline-flex items-center justify-center gap-2 bg-white text-navy px-8 py-4 rounded-full font-semibold hover:bg-navy hover:text-white transition-all duration-300"
            >
              Join The Club
              <ChevronRight className="w-5 h-5" />
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-navy transition-all duration-300"
            >
              Contact Us
            </a>
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

            <QuickLinks scrollToSection={scrollToSection} />

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

export default MeetTheTeam;
