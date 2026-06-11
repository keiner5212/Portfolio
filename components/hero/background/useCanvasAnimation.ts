/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import {
    FPS,
    HOVER_RADIUS,
    HOVER_RESET_DELAY_MS,
    HOVER_THROTTLE_MS,
    HOVER_VELOCITY_MULTIPLIER,
    INITIAL_VEL_MULIPLIER,
    MAX_HOVER_VELOCITY,
    POINTS_BOUNCE,
    POINTS_DESKTOP,
    POINTS_HOVER_COLOR,
    POINTS_MOBILE,
} from "./utils/constants";
import { getRamdomX, getRamdomY, getSizePoint } from "./utils/sizesGenerator";
import { Point } from "./models/Points";
import { DrawLines, DrawPoints, clearCanvas } from "./utils/drawer";
import { WebGPURenderer } from "./webgpuRenderer";

export function isMobileDevice(): boolean {
    if (typeof window === "undefined") return false;
    const userAgent = navigator.userAgent || navigator.vendor || "";
    return /android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent.toLowerCase());
}

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const useCanvasAnimation = (
    canvasRef: React.RefObject<HTMLCanvasElement>,
    theme: string,
) => {
    const [points, setPoints] = useState<Point[]>([]);
    const pointsRef = useRef<Point[]>([]);

    // Canvas 2D is the default. WebGPU is tried once at mount; only enabled
    // after the renderer reports `ready`. This avoids locking the canvas to
    // a WebGPU context that never finishes initializing.
    const rendererRef = useRef<WebGPURenderer | null>(null);
    const useWebGPURef = useRef(false);

    const pointsColorRef = useRef<string>("#fff");
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const [numberOfPoints, setNumberOfPoints] = useState(0);

    useEffect(() => {
        pointsColorRef.current = theme === "dark" ? "#fff" : "#000";
    }, [theme]);

    useEffect(() => {
        const initial = isMobileDevice() ? POINTS_MOBILE : POINTS_DESKTOP;
        setNumberOfPoints(initial);
    }, []);

    useEffect(() => {
        pointsRef.current = points;
    }, [points]);

    // Initialize WebGPU renderer lazily. Canvas 2D is used until ready (or
    // permanently if WebGPU is unavailable).
    useEffect(() => {
        if (!canvasRef.current) return;
        if (isMobileDevice()) return;
        if (!("gpu" in navigator)) return;

        const canvas = canvasRef.current;
        const renderer = new WebGPURenderer(canvas);
        rendererRef.current = renderer;

        renderer.initialize().then(() => {
            if (renderer.destroyed) return;
            if (renderer.ready) {
                useWebGPURef.current = true;
            }
        });

        return () => {
            renderer.destroy();
            rendererRef.current = null;
            useWebGPURef.current = false;
        };
    }, []);

    // Initialize points
    useEffect(() => {
        if (!canvasRef.current) return;
        if (numberOfPoints === 0) return;

        const canvas = canvasRef.current;
        const newPoints: Point[] = [];
        for (let i = 0; i < numberOfPoints; i++) {
            newPoints.push(
                new Point(
                    getRamdomX(canvas.width),
                    getRamdomY(canvas.height),
                    getSizePoint(),
                    ((Math.random() - 0.5) * INITIAL_VEL_MULIPLIER) / FPS,
                    ((Math.random() - 0.5) * INITIAL_VEL_MULIPLIER) / FPS,
                ),
            );
        }
        setPoints(newPoints);
    }, [numberOfPoints]);

    const resizeCanvas = useCallback(() => {
        if (canvasRef.current) {
            const parent = canvasRef.current.parentElement as HTMLElement;
            canvasRef.current.width = parent.clientWidth;
            canvasRef.current.height = parent.clientHeight;
        }
    }, []);

    const update = useCallback(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const pts = pointsRef.current;
        const w = canvas.width;
        const h = canvas.height;
        const POINTS_COLOR = pointsColorRef.current;

        // Physics — identical for both renderers
        for (let i = 0; i < pts.length; i++) {
            const point = pts[i];
            point.x += point.velx;
            point.y += point.vely;

            if (point.x < 0 || point.x > w) {
                if (POINTS_BOUNCE) point.velx *= -1;
                else point.x = point.x < 0 ? w : 0;
            }
            if (point.y < 0 || point.y > h) {
                if (POINTS_BOUNCE) point.vely *= -1;
                else point.y = point.y < 0 ? h : 0;
            }
            if (
                point.x < -point.size ||
                point.x > w + point.size ||
                point.y < -point.size ||
                point.y > h + point.size
            ) {
                point.x = getRamdomX(w);
                point.y = getRamdomY(h);
            }
        }

        if (useWebGPURef.current && rendererRef.current?.ready) {
            rendererRef.current.render(pts, POINTS_COLOR, POINTS_HOVER_COLOR, w, h);
            return;
        }

        // Canvas 2D fallback (default and only path when WebGPU is off / not ready)
        const ctx = ctxRef.current ?? canvas.getContext("2d");
        if (!ctx) return;
        ctxRef.current = ctx;
        clearCanvas(ctx, w, h);
        DrawPoints(pts, ctx, POINTS_COLOR, POINTS_HOVER_COLOR);
        DrawLines(pts, ctx, POINTS_COLOR, POINTS_HOVER_COLOR);
    }, [canvasRef]);

    // Animation loop with rAF, off-screen + visibility + reduced-motion pauses
    useEffect(() => {
        if (!canvasRef.current) return;
        if (pointsRef.current.length === 0) return;

        const canvas = canvasRef.current;
        if (prefersReducedMotion()) {
            // Render one static frame and stop
            update();
            return;
        }

        let rafId = 0;
        let last = performance.now();
        const FRAME_MS = 1000 / FPS;
        let inView = true;
        let visible = true;

        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) inView = entry.isIntersecting;
            },
            { threshold: 0 },
        );
        io.observe(canvas);

        const onVisibility = () => {
            visible = document.visibilityState === "visible";
        };
        document.addEventListener("visibilitychange", onVisibility);

        const tick = (now: number) => {
            rafId = requestAnimationFrame(tick);
            if (!inView || !visible) {
                last = now;
                return;
            }
            if (now - last < FRAME_MS) return;
            last = now;
            update();
        };
        rafId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafId);
            io.disconnect();
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, [points, update, canvasRef]);

    useEffect(() => {
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas, { passive: true });
        return () => window.removeEventListener("resize", resizeCanvas);
    }, [resizeCanvas]);

    useEffect(() => {
        let throttleTimeout: ReturnType<typeof setTimeout> | null = null;
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = event.clientX;
            mouseY = event.clientY;

            if (throttleTimeout) return;
            throttleTimeout = setTimeout(() => { throttleTimeout = null; }, HOVER_THROTTLE_MS);

            const pts = pointsRef.current;
            for (let i = 0; i < pts.length; i++) {
                const point = pts[i];
                if (
                    Math.abs(mouseX - point.x) < HOVER_RADIUS &&
                    Math.abs(mouseY - point.y) < HOVER_RADIUS
                ) {
                    if (point.hoverTimeout) clearTimeout(point.hoverTimeout);

                    const newVelx = point.velx * HOVER_VELOCITY_MULTIPLIER;
                    const newVely = point.vely * HOVER_VELOCITY_MULTIPLIER;
                    const isMaxVelocity =
                        Math.abs(newVelx) > MAX_HOVER_VELOCITY ||
                        Math.abs(newVely) > MAX_HOVER_VELOCITY;

                    point.velx = isMaxVelocity ? Math.sign(newVelx) * MAX_HOVER_VELOCITY : newVelx;
                    point.vely = isMaxVelocity ? Math.sign(newVely) * MAX_HOVER_VELOCITY : newVely;

                    if (!isMaxVelocity) point.hoverCount++;
                    point.hoverProgress = 1;

                    const px = point;
                    point.hoverTimeout = setTimeout(() => {
                        if (
                            Math.abs(mouseX - px.x) < HOVER_RADIUS &&
                            Math.abs(mouseY - px.y) < HOVER_RADIUS
                        ) {
                            return;
                        }

                        const reduceVelocity = () => {
                            if (px.hoverCount > 0) {
                                px.velx /= HOVER_VELOCITY_MULTIPLIER;
                                px.vely /= HOVER_VELOCITY_MULTIPLIER;
                                px.hoverCount--;
                                if (px.hoverCount > 0) {
                                    setTimeout(reduceVelocity, HOVER_THROTTLE_MS);
                                } else {
                                    px.hoverProgress = 0;
                                }
                            }
                        };

                        reduceVelocity();
                        px.hoverTimeout = undefined;
                    }, HOVER_RESET_DELAY_MS);
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (throttleTimeout) clearTimeout(throttleTimeout);
            const pts = pointsRef.current;
            for (let i = 0; i < pts.length; i++) {
                if (pts[i].hoverTimeout) clearTimeout(pts[i].hoverTimeout);
            }
        };
    }, []);
};
