class ScoopBorderPainter {
    constructor() {
        this.c = 0.5522847498307933984022516322796;
    }

    static get inputProperties() {
        return ["--scoop-border-radius"];
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {{width: number; height: number;}} geom 
     * @param {*} properties 
     */
    paint(ctx, geom, properties) {
        const color = "black";
        const radius = this.getRadius(properties);

        const points = [
            { x: radius, y: 0 },
            { x: geom.width - radius, y: 0 },
            { x: geom.width, y: radius },
            { x: geom.width, y: geom.height - radius },
            { x: geom.width - radius, y: geom.height },
            { x: radius, y: geom.height },
            { x: 0, y: geom.height - radius },
            { x: 0, y: radius }
        ];
        const bezierRadius = radius * this.c;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.bezierCurveTo(
            geom.width - radius,
            bezierRadius,
            geom.width - bezierRadius,
            radius,
            points[2].x,
            points[2].y
        );
        ctx.lineTo(points[3].x, points[3].y);
        ctx.bezierCurveTo(
            geom.width - bezierRadius,
            geom.height - radius,
            geom.width - radius,
            geom.height - bezierRadius,
            points[4].x,
            points[4].y
        );
        ctx.lineTo(points[5].x, points[5].y);
        ctx.bezierCurveTo(
            radius,
            geom.height - bezierRadius,
            bezierRadius,
            geom.height - radius,
            points[6].x,
            points[6].y
        );
        ctx.lineTo(points[7].x, points[7].y);
        ctx.bezierCurveTo(bezierRadius, radius, radius, bezierRadius, points[0].x, points[0].y);
        ctx.closePath();
        ctx.fill();
    }

    getRadius(properties) {
        const radiusProperty = properties.get("--scoop-border-radius");

        let radius;
        switch (radiusProperty.unit) {
            case "px":
                return radiusProperty.value;
            case "percent":
                return Math.min((radius * geom.width) / 100, geom.width / 2);
            default:
                throw new Error("Unsupported unit");
        }
    }
}

registerPaint("scoop-border", ScoopBorderPainter);
