"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
	to: number;
	suffix?: string;
	prefix?: string;
	duration?: number;
}

export function Counter({ to, suffix, prefix, duration = 1400 }: CounterProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: "-50px" });
	const [value, setValue] = useState(0);

	useEffect(() => {
		if (!inView) return;
		const start = performance.now();
		let raf = 0;
		const tick = (now: number) => {
			const t = Math.min((now - start) / duration, 1);
			const eased = 1 - Math.pow(1 - t, 3);
			setValue(Math.round(to * eased));
			if (t < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [inView, to, duration]);

	return (
		<span ref={ref} className="tabular-nums">
			{prefix}
			{value}
			{suffix}
		</span>
	);
}
