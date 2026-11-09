import { pixels, ROBOT } from '../lib/sprites';

export default function Sprite({ grid = ROBOT, size = 64, className = '', title }) {
  const w = grid[0].length;
  const h = grid.length;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={size}
      height={(size * h) / w}
      className={className}
      shapeRendering="crispEdges"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
    >
      {pixels(grid).map((p) => (
        <rect key={`${p.x}-${p.y}`} x={p.x} y={p.y} width="1" height="1" fill={p.c} />
      ))}
    </svg>
  );
}
