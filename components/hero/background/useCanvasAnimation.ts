/* eslint-disable react-hooks/exhaustive-deps */
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    FPS,
    HOVER_VELOCITY_MULTIPLIER,
    INITIAL_VEL_MULIPLIER,
    MAX_HOVER_VELOCITY,
    POINTS_BOUNCE,
} from "./utils/constants";
import { getRamdomX, getRamdomY, getSizePoint } from "./utils/sizesGenerator";
import { Point } from "./models/Points";
import { DrawLines, DrawPoints, clearCanvas } from "./utils/drawer";

export function isMobileDevice(): boolean {
    if (typeof window === "undefined") return false;

    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    return /android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent.toLowerCase());
}

export const useCanvasAnimation = (canvasRef: React.RefObject<HTMLCanvasElement>, theme: string) => {
    const [points, setPoints] = useState<Point[]>([]);
    const pointsRef = useRef<Point[]>([]);

    const [POINTS_COLOR, setPointsColor] = useState("#fff");
    const [POINTS_HOVER_COLOR, _setPointsHoverColor] = useState("#989");
    const [NUMBER_OF_POINTS, setNumberOfPoints] = useState(0);


    useEffect(() => {
        if (theme == 'dark') {
            setPointsColor("#fff");
        } else if (theme == 'light') {
            setPointsColor("#000");
        }
    }, [theme]);

    useEffect(() => {
        if (isMobileDevice()) {
            setNumberOfPoints(10);
        } else {
            setNumberOfPoints(30);
        }
    }, []);

    useEffect(() => {
        pointsRef.current = points;
    }, [points]);

    // Initialize points
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const newPoints = [];
        for (let index = 0; index < NUMBER_OF_POINTS; index++) {
            const point = new Point(
                getRamdomX(canvas.width),
                getRamdomY(canvas.height),
                getSizePoint(),
                ((Math.random() - 0.5) * INITIAL_VEL_MULIPLIER) / FPS,
                ((Math.random() - 0.5) * INITIAL_VEL_MULIPLIER) / FPS
            );
            newPoints.push(point);
        }
        setPoints(newPoints);
    }, [NUMBER_OF_POINTS]);

    // Resize canvas
    const resizeCanvas = () => {
        if (canvasRef.current) {
            const parent = canvasRef.current.parentElement as HTMLElement;
            canvasRef.current.width = parent.clientWidth;
            canvasRef.current.height = parent.clientHeight;
        }
    };

    // Update points and canvas
    const update = useCallback(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        pointsRef.current.forEach((point) => {
            // Move the point by its velocity
            point.x += point.velx;
            point.y += point.vely;

            // Check if the point is out of bounds
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

            // Reset position if the point is completely out of bounds
            if (
                point.x < -point.size ||
                point.x > canvas.width + point.size ||
                point.y < -point.size ||
                point.y > canvas.height + point.size
            ) {
                point.x = getRamdomX(canvas.width);
                point.y = getRamdomY(canvas.height);
            }
        });

        // Draw the updated points and lines
        clearCanvas(ctx);
        DrawPoints(pointsRef.current, ctx, POINTS_COLOR, POINTS_HOVER_COLOR);
        DrawLines(pointsRef.current, ctx, POINTS_COLOR, POINTS_HOVER_COLOR);
    }, [POINTS_COLOR, POINTS_HOVER_COLOR, canvasRef]);

    // Start animation
    useEffect(() => {
        const intervalId = setInterval(update, 1000 / FPS);
        return () => {
            clearInterval(intervalId);
        };
    }, [update]);

    // Handle window resize
    useEffect(() => {
        resizeCanvas();
        const handleResize = () => {
            resizeCanvas();
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Handle hover effect
    useEffect(() => {
        let throttleTimeout: NodeJS.Timeout | null = null;
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = event.clientX;
            mouseY = event.clientY;

            if (throttleTimeout) return;

            throttleTimeout = setTimeout(() => {
                throttleTimeout = null;
            }, 50);

            pointsRef.current.forEach((point) => {
                if (
                    Math.abs(mouseX - point.x) < 100 &&
                    Math.abs(mouseY - point.y) < 100
                ) {
                    if (point.hoverTimeout) {
                        clearTimeout(point.hoverTimeout);
                    }
                    
                    const newVelx = point.velx * HOVER_VELOCITY_MULTIPLIER;
                    const newVely = point.vely * HOVER_VELOCITY_MULTIPLIER;
                    
                    const isMaxVelocity = Math.abs(newVelx) > MAX_HOVER_VELOCITY || Math.abs(newVely) > MAX_HOVER_VELOCITY;
                    
                    point.velx = isMaxVelocity
                        ? Math.sign(newVelx) * MAX_HOVER_VELOCITY 
                        : newVelx;
                    point.vely = isMaxVelocity
                        ? Math.sign(newVely) * MAX_HOVER_VELOCITY 
                        : newVely;
                    
                    if (!isMaxVelocity) {
                        point.hoverCount++;
                    }
                    point.hoverProgress = 1;

                    point.hoverTimeout = setTimeout(() => {
                        if (
                            Math.abs(mouseX - point.x) < 100 &&
                            Math.abs(mouseY - point.y) < 100
                        ) {
                            return;
                        }
                        
                        const reduceVelocity = () => {
                            if (point.hoverCount > 0) {
                                point.velx /= HOVER_VELOCITY_MULTIPLIER;
                                point.vely /= HOVER_VELOCITY_MULTIPLIER;
                                point.hoverCount--;
                                
                                if (point.hoverCount > 0) {
                                    setTimeout(reduceVelocity, 50);
                                } else{
                                    point.hoverProgress = 0;
                                }
                            }
                        };
                        
                        reduceVelocity();
                        point.hoverTimeout = undefined;
                    }, 1000);
                }
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (throttleTimeout) clearTimeout(throttleTimeout);
            pointsRef.current.forEach(point => {
                if (point.hoverTimeout) {
                    clearTimeout(point.hoverTimeout);
                }
            });
        };
    }, []);
};