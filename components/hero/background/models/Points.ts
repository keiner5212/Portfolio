export class Point {
    x: number;
    y: number;
    size: number;
    velx: number;
    vely: number;
    hoverProgress: number;
    hoverCount: number;
    hoverTimeout?: NodeJS.Timeout;

    constructor(x: number, y: number, size: number, velx: number, vely: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.velx = velx;
        this.vely = vely;
        this.hoverProgress = 0;
        this.hoverCount = 0;
    }
}