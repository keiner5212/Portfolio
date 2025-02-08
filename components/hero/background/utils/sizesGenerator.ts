import { MAX_SIZE_POINTS, MIN_SIZE_POINTS } from "./constants";

export function getSizePoint(): number {
    return MIN_SIZE_POINTS / 2 + Math.floor(Math.random() * MAX_SIZE_POINTS / 2);
}

export function getRamdomY(canvasHeight: number): number {
    return Math.floor(Math.random() * canvasHeight);
}

export function getRamdomX(canvasWidth: number): number {
    return Math.floor(Math.random() * canvasWidth);
}