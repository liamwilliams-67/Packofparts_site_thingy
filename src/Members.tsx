import { useEffect, useState } from 'react';
import { 
  Mail, 
  MapPin, 
  School, 
  Instagram,
  Facebook,
  Youtube,
  Github,
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
import DesktopNav from '@/components/DesktopNav';
import MobileNav from '@/components/MobileNav';
import QuickLinks from '@/components/QuickLinks';

function Members() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setScrollY] = useState(0);

  useEffect(() => {
    document.title = 'Members | Pack of Parts';
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        <DesktopNav isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <MobileNav isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
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
                link: './public/STIMS.pdf',
                badge: 'Required'
              },
              {
                title: 'Team Handbook',
                icon: BookOpen,
                description: 'Our Team Handbook outlines the expectations for all users and is a helpful resource for all new members.',
                link: './public/handbook.pdf',
                badge: 'Essential'
              },
              {
                title: 'Safety Notes',
                icon: AlertTriangle,
                description: 'Safety is an integral part of our team. This document details each machine in our shop and how to be safe around them.',
                link: './public/Robotics Safety Notes.pdf',
                badge: 'Required'
              },
              {
                title: 'Safety Plan',
                icon: Shield,
                description: 'Here at Pack of Parts, we take safety very seriously. Here is our safety plan so we can always make sure that you are safe.',
                link: './public/FRC Safety Plan 24.pdf',
                badge: 'Important'
              },
              {
                title: 'Our Constitution',
                icon: Award,
                description: 'Our Constitution outlines our values and principles. We will strive to follow these principles to further our Gracious Professionalism.',
                link: './public/Eastlake Robotics Constitution.pdf',
                badge: 'Core'
              },
              {
                title: 'Our Bylaws',
                icon: FileText,
                description: 'Our Bylaws outline our detailed rules and regulations. This is our in-depth guide to running our club.',
                link: './public/Eastlake Robotics Bylaws.pdf',
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
                  Open PDF
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
              <div className="p-6">
                <h3 className="text-2xl font-orbitron font-bold text-navy mb-4 text-center">
                  Team Calendar
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  View our full team calendar with all meetings, competitions, and events
                </p>
                {/* Google Calendar Embed */}
                <div className="w-full rounded-lg overflow-hidden mb-6">
                  <iframe
                    src="https://calendar.google.com/calendar/embed?src=c_e11324758594b0183182423ec69a588ed603016f28b0d1c90dd5c4fdded627fd%40group.calendar.google.com&ctz=America%2FLos_Angeles"
                    style={{ border: 0 }}
                    width="100%"
                    height="400"
                    scrolling="no"
                    title="Team Calendar"
                    className="w-full"
                  />
                </div>
                <div className="text-center">
                  <a 
                    href="#"
                    className="btn-primary-light inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Calendar
                  </a>
                </div>
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
                  <p>Monday, Wednesday, Friday, Saturday</p>
                  <p>Mon - Fri: 6:00 - 8:45 PM</p>
                  <p>Saturday: 10:00 AM - 5:00 PM</p>
                </div>
              </div>

              <div className="reveal meeting-info-card" style={{ transitionDelay: '0.2s' }}>
                <Clock className="w-8 h-8 text-light-blue mb-4" />
                <h3 className="text-navy font-orbitron font-semibold text-xl mb-3">
                  Off-Season
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p><strong>September - December</strong></p>
                  <p>Monday, Wednesday</p>
                  <p>6:00 PM - 8:45 PM</p>
                </div>
              </div>
            </div>
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
                'Attend new member orientation',
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

export default Members;
