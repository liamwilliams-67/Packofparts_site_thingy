'use client';

import {
  useEffect,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

// Animation constants
const WHEEL_SCROLL_SENSITIVITY = 0.0009;
const TOUCH_SCROLL_BACK_SENSITIVITY = 0.008;
const TOUCH_SCROLL_FORWARD_SENSITIVITY = 0.005;
const SCROLL_THRESHOLD = 5;
const TOUCH_SWIPE_THRESHOLD = -20;

// Dimension constants for responsive media sizing
// MODIFIED: Increased delta values to ensure video fully covers background image
const MEDIA_BASE_WIDTH = 300;
const MEDIA_MOBILE_WIDTH_DELTA = 800;  // Increased from 650 to cover full screen
const MEDIA_DESKTOP_WIDTH_DELTA = 1800; // Increased from 1250 to cover full screen
const MEDIA_BASE_HEIGHT = 400;
const MEDIA_MOBILE_HEIGHT_DELTA = 500;  // Increased from 200 to cover full screen
const MEDIA_DESKTOP_HEIGHT_DELTA = 700; // Increased from 400 to cover full screen
const TEXT_MOBILE_TRANSLATE_FACTOR = 180;
const TEXT_DESKTOP_TRANSLATE_FACTOR = 150;

// Delay (in ms) before marking animation as complete, allows the hero to become a frozen section
const ANIMATION_COMPLETION_DELAY_MS = 100;

// Threshold for when border radius should transition to 0 (95% = near full expansion)
const BORDER_RADIUS_THRESHOLD = 0.95;

interface HeroContentRenderProps {
  scrollProgress: number;
  isMobile: boolean;
  textTranslateX: number;
}

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
  heroContent?: ReactNode | ((props: HeroContentRenderProps) => ReactNode); // Custom hero content to display above the expanding media
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
  heroContent,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);
  const [hasAnimationCompleted, setHasAnimationCompleted] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Reset state when mediaType changes - this is an intentional pattern for resetting animation state
  useEffect(() => {
    // Using a microtask to avoid the synchronous setState warning
    queueMicrotask(() => {
      setScrollProgress(0);
      setShowContent(false);
      setMediaFullyExpanded(false);
      setHasAnimationCompleted(false);
    });
  }, [mediaType]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // After animation is complete and user has scrolled past the freeze section
      if (hasAnimationCompleted) {
        // Allow normal scrolling - don't prevent default
        // Check if we're at the top and trying to scroll up
        if (e.deltaY < 0 && window.scrollY <= SCROLL_THRESHOLD) {
          // Don't reset the animation when scrolling back up
          // Just allow normal scroll behavior
          return;
        }
        return;
      }
      
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= SCROLL_THRESHOLD) {
        setMediaFullyExpanded(false);
        setHasAnimationCompleted(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * WHEEL_SCROLL_SENSITIVITY;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
          // Mark animation as completed after a short delay to create the "freeze" effect
          setTimeout(() => {
            setHasAnimationCompleted(true);
          }, ANIMATION_COMPLETION_DELAY_MS);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      // After animation is complete
      if (hasAnimationCompleted) {
        // Allow normal scrolling
        if (deltaY < TOUCH_SWIPE_THRESHOLD && window.scrollY <= SCROLL_THRESHOLD) {
          // Don't reset animation on scroll up
          return;
        }
        return;
      }

      if (mediaFullyExpanded && deltaY < TOUCH_SWIPE_THRESHOLD && window.scrollY <= SCROLL_THRESHOLD) {
        setMediaFullyExpanded(false);
        setHasAnimationCompleted(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        // Increase sensitivity for mobile, especially when scrolling back
        const scrollFactor = deltaY < 0 ? TOUCH_SCROLL_BACK_SENSITIVITY : TOUCH_SCROLL_FORWARD_SENSITIVITY;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
          setTimeout(() => {
            setHasAnimationCompleted(true);
          }, ANIMATION_COMPLETION_DELAY_MS);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded && !hasAnimationCompleted) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY, hasAnimationCompleted]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = MEDIA_BASE_WIDTH + scrollProgress * (isMobileState ? MEDIA_MOBILE_WIDTH_DELTA : MEDIA_DESKTOP_WIDTH_DELTA);
  const mediaHeight = MEDIA_BASE_HEIGHT + scrollProgress * (isMobileState ? MEDIA_MOBILE_HEIGHT_DELTA : MEDIA_DESKTOP_HEIGHT_DELTA);
  const textTranslateX = scrollProgress * (isMobileState ? TEXT_MOBILE_TRANSLATE_FACTOR : TEXT_DESKTOP_TRANSLATE_FACTOR);

  // Split title for the animation effect
  const titleWords = title ? title.split(' ') : [];
  const firstWord = titleWords[0] || '';
  const restOfTitle = titleWords.slice(1).join(' ');

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden"
      style={{
        minHeight: mediaFullyExpanded ? 'auto' : '100vh',
      }}
    >
      {/* Fixed Background Section - During animation */}
      <div
        className="fixed inset-0 z-0 flex items-center justify-center"
        style={{
          display: mediaFullyExpanded ? 'none' : 'flex',
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgImageSrc}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Hero Content Section */}
        {heroContent ? (
          // Custom hero content provided by parent
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            {typeof heroContent === 'function' 
              ? heroContent({ scrollProgress, isMobile: isMobileState, textTranslateX })
              : heroContent}
          </div>
        ) : (
          // Default title/date structure with scroll animation
          <div
            className={`absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center text-center px-4 ${
              textBlend ? 'mix-blend-difference' : ''
            }`}
            style={{
              top: isMobileState
                ? `${15 - scrollProgress * 10}%`
                : `${20 - scrollProgress * 10}%`,
            }}
          >
            {date && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block text-[#80D3EE] font-orbitron text-sm md:text-base tracking-widest mb-4"
              >
                {date}
              </motion.span>
            )}
            <h1
              className={`text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold tracking-tighter text-white ${
                textBlend ? 'mix-blend-difference' : ''
              }`}
            >
              <span
                style={{
                  display: 'inline-block',
                  transform: `translateX(-${textTranslateX}px)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                {firstWord}
              </span>{' '}
              <span
                style={{
                  display: 'inline-block',
                  transform: `translateX(${textTranslateX}px)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                {restOfTitle}
              </span>
            </h1>
            {scrollToExpand && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-white/70 text-sm mt-8"
              >
                {scrollToExpand}
              </motion.p>
            )}
          </div>
        )}

        {/* Media Container - MODIFIED: Removed max constraints for full coverage */}
        <div
          className="relative z-10 flex items-center justify-center"
          style={{
            width: `${mediaWidth}px`,
            height: `${mediaHeight}px`,
            maxWidth: '100vw',  // Changed from 95vw to allow full coverage
            maxHeight: '100vh', // Changed from 85vh to allow full coverage
            transition: 'all 0.1s ease-out',
          }}
        >
          <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl" style={{
            // Remove border radius when fully expanded
            borderRadius: scrollProgress >= BORDER_RADIUS_THRESHOLD ? '0px' : '16px',
          }}>
            {mediaType === 'video' ? (
              <video
                src={mediaSrc}
                autoPlay
                muted
                loop
                playsInline
                poster={posterSrc}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <img
                src={mediaSrc}
                alt={title || 'Media content'}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>

      {/* Frozen Hero Section - Shows as a static section after animation completes */}
      {mediaFullyExpanded && hasAnimationCompleted && (
        <div 
          className="relative z-20 min-h-screen flex items-center justify-center"
          style={{ 
            background: 'black',
          }}
        >
          {/* Video/Image Background for frozen section */}
          <div className="absolute inset-0 z-0">
            {mediaType === 'video' ? (
              <video
                src={mediaSrc}
                autoPlay
                muted
                loop
                playsInline
                poster={posterSrc}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <img
                src={mediaSrc}
                alt={title || 'Media content'}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>
      )}

      {/* Scrollable Content Section */}
      <div
        className="relative z-30 bg-transparent"
        style={{
          marginTop: mediaFullyExpanded ? 0 : '100vh',
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export type { HeroContentRenderProps };
export default ScrollExpandMedia;
