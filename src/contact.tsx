import { useEffect, useRef, useState } from 'react';
import {
  Mail,
  MapPin,
  School,
  Instagram,
  Facebook,
  Youtube,
  Github,
  Linkedin,
} from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './contact.css';
import DesktopNav from '@/components/DesktopNav';
import MobileNav from '@/components/MobileNav';
import QuickLinks from '@/components/QuickLinks';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function Contact() {
  const MAP_HEIGHT = 400;
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setScrollY] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Contact | Pack of Parts';

    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsNavVisible(window.scrollY > 100 || window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-122.03119, 47.6144],
      zoom: 16,
      maxZoom: 20,
    });

    const markerEl = document.createElement('div');
markerEl.style.cssText = 'cursor:pointer;width:45px;display:flex;flex-direction:column;align-items:center;';
markerEl.innerHTML = `
  <div style="
    width:45px;
    height:45px;
    border-radius:50%;
    background:#0a1628;
    border:3px solid #38bdf8;
    box-shadow:0 2px 8px rgba(0,0,0,0.4);
    display:flex;
    align-items:center;
    justify-content:center;
    overflow:hidden;
  ">
    <img src="/logo.png" style="width:35px;height:35px;object-fit:contain;" />
  </div>
  <div style="
    width:0;
    height:0;
    border-left:11px solid transparent;
    border-right:11px solid transparent;
    border-top:13px solid #38bdf8;
    margin-top:-2.5px;
  "></div>
`;

    const popup = new mapboxgl.Popup({ offset: 55 }).setHTML(
      '<div style="font-family:sans-serif;padding-bottom:0px;padding-top:0px">' +
      '<strong>Robotics Shop</strong><br/>' +
      'Room D-125' +
      '</div>'
    );

    const marker = new mapboxgl.Marker({ element: markerEl, anchor: 'bottom' })
      .setLngLat([-122.03119, 47.61425])
      .setPopup(popup)
      .addTo(map);

    map.on('load', () => marker.togglePopup());

    // Resize the map when the .reveal container becomes visible
    const container = mapRef.current.closest('.reveal');
    if (container) {
      const ro = new ResizeObserver(() => map.resize());
      ro.observe(container);
      return () => { ro.disconnect(); map.remove(); };
    }

    return () => map.remove();
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = href;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        <DesktopNav isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <MobileNav isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </nav>

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-navy pt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative z-10 container-custom text-center px-4 py-20">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block text-light-blue font-orbitron text-sm md:text-base tracking-widest mb-4">GET IN TOUCH</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-4 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Have questions about joining, sponsorships, or camps? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-[52.5rem] mx-auto">
            <div className="space-y-6">
              <div className="reveal contact-card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-light-blue/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-light-blue" />
                  </div>
                  <div>
                    <h3 className="text-navy font-orbitron font-semibold text-lg mb-1">Email Us</h3>
                    <a href="mailto:info@packofparts.org" className="text-gray-600 hover:text-light-blue transition-colors duration-200">info@packofparts.org</a>
                  </div>
                </div>
              </div>

              <div className="reveal contact-card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-light-blue/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-light-blue" />
                  </div>
                  <div>
                    <h3 className="text-navy font-orbitron font-semibold text-lg mb-1">Location</h3>
                    <p className="text-gray-600">Eastlake High School</p>
                    <p className="text-gray-600">400 228th AVE NE, Sammamish, WA 98074</p>
                  </div>
                </div>
                <div className="w-full rounded-lg overflow-hidden mt-4">
                  <div
                    ref={mapRef}
                    className="w-full"
                    style={{ height: MAP_HEIGHT }}
                  />
                </div>
                <p className="text-gray-600 text-sm italic mt-3">
                  The shop is located in room D-125 with access from the back of the high school across from the Renaissance school.
                </p>
              </div>

            </div>

            <div className="reveal mt-12">
              <h3 className="text-navy font-orbitron font-semibold text-xl mb-6">Connect With Us</h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Instagram, href: 'https://www.instagram.com/packofparts', label: 'Instagram' },
                  { icon: Facebook, href: 'https://www.facebook.com/packofparts', label: 'Facebook' },
                  { icon: Youtube, href: 'https://youtube.com/@packofparts', label: 'YouTube' },
                  { icon: Linkedin, href: 'https://linkedin.com/company/packofparts', label: 'LinkedIn' },
                  { icon: Github, href: 'https://github.com/packofparts', label: 'GitHub' },
                ].map((social) => (
                  <a key={social.label} href={social.href} className="social-icon w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all duration-300" aria-label={social.label}>
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
                <a href="https://www.chiefdelphi.com/u/1294_pack_of_parts/summary" target="_blank" rel="noopener noreferrer" className="social-icon group relative w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center hover:bg-navy transition-all duration-300" aria-label="ChiefDelphi">
                  <img src="/chiefdelphi-logo-navy.svg" alt="" aria-hidden="true" className="w-8 h-8 transition-opacity duration-300 opacity-100 group-hover:opacity-0" />
                  <img src="/chiefdelphi-logo.svg" alt="" aria-hidden="true" className="w-8 h-8 absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <p className="text-white/70 mb-6 max-w-md">Building robots. Building futures. Inspiring the next generation of STEM leaders in Sammamish, Washington.</p>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, href: 'https://www.instagram.com/packofparts', label: 'Instagram' },
                  { icon: Facebook, href: 'https://www.facebook.com/packofparts', label: 'Facebook' },
                  { icon: Youtube, href: 'https://youtube.com/@packofparts', label: 'YouTube' },
                  { icon: Linkedin, href: 'https://linkedin.com/company/packofparts', label: 'Linkedin' },
                  { icon: Github, href: 'https://github.com/packofparts', label: 'Github' },
                ].map((social) => (
                  <a key={social.label} href={social.href} className="social-icon w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-light-blue" aria-label={social.label}>
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
                <a href="https://www.chiefdelphi.com/u/1294_pack_of_parts/summary" target="_blank" rel="noopener noreferrer" className="social-icon w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-light-blue" aria-label="ChiefDelphi">
                  <img src="/chiefdelphi-logo.svg" alt="ChiefDelphi" className="w-7 h-7" />
                </a>
              </div>
            </div>

            <div className="reveal">
              <QuickLinks scrollToSection={scrollToSection} />
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
          <div className="border-t border-white/10 pt-8 text-center text-white/50 text-sm">&copy; {new Date().getFullYear()} Pack of Parts (FRC 1294). All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
