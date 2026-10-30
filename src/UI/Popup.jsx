import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { X } from "lucide-react";

export function Popup({
  children,
  component: Component,
  content,
  isOpen = true,
  onClose,
  className = "",
}) {
  const [visible, setVisible] = useState(isOpen);
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    if (modalRef.current && overlayRef.current) {
      gsap.to(modalRef.current, {
        scale: 0.95,
        opacity: 0,
        y: 15,
        duration: 0.22,
        ease: "power2.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          setVisible(false);
          if (onClose) onClose();
        },
      });
    } else {
      setVisible(false);
      if (onClose) onClose();
    }
  };

  useEffect(() => {
    if (visible && modalRef.current && overlayRef.current) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        modalRef.current,
        { scale: 0.92, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.38, ease: "back.out(1.2)" }
      );
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && visible) handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-xl"
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/3 h-[420px] w-[420px] rounded-full bg-emerald-600/15 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[420px] w-[420px] rounded-full bg-amber-500/15 blur-[130px]" />
      </div>

      <div
        ref={modalRef}
        className={`relative my-8 w-full max-w-2xl overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#143523]/95 via-[#0e271a]/98 to-[#091a11] p-6 sm:p-10 text-cream shadow-[0_30px_90px_rgba(0,0,0,0.7)] border border-white/15 backdrop-blur-2xl ${className}`}
      >
        <button
          type="button"
          onClick={handleClose}
          className="group absolute top-6 right-6 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-cream/80 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#e2ab35] hover:bg-[#e2ab35]/15 hover:text-[#e2ab35] cursor-pointer"
          aria-label="Close popup"
        >
          <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
        </button>

        {Component ? (
          <Component close={handleClose} onClose={handleClose} />
        ) : content ? (
          content
        ) : typeof children === "function" ? (
          children({ close: handleClose })
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default Popup;

