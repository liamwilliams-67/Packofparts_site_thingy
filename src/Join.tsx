import { useEffect, useState } from 'react';
import { 
  Mail, 
  MapPin, 
  School, 
  Users, 
  CircleDollarSign,
  Instagram,
  Facebook,
  Youtube,
  Github,
  Linkedin,
  Wrench,
  Shapes,
  Code,
  Lightbulb,
  Calendar,
  Clock,
  CheckCircle
} from 'lucide-react';
import './Join.css';
import { Timeline } from '@/components/ui/timeline';
import DesktopNav from '@/components/DesktopNav';
import MobileNav from '@/components/MobileNav';
import QuickLinks from '@/components/QuickLinks';

function Join() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setScrollY] = useState(0);

  // Timeline data for How to Join section
  const timelineData = [
    {
      title: "01",
      content: (
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1 bg-gray-50 dark:bg-neutral-900 rounded-xl p-5 border border-gray-200 dark:border-neutral-700">
            <h4 className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-3">
              Interest Form
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
              Fill out an interest form if you are considering joining Pack of Parts for the 2025-2026 season.
            </p>
          </div>
          <div className="w-full md:w-56 lg:w-64 flex-shrink-0">
            <img
              src="/team-photo-1.jpg"
              alt="Team members working together"
              className="w-full h-40 md:h-44 object-cover rounded-xl shadow-md"
            />
          </div>
        </div>
      ),
    },
    {
      title: "02",
      content: (
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1 bg-gray-50 dark:bg-neutral-900 rounded-xl p-5 border border-gray-200 dark:border-neutral-700">
            <h4 className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-3">
              Shop Permission Form
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
              Fill out this form and have it signed by a parent or guardian. This gives you permission to use tools and machines in the shop. Bring the signed form to the next club meeting.
            </p>
          </div>
          <div className="w-full md:w-56 lg:w-64 flex-shrink-0">
            <img
              src="/team-photo-2.jpg"
              alt="Students using shop equipment"
              className="w-full h-40 md:h-44 object-cover rounded-xl shadow-md"
            />
          </div>
        </div>
      ),
    },
    {
      title: "03",
      content: (
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1 bg-gray-50 dark:bg-neutral-900 rounded-xl p-5 border border-gray-200 dark:border-neutral-700">
            <h4 className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-3">
              Member Handbook
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
              Get familiar with our member handbook. It covers everything you need to know about how we run the club and what will be expected of you.
            </p>
          </div>
          <div className="w-full md:w-56 lg:w-64 flex-shrink-0">
            <img
              src="/team-photo-3.jpg"
              alt="Team handbook review"
              className="w-full h-40 md:h-44 object-cover rounded-xl shadow-md"
            />
          </div>
        </div>
      ),
    },
    {
      title: "04",
      content: (
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1 bg-gray-50 dark:bg-neutral-900 rounded-xl p-5 border border-gray-200 dark:border-neutral-700">
            <h4 className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-3">
              Club Contract
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
              After reading the handbook, sign your member contract. Fill out the form and have it signed by a parent or guardian.
            </p>
          </div>
          <div className="w-full md:w-56 lg:w-64 flex-shrink-0">
            <img
              src="/team-photo-4.jpg"
              alt="Signing club contract"
              className="w-full h-40 md:h-44 object-cover rounded-xl shadow-md"
            />
          </div>
        </div>
      ),
    },
    {
      title: "05",
      content: (
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1 bg-gray-50 dark:bg-neutral-900 rounded-xl p-5 border border-gray-200 dark:border-neutral-700">
            <h4 className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-3">
              Parent/Guardian Info
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
              Almost done! We'll provide a document for your parent or guardian to read so they know what's happening in the club. Ask them to spend a few minutes going over it with you.
            </p>
          </div>
          <div className="w-full md:w-56 lg:w-64 flex-shrink-0">
            <img
              src="/team-photo-5.jpg"
              alt="Team at a competition"
              className="w-full h-40 md:h-44 object-cover rounded-xl shadow-md"
            />
          </div>
        </div>
      ),
    },
    {
      title: "06",
      content: (
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1 bg-gray-50 dark:bg-neutral-900 rounded-xl p-5 border border-gray-200 dark:border-neutral-700">
            <h4 className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-3">
              Club Fees
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base mb-3">
              Finally, pay the club fees. Building robots is expensive and these fees help cover those costs.
            </p>
            <p className="text-amber-600 dark:text-amber-400 text-sm font-medium italic">
              NOTE: we're not yet ready to accept payments for this season yet, we'll let you know when it's time.
            </p>
          </div>
          <div className="w-full md:w-56 lg:w-64 flex-shrink-0">
            <img
              src="/team-photo-6.jpg"
              alt="Pack of Parts team"
              className="w-full h-40 md:h-44 object-cover rounded-xl shadow-md"
            />
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    document.title = 'Join | Pack of Parts';
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
            style={{ animationDelay: '0.1s' }}
          >
            <span className="inline-block text-light-blue font-orbitron text-sm md:text-base tracking-widest mb-4">
              JOIN THE TEAM
            </span>
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-4 animate-fade-in-up"
            style={{ animationDelay: '0.25s' }}
          >
            Become a Member of Pack of Parts
          </h1>
          
          <p 
            className="text-white/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
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
              Why Join Pack of Parts?
            </h2>
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
                description: 'Connect with like-minded students from EHS! Make friends and mentors for life.'
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
                Who Can Join?
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                We welcome students from Eastlake High School. 
                No prior robotics or engineering experience is required—just enthusiasm and 
                a willingness to learn!
              </p>

              <div className="space-y-4">
                {[
                  'High school students from EHS (grades 9-12)',
                  'Commitment to attend meetings and competitions',
                  'No experience necessary — we teach everything!'
                ].map((req, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-light-blue flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="info-card-join">
                <h3 className="text-white font-orbitron font-semibold text-2xl mb-6">
                  Team Details
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Calendar className="w-6 h-6 text-light-blue flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Season Schedule</h4>
                      <p className="text-white/70 text-sm">
                        Pre-Season: September - December (Mon, Wen)<br />
                        Competition Season: January - April (Mon, Wen, Fri, Sat)<br />
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-light-blue flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Time Commitment</h4>
                      <p className="text-white/70 text-sm">
                        Attend atleast 65% of meetings a month 
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <School className="w-6 h-6 text-light-blue flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Meeting Location</h4>
                      <p className="text-white/70 text-sm">
                        Eastlake High School<br />
                        D-125<br />
                        Sammamish, WA
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
              Find Your Role
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team is divided into specialized sub-teams. Explore different roles 
              and find where your interests and skills fit best.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Design',
                icon: Shapes,
                description: 'Design and build the robot\'s physical structure using CAD software and machine tools.'
              },
              {
                title: 'Programming',
                icon: Code,
                description: 'Write code for autonomous and teleoperated robot control systems.'
              },
              {
                title: 'Mechanical',
                icon: Wrench,
                description: 'Builds the phyisical fram of the robot which gets passed on to the other teams to do their part.'
              },
              {
                title: 'Electrical',
                icon: Lightbulb,
                description: 'Wire and integrate electrical systems, sensors, and motor controllers.'
              },
              {
                title: 'Business & PR',
                icon: CircleDollarSign,
                description: 'Manage team finances, fundraising, community outreach, and social media.'
              },
              {
                title: 'Scouting',
                icon: Users,
                description: 'Scouting analyzse game strategy, scout opponents, and plan competition tactics.'
              }              
            ].map((team, index) => (
              <div 
                key={index}
                className="reveal role-card"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4 mb-4">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section className="section-padding">
        <Timeline data={timelineData} />
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Do I need prior robotics experience?",
                answer: "No! We welcome students of all skill levels. Our experienced members and mentors will teach you everything you need to know."
              },
              {
                question: "How much does it cost to join?",
                answer: "There is a 250 dollar club fee when joining. Transportation to events is not provivded and food is also not provided sometimes."
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
                    className="social-icon w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-light-blue"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
                <a
                  href="https://www.chiefdelphi.com/u/1294_pack_of_parts/summary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-light-blue"
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

// Add missing import
import { Trophy } from 'lucide-react';

export default Join;
