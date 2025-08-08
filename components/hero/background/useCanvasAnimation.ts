/* eslint-disable react-hooks/exhaustive-deps */
import {
    useEffect,
    useRef,
    useState,
} from "react";
import {
    FPS,
    HOVER_VELOCITY_MULTIPLIER,
    INITIAL_VEL_MULIPLIER,
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
    const animationFrameId = useRef<number | null>(null);

    const [POINTS_COLOR, setPointsColor] = useState("#fff");
    const [POINTS_HOVER_COLOR, setPointsHoverColor] = useState("#989");
    const [NUMBER_OF_POINTS, setNumberOfPoints] = useState(0);


    useEffect(() => {
        if (theme == 'dark') {
            setPointsColor("#fff");
            setPointsHoverColor("#989");
        } else if (theme == 'light') {
            setPointsColor("#000");
            setPointsHoverColor("#989");
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
        updatePointsTheme();
    }, [POINTS_COLOR, POINTS_HOVER_COLOR]);

    function updatePointsTheme() {
        const updatedPoints = points.map((point) => {
            point.color = POINTS_COLOR;
            return point;
        });
        setPoints(updatedPoints);
    }

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
                ((Math.random() - 0.5) * INITIAL_VEL_MULIPLIER) / FPS,
                POINTS_COLOR
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
    const update = () => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updatedPoints = points.map((point) => {
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

            return point;
        });

        setPoints(updatedPoints);

        // Draw the updated points and lines
        clearCanvas(ctx);
        DrawPoints(updatedPoints, ctx);
        DrawLines(updatedPoints, ctx);

        // Request the next frame
        animationFrameId.current = requestAnimationFrame(update);
    };

    // Start animation
    useEffect(() => {
        animationFrameId.current = requestAnimationFrame(update);
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [points]);

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
        const handleMouseMove = (event: MouseEvent) => {
            const x = event.clientX;
            const y = event.clientY;

            const updatedPoints = points.map((point) => {
                if (
                    Math.abs(x - point.x) < 100 &&
                    Math.abs(y - point.y) < 100
                ) {
                    point.color = POINTS_HOVER_COLOR;
                    point.velx *= HOVER_VELOCITY_MULTIPLIER;
                    point.vely *= HOVER_VELOCITY_MULTIPLIER;

                    setTimeout(() => {
                        point.color = POINTS_COLOR;
                        point.velx /= HOVER_VELOCITY_MULTIPLIER;
                        point.vely /= HOVER_VELOCITY_MULTIPLIER;
                    }, 1000);
                }
                return point;
            });

            setPoints(updatedPoints);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [points]);
};