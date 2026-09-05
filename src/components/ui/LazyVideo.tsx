"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  className?: string;
  playbackRate?: number;
};

/**
 * Shows only the poster until the video scrolls near the viewport,
 * then attaches the source and autoplays. Keeps initial page load light.
 */
export default function LazyVideo({ src, poster, className = "", playbackRate }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || active) return;

    const check = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 600 && rect.bottom > -600) {
        setActive(true);
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [active]);

  useEffect(() => {
    if (active && ref.current) {
      if (playbackRate) ref.current.playbackRate = playbackRate;
      ref.current.play().catch(() => {});
    }
  }, [active, playbackRate]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      className={className}
      src={active ? src : undefined}
    />
  );
}
