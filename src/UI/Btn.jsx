import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';

export function Btn({
  title,
  little, // supported alias for title
  children,
  onClick,
  magnetic = false,
  theme = 1,
  className = '',
  to,
  type = 'button',
}) {
  const label = title ?? little ?? children ?? 'Explore Gallery';

  const isTheme2 = Number(theme) === 2 || theme === '2' || theme === 'reverse';
  const normalLabelColor = isTheme2 ? '#0F2A1B' : '#ffffff';
  const hoverLabelColor = isTheme2 ? '#f7f4ea' : '#0F2A1B';

  const btnRef = useRef(null);
  const pillRef = useRef(null);
  const labelRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    if (labelRef.current) {
      gsap.set(labelRef.current, { color: normalLabelColor });
    }
  }, [theme, isTheme2, normalLabelColor]);

  // Hover Enter: Left circle expands across the full button width with 4px (p-1) padding
  const handleMouseEnter = () => {
    gsap.to(pillRef.current, {
      width: 'calc(100% - 8px)',
      duration: 0.42,
      ease: 'power3.inOut',
      overwrite: 'auto',
    });
    gsap.to(labelRef.current, {
      color: hoverLabelColor,
      x: 2,
      duration: 0.34,
      ease: 'power2.out',
      overwrite: 'auto',
    });
    gsap.to(arrowRef.current, {
      x: 3,
      duration: 0.38,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  // Hover Move: Kept completely stable (no bubble wobbling)
  const handleMouseMove = (e) => {
    if (!magnetic || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;

    // Extremely micro movement only if explicitly requested
    gsap.to(btnRef.current, {
      x: relX * 0.04,
      y: relY * 0.04,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  // Hover Leave: Pill smoothly retracts back into the 36px left circle
  const handleMouseLeave = () => {
    gsap.to(pillRef.current, {
      width: '36px',
      duration: 0.4,
      ease: 'power3.inOut',
      overwrite: 'auto',
    });
    gsap.to(labelRef.current, {
      color: normalLabelColor,
      x: 0,
      duration: 0.34,
      ease: 'power2.out',
      overwrite: 'auto',
    });
    gsap.to(arrowRef.current, {
      x: 0,
      duration: 0.36,
      ease: 'power3.out',
      overwrite: 'auto',
    });
    // Keep button firmly in place with no bubble wobbling
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleMouseDown = () => {
    gsap.to(btnRef.current, { scale: 0.98, duration: 0.1, ease: 'power2.out' });
  };

  const handleMouseUp = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.2, ease: 'power2.out' });
  };

  const content = (
    <>
      {/* Expanding Pill (starts as exact circle on the left with 4px padding, fills full width on hover) */}
      <span
        ref={pillRef}
        style={{ width: '36px' }}
        className={`pointer-events-none absolute left-1 top-1 bottom-1 rounded-full ${
          isTheme2 ? 'bg-[#0F2A1B]' : 'bg-[#f7f4ea]'
        }`}
      />

      {/* Left Arrow Icon inside the circle */}
      <span
        className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          isTheme2 ? 'text-[#f7f4ea]' : 'text-[#0F2A1B]'
        }`}
      >
        <svg
          ref={arrowRef}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="stroke-current will-change-transform"
        >
          <path
            d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
            strokeWidth="1.65"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* Label Text */}
      <span
        ref={labelRef}
        style={{ color: normalLabelColor }}
        className="relative z-10 pl-3 pr-6 text-[14.5px] font-medium tracking-[-0.01em] whitespace-nowrap leading-none"
      >
        {label}
      </span>
    </>
  );

  const sharedProps = {
    ref: btnRef,
    onClick,
    onMouseEnter: handleMouseEnter,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    className: `relative inline-flex h-[44px] items-center rounded-full no-underline ${
      isTheme2 ? 'bg-[#f7f4ea]' : 'bg-[#0F2A1B]'
    } p-1 cursor-pointer select-none will-change-transform ${className}`,
  };

  if (to) {
    return (
      <Link to={to} {...sharedProps}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} {...sharedProps}>
      {content}
    </button>
  );
}