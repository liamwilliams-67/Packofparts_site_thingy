'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

// Animation constants
const WHEEL_SCROLL_SENSITIVITY = 0.0009;
const TOUCH_SCROLL_BACK_SENSITIVITY = 0.0009;
const TOUCH_SCROLL_FORWARD_SENSITIVITY = 0.0009;
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
const TEXT_VERTICAL_TRANSLATE_FACTOR = 10;

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
  frozenContent?: ReactNode; // Static content to display in the frozen section after animation completes
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
  frozenContent,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [isMobileState, setIsMobileState] = useState(false);
  const [hasAnimationCompleted, setHasAnimationCompleted] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Refs for event handler values to avoid recreating listeners on every state change
  const scrollProgressRef = useRef(0);
  const mediaFullyExpandedRef = useRef(false);
  const touchStartYRef = useRef(0);
  const hasAnimationCompletedRef = useRef(false);

  // RAF debouncing ref
  const rafRef = useRef(0);

  // Reset state when mediaType changes - this is an intentional pattern for resetting animation state
  useEffect(() => {
    // Using a microtask to avoid the synchronous setState warning
    queueMicrotask(() => {
      setScrollProgress(0);
      setShowContent(false);
      setMediaFullyExpanded(false);
      setHasAnimationCompleted(false);
      scrollProgressRef.current = 0;
      mediaFullyExpandedRef.current = false;
      hasAnimationCompletedRef.current = false;
    });
  }, [mediaType]);

  // RAF-debounced progress update to limit re-renders to one per animation frame
  const scheduleProgressUpdate = useCallback((newProgress: number) => {
    scrollProgressRef.current = newProgress;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setScrollProgress(newProgress);
      rafRef.current = 0;
    });
  }, []);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (hasAnimationCompletedRef.current) {
        if (e.deltaY < 0 && window.scrollY <= SCROLL_THRESHOLD) {
          return;
        }
        return;
      }
      
      if (mediaFullyExpandedRef.current && e.deltaY < 0 && window.scrollY <= SCROLL_THRESHOLD) {
        mediaFullyExpandedRef.current = false;
        hasAnimationCompletedRef.current = false;
        setMediaFullyExpanded(false);
        setHasAnimationCompleted(false);
        e.preventDefault();
      } else if (!mediaFullyExpandedRef.current) {
        e.preventDefault();
        const scrollDelta = e.deltaY * WHEEL_SCROLL_SENSITIVITY;
        const newProgress = Math.min(
          Math.max(scrollProgressRef.current + scrollDelta, 0),
          1
        );
        scheduleProgressUpdate(newProgress);

        if (newProgress >= 1) {
          mediaFullyExpandedRef.current = true;
          setMediaFullyExpanded(true);
          setShowContent(true);
          setTimeout(() => {
            hasAnimationCompletedRef.current = true;
            setHasAnimationCompleted(true);
          }, ANIMATION_COMPLETION_DELAY_MS);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartYRef.current) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY;

      if (hasAnimationCompletedRef.current) {
        if (deltaY < TOUCH_SWIPE_THRESHOLD && window.scrollY <= SCROLL_THRESHOLD) {
          return;
        }
        return;
      }

      if (mediaFullyExpandedRef.current && deltaY < TOUCH_SWIPE_THRESHOLD && window.scrollY <= SCROLL_THRESHOLD) {
        mediaFullyExpandedRef.current = false;
        hasAnimationCompletedRef.current = false;
        setMediaFullyExpanded(false);
        setHasAnimationCompleted(false);
        e.preventDefault();
      } else if (!mediaFullyExpandedRef.current) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? TOUCH_SCROLL_BACK_SENSITIVITY : TOUCH_SCROLL_FORWARD_SENSITIVITY;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgressRef.current + scrollDelta, 0),
          1
        );
        scheduleProgressUpdate(newProgress);

        if (newProgress >= 1) {
          mediaFullyExpandedRef.current = true;
          setMediaFullyExpanded(true);
          setShowContent(true);
          setTimeout(() => {
            hasAnimationCompletedRef.current = true;
            setHasAnimationCompleted(true);
          }, ANIMATION_COMPLETION_DELAY_MS);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        touchStartYRef.current = touchY;
      }
    };

    const handleTouchEnd = (): void => {
      touchStartYRef.current = 0;
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpandedRef.current && !hasAnimationCompletedRef.current) {
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
  }, [scheduleProgressUpdate]);

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
  // Scale factors for GPU-composited transform (avoids layout reflow from width/height changes)
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 1;
  const scaleX = Math.min(mediaWidth / vw, 1);
  const scaleY = Math.min(mediaHeight / vh, 1);
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
            decoding="async"
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
            className={`absolute left-1/2 z-20 flex flex-col items-center justify-center text-center px-4 ${
              textBlend ? 'mix-blend-difference' : ''
            }`}
            style={{
              top: isMobileState ? '15%' : '20%',
              transform: `translateX(-50%) translateY(${-scrollProgress * TEXT_VERTICAL_TRANSLATE_FACTOR}vh)`,
              willChange: 'transform',
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

        {/* Media Container - GPU-accelerated scale transform */}
        <div
          className="relative z-10 flex items-center justify-center"
          style={{
            width: '100vw',
            height: '100vh',
            transform: `scale(${scaleX}, ${scaleY})`,
            willChange: 'transform',
          }}
        >
          <div className="relative w-full h-full overflow-hidden" style={{
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
                decoding="async"
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
                decoding="async"
              />
            )}
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          {/* Frozen content - displays the static text with original formatting */}
          {frozenContent && (
            <div className="relative z-10">
              {frozenContent}
            </div>
          )}
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
