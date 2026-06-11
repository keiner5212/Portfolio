import { LINE_DISTANCE_SQ, LINE_MAX_DISTANCE, POINT_ALPHA, POINTS_DESKTOP } from "./utils/constants";
import { Point } from "./models/Points";

// GPU buffer usage flags (WebGPU spec numeric values)
const USAGE_VERTEX_COPY_DST = 0x0020 | 0x0008;

const CIRCLE_VERTS_PER_POINT = 6; // 2 triangles per quad
const MAX_LINE_VERTS = POINTS_DESKTOP * POINTS_DESKTOP * 2;

// Stride in bytes: pos(vec2f=8) + uv(vec2f=8) + col(vec4f=16) = 32
const CIRCLE_STRIDE = 32;
// Stride in bytes: pos(vec2f=8) + col(vec4f=16) = 24
const LINE_STRIDE = 24;

// UV coords for two triangles forming a unit quad
const QUAD_UVS = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];

const CIRCLE_SHADER = `
struct VertexIn {
    @location(0) pos : vec2f,
    @location(1) uv  : vec2f,
    @location(2) col : vec4f,
}
struct VertexOut {
    @builtin(position) pos : vec4f,
    @location(0) uv        : vec2f,
    @location(1) col       : vec4f,
}
@vertex fn vs(in: VertexIn) -> VertexOut {
    var out: VertexOut;
    out.pos = vec4f(in.pos, 0.0, 1.0);
    out.uv  = in.uv;
    out.col = in.col;
    return out;
}
@fragment fn fs(in: VertexOut) -> @location(0) vec4f {
    if (length(in.uv) > 1.0) { discard; }
    return in.col;
}
`;

const LINE_SHADER = `
struct VertexIn {
    @location(0) pos : vec2f,
    @location(1) col : vec4f,
}
struct VertexOut {
    @builtin(position) pos : vec4f,
    @location(0) col       : vec4f,
}
@vertex fn vs(in: VertexIn) -> VertexOut {
    var out: VertexOut;
    out.pos = vec4f(in.pos, 0.0, 1.0);
    out.col = in.col;
    return out;
}
@fragment fn fs(in: VertexOut) -> @location(0) vec4f {
    return in.col;
}
`;

function hexToRgb(hex: string): [number, number, number] {
    let h = hex.replace("#", "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    const n = parseInt(h, 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export class WebGPURenderer {
    private canvas: HTMLCanvasElement;
    private context: any = null;
    private device: any = null;
    private format: string = "bgra8unorm";
    private circlePipeline: any = null;
    private linePipeline: any = null;
    private circleBuf: any = null;
    private lineBuf: any = null;
    private _ready = false;
    private _destroyed = false;
    private _unsupported = false;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    get ready() { return this._ready; }
    get unsupported() { return this._unsupported; }
    get destroyed() { return this._destroyed; }

    async initialize(): Promise<void> {
        if (this._destroyed || this._ready) return;

        const gpu = (navigator as any).gpu;
        if (!gpu) {
            this._unsupported = true;
            return;
        }

        try {
            const adapter = await gpu.requestAdapter();
            if (!adapter || this._destroyed) {
                this._unsupported = true;
                return;
            }

            const device = await adapter.requestDevice();
            if (this._destroyed) {
                device.destroy();
                this._unsupported = true;
                return;
            }

            // Lock canvas to WebGPU ONLY after adapter + device are confirmed
            this.context = this.canvas.getContext("webgpu");
            if (!this.context) {
                device.destroy();
                this._unsupported = true;
                return;
            }

            this.format = gpu.getPreferredCanvasFormat();

            (this.context as any).configure({
                device,
                format: this.format,
                alphaMode: "premultiplied",
            });

            const premulBlend = {
                color: { srcFactor: "one", dstFactor: "one-minus-src-alpha", operation: "add" },
                alpha: { srcFactor: "one", dstFactor: "one-minus-src-alpha", operation: "add" },
            };

            const circleModule = device.createShaderModule({ code: CIRCLE_SHADER });
            const lineModule   = device.createShaderModule({ code: LINE_SHADER });

            this.circlePipeline = device.createRenderPipeline({
                layout: "auto",
                vertex: {
                    module: circleModule,
                    entryPoint: "vs",
                    buffers: [{
                        arrayStride: CIRCLE_STRIDE,
                        attributes: [
                            { shaderLocation: 0, offset: 0,  format: "float32x2" },
                            { shaderLocation: 1, offset: 8,  format: "float32x2" },
                            { shaderLocation: 2, offset: 16, format: "float32x4" },
                        ],
                    }],
                },
                fragment: {
                    module: circleModule,
                    entryPoint: "fs",
                    targets: [{ format: this.format, blend: premulBlend }],
                },
                primitive: { topology: "triangle-list" },
            });

            this.linePipeline = device.createRenderPipeline({
                layout: "auto",
                vertex: {
                    module: lineModule,
                    entryPoint: "vs",
                    buffers: [{
                        arrayStride: LINE_STRIDE,
                        attributes: [
                            { shaderLocation: 0, offset: 0, format: "float32x2" },
                            { shaderLocation: 1, offset: 8, format: "float32x4" },
                        ],
                    }],
                },
                fragment: {
                    module: lineModule,
                    entryPoint: "fs",
                    targets: [{ format: this.format, blend: premulBlend }],
                },
                primitive: { topology: "line-list" },
            });

            this.circleBuf = device.createBuffer({
                size: POINTS_DESKTOP * CIRCLE_VERTS_PER_POINT * CIRCLE_STRIDE,
                usage: USAGE_VERTEX_COPY_DST,
            });
            this.lineBuf = device.createBuffer({
                size: MAX_LINE_VERTS * LINE_STRIDE,
                usage: USAGE_VERTEX_COPY_DST,
            });

            this.device = device;
            this._ready = true;
        } catch {
            this._unsupported = true;
        }
    }

    render(points: Point[], pointsColor: string, hoverColor: string, width: number, height: number) {
        if (!this._ready || !this.device || !this.context) return;

        const w = Math.max(width, 1);
        const h = Math.max(height, 1);

        // Build circle vertex data (premultiplied alpha)
        const circleData = new Float32Array(points.length * CIRCLE_VERTS_PER_POINT * 8);
        let ci = 0;
        for (const pt of points) {
            const [r, g, b] = hexToRgb(pt.hoverProgress > 0 ? hoverColor : pointsColor);
            const a = POINT_ALPHA;
            // Convert from canvas pixel space to NDC (Y flipped)
            const cx = (2 * pt.x / w) - 1;
            const cy = 1 - (2 * pt.y / h);
            const rx = (2 * pt.size) / w;
            const ry = (2 * pt.size) / h;
            for (let v = 0; v < 6; v++) {
                const uvx = QUAD_UVS[v * 2];
                const uvy = QUAD_UVS[v * 2 + 1];
                circleData[ci++] = cx + uvx * rx;
                circleData[ci++] = cy + uvy * ry;
                circleData[ci++] = uvx;
                circleData[ci++] = uvy;
                circleData[ci++] = r * a; // premultiplied
                circleData[ci++] = g * a;
                circleData[ci++] = b * a;
                circleData[ci++] = a;
            }
        }

        // Build line vertex data (premultiplied alpha)
        const lineVerts: number[] = [];
        for (let p = 0; p < points.length; p++) {
            const pt = points[p];
            const [r, g, b] = hexToRgb(pt.hoverProgress > 0 ? hoverColor : pointsColor);
            const x1 = (2 * pt.x / w) - 1;
            const y1 = 1 - (2 * pt.y / h);
            for (let q = 0; q < points.length; q++) {
                if (p === q) continue;
                const np = points[q];
                const dx = pt.x - np.x;
                const dy = pt.y - np.y;
                const distSq = dx * dx + dy * dy;
                if (distSq >= LINE_DISTANCE_SQ) continue;
                const dist = Math.sqrt(distSq);
                const opacity = Math.max(0.05, 1 - dist / LINE_MAX_DISTANCE);
                const x2 = (2 * np.x / w) - 1;
                const y2 = 1 - (2 * np.y / h);
                lineVerts.push(x1, y1, r * opacity, g * opacity, b * opacity, opacity);
                lineVerts.push(x2, y2, r * opacity, g * opacity, b * opacity, opacity);
            }
        }

        this.device.queue.writeBuffer(this.circleBuf, 0, circleData);

        const lineData = new Float32Array(lineVerts);
        if (lineData.byteLength > 0) {
            this.device.queue.writeBuffer(this.lineBuf, 0, lineData);
        }

        const encoder = this.device.createCommandEncoder();
        const pass = encoder.beginRenderPass({
            colorAttachments: [{
                view: (this.context as any).getCurrentTexture().createView(),
                clearValue: { r: 0, g: 0, b: 0, a: 0 },
                loadOp:  "clear"  as const,
                storeOp: "store" as const,
            }],
        });

        // Draw circles first, then lines on top (matches Canvas 2D order)
        pass.setPipeline(this.circlePipeline);
        pass.setVertexBuffer(0, this.circleBuf);
        pass.draw(points.length * CIRCLE_VERTS_PER_POINT);

        const lineCount = lineVerts.length / 6;
        if (lineCount > 0) {
            pass.setPipeline(this.linePipeline);
            pass.setVertexBuffer(0, this.lineBuf);
            pass.draw(lineCount);
        }

        pass.end();
        this.device.queue.submit([encoder.finish()]);
    }

    destroy() {
        this._destroyed = true;
        this._ready = false;
        this.device?.destroy();
        this.device = null;
        this.context = null;
    }
}
