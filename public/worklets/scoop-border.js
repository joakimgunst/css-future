class ScoopBorderPainter {
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
        const radius = this.getRadius(geom, properties);
        const { width, height } = geom;

        const points = [
            { x: radius, y: 0 },
            { x: width - radius, y: 0 },
            { x: width, y: radius },
            { x: width, y: height - radius },
            { x: width - radius, y: height },
            { x: radius, y: height },
            { x: 0, y: height - radius },
            { x: 0, y: radius }
        ];

        const bezierFactor = (4 / 3) * Math.tan(Math.PI / 8);
        const bezierRadius = radius * bezierFactor;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(radius, 0);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.bezierCurveTo(
            width - radius,
            bezierRadius,
            width - bezierRadius,
            radius,
            points[2].x,
            points[2].y
        );
        ctx.lineTo(points[3].x, points[3].y);
        ctx.bezierCurveTo(
            width - bezierRadius,
            height - radius,
            width - radius,
            height - bezierRadius,
            points[4].x,
            points[4].y
        );
        ctx.lineTo(points[5].x, points[5].y);
        ctx.bezierCurveTo(
            radius,
            height - bezierRadius,
            bezierRadius,
            height - radius,
            points[6].x,
            points[6].y
        );
        ctx.lineTo(points[7].x, points[7].y);
        ctx.bezierCurveTo(
            bezierRadius,
            radius,
            radius,
            bezierRadius,
            points[0].x,
            points[0].y
        );
        ctx.closePath();
        ctx.fill();
    }

    getRadius(geom, properties) {
        const radiusProperty = properties.get("--scoop-border-radius");
        switch (radiusProperty.unit) {
            case "px":
                return radiusProperty.value;
            case "percent":
                return (radiusProperty.value * geom.width) / 100;
            default:
                throw new Error("Unsupported unit");
        }
    }
}

registerPaint("scoop-border", ScoopBorderPainter);
