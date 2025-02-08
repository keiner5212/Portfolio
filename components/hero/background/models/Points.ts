export class Point {
    x: number;
    y: number;
    size: number;
    velx: number;
    vely: number;
    color: string;

    constructor(x: number, y: number, size: number, velx: number, vely: number, color: string) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.velx = velx;
        this.vely = vely;
        this.color = color;
    }
}