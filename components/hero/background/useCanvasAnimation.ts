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
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    return /android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent.toLowerCase());
}

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

    const [POINTS_COLOR, setPointsColor] = useState<string>("#fff");
    const [NUMBER_OF_POINTS, setNumberOfPoints] = useState(0);

    useEffect(() => {
        if (theme === "dark") {
            setPointsColor("#fff");
        } else if (theme === "light") {
            setPointsColor("#000");
        }
    }, [theme]);

    useEffect(() => {
        setNumberOfPoints(isMobileDevice() ? POINTS_MOBILE : POINTS_DESKTOP);
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

        const canvas = canvasRef.current;
        const newPoints: Point[] = [];
        for (let i = 0; i < NUMBER_OF_POINTS; i++) {
            newPoints.push(new Point(
                getRamdomX(canvas.width),
                getRamdomY(canvas.height),
                getSizePoint(),
                ((Math.random() - 0.5) * INITIAL_VEL_MULIPLIER) / FPS,
                ((Math.random() - 0.5) * INITIAL_VEL_MULIPLIER) / FPS
            ));
        }
        setPoints(newPoints);
    }, [NUMBER_OF_POINTS]);

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

        // Physics — identical for both renderers
        for (const point of pts) {
            point.x += point.velx;
            point.y += point.vely;

            if (point.x < 0 || point.x > canvas.width) {
                if (POINTS_BOUNCE) {
                    point.velx *= -1;
                } else {
                    point.x = point.x < 0 ? canvas.width : 0;
                }
            }
            if (point.y < 0 || point.y > canvas.height) {
                if (POINTS_BOUNCE) {
                    point.vely *= -1;
                } else {
                    point.y = point.y < 0 ? canvas.height : 0;
                }
            }
            if (
                point.x < -point.size ||
                point.x > canvas.width + point.size ||
                point.y < -point.size ||
                point.y > canvas.height + point.size
            ) {
                point.x = getRamdomX(canvas.width);
                point.y = getRamdomY(canvas.height);
            }
        }

        if (useWebGPURef.current && rendererRef.current?.ready) {
            rendererRef.current.render(
                pts,
                POINTS_COLOR,
                POINTS_HOVER_COLOR,
                canvas.width,
                canvas.height,
            );
            return;
        }

        // Canvas 2D fallback (default and only path when WebGPU is off / not ready)
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        clearCanvas(ctx);
        DrawPoints(pts, ctx, POINTS_COLOR, POINTS_HOVER_COLOR);
        DrawLines(pts, ctx, POINTS_COLOR, POINTS_HOVER_COLOR);
    }, [POINTS_COLOR, canvasRef]);

    useEffect(() => {
        const id = setInterval(update, 1000 / FPS);
        return () => clearInterval(id);
    }, [update]);

    useEffect(() => {
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas, { passive: true });
        return () => window.removeEventListener("resize", resizeCanvas);
    }, [resizeCanvas]);

    useEffect(() => {
        let throttleTimeout: NodeJS.Timeout | null = null;
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = event.clientX;
            mouseY = event.clientY;

            if (throttleTimeout) return;
            throttleTimeout = setTimeout(() => { throttleTimeout = null; }, HOVER_THROTTLE_MS);

            pointsRef.current.forEach((point) => {
                if (
                    Math.abs(mouseX - point.x) < HOVER_RADIUS &&
                    Math.abs(mouseY - point.y) < HOVER_RADIUS
                ) {
                    if (point.hoverTimeout) {
                        clearTimeout(point.hoverTimeout);
                    }

                    const newVelx = point.velx * HOVER_VELOCITY_MULTIPLIER;
                    const newVely = point.vely * HOVER_VELOCITY_MULTIPLIER;
                    const isMaxVelocity =
                        Math.abs(newVelx) > MAX_HOVER_VELOCITY ||
                        Math.abs(newVely) > MAX_HOVER_VELOCITY;

                    point.velx = isMaxVelocity ? Math.sign(newVelx) * MAX_HOVER_VELOCITY : newVelx;
                    point.vely = isMaxVelocity ? Math.sign(newVely) * MAX_HOVER_VELOCITY : newVely;

                    if (!isMaxVelocity) point.hoverCount++;
                    point.hoverProgress = 1;

                    point.hoverTimeout = setTimeout(() => {
                        if (
                            Math.abs(mouseX - point.x) < HOVER_RADIUS &&
                            Math.abs(mouseY - point.y) < HOVER_RADIUS
                        ) {
                            return;
                        }

                        const reduceVelocity = () => {
                            if (point.hoverCount > 0) {
                                point.velx /= HOVER_VELOCITY_MULTIPLIER;
                                point.vely /= HOVER_VELOCITY_MULTIPLIER;
                                point.hoverCount--;
                                if (point.hoverCount > 0) {
                                    setTimeout(reduceVelocity, HOVER_THROTTLE_MS);
                                } else {
                                    point.hoverProgress = 0;
                                }
                            }
                        };

                        reduceVelocity();
                        point.hoverTimeout = undefined;
                    }, HOVER_RESET_DELAY_MS);
                }
            });
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (throttleTimeout) clearTimeout(throttleTimeout);
            pointsRef.current.forEach((point) => {
                if (point.hoverTimeout) clearTimeout(point.hoverTimeout);
            });
        };
    }, []);
};
