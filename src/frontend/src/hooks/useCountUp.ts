import { useEffect, useRef, useState } from "react";

export function useCountUp(
  end: number,
  duration = 2000,
  start = 0,
  triggerOnMount = false,
) {
  const [count, setCount] = useState(triggerOnMount ? start : start);
  const [hasStarted, setHasStarted] = useState(triggerOnMount);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);

  const trigger = () => setHasStarted(true);

  useEffect(() => {
    if (!hasStarted) return;

    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(start + (end - start) * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [hasStarted, end, start, duration]);

  return { count, trigger };
}
