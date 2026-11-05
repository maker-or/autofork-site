// Shared canvas helpers for the star visuals.

// Four-point star, same silhouette as the SVG symbol.
export const starPath = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
	const k = r * 0.1;
	ctx.beginPath();
	ctx.moveTo(x, y - r);
	ctx.lineTo(x + k, y - k);
	ctx.lineTo(x + r, y);
	ctx.lineTo(x + k, y + k);
	ctx.lineTo(x, y + r);
	ctx.lineTo(x - k, y + k);
	ctx.lineTo(x - r, y);
	ctx.lineTo(x - k, y - k);
	ctx.closePath();
};

export const makeRand = (seed: number) => () => {
	seed = (seed * 1664525 + 1013904223) >>> 0;
	return seed / 4294967296;
};

export const easeOut = (t: number) => 1 - (1 - t) ** 3;

// A pre-rendered glowing star, so many bright stars stay cheap to draw.
export const SPRITE = 48;
export const SPRITE_R = 11;

export const makeSprite = (dpr: number) => {
	const c = document.createElement('canvas');
	c.width = c.height = Math.round(SPRITE * dpr);
	const g = c.getContext('2d')!;
	g.scale(dpr, dpr);
	g.shadowColor = 'rgba(244,242,238,0.7)';
	g.shadowBlur = 14 * dpr;
	g.fillStyle = 'rgb(244,242,238)';
	starPath(g, SPRITE / 2, SPRITE / 2, SPRITE_R);
	g.fill();
	return c;
};

// Draw the sprite so the star itself has radius r.
export const drawSprite = (ctx: CanvasRenderingContext2D, sprite: HTMLCanvasElement, x: number, y: number, r: number) => {
	const size = (SPRITE * r) / SPRITE_R;
	ctx.drawImage(sprite, x - size / 2, y - size / 2, size, size);
};
