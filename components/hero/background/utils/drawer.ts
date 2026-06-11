import { LINE_DISTANCE_SQ, LINE_MAX_DISTANCE, POINT_ALPHA } from "./constants";
import { Point } from "../models/Points";

export function DrawPoints(
    points: Point[],
    ctx: CanvasRenderingContext2D,
    baseColor: string,
    hoverColor: string
): void {
    for (const point of points) {
        const useHoverColor = point.hoverProgress > 0;
        const { r, g, b } = hexToRgb(useHoverColor ? hoverColor : baseColor);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${POINT_ALPHA})`;
        ctx.arc(point.x, point.y, point.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

export function DrawLines(
    points: Point[],
    ctx: CanvasRenderingContext2D,
    baseColor: string,
    hoverColor: string
): void {
    for (const point of points) {
        const nearPoints: Point[] = [];
        for (const nearPoint of points) {
            if (point !== nearPoint) {
                const distanceX = point.x - nearPoint.x;
                const distanceY = point.y - nearPoint.y;

                const distanceSquared = distanceX * distanceX + distanceY * distanceY;
                if (distanceSquared < LINE_DISTANCE_SQ) {
                    nearPoints.push(nearPoint);
                }
            }
        }

        const useHoverColor = point.hoverProgress > 0;
        const { r, g, b } = hexToRgb(useHoverColor ? hoverColor : baseColor);

        for (const nearPoint of nearPoints) {
            const distanceX = point.x - nearPoint.x;
            const distanceY = point.y - nearPoint.y;
            const distanceSquared = distanceX * distanceX + distanceY * distanceY;

            const distance = Math.sqrt(distanceSquared);
            const opacity = Math.max(0.05, 1 - (distance / LINE_MAX_DISTANCE));

            ctx.beginPath();
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(nearPoint.x, nearPoint.y);
            ctx.stroke();
            ctx.closePath();
        }
    }
}

export function clearCanvas(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    ctx.clearRect(0, 0, width, height);
}

function hexToRgb(hex: string): { r: number, g: number, b: number } {
    hex = hex.replace('#', '');

    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
}