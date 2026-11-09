/*
 * Original pixel-art sprites, drawn from character grids so they stay crisp
 * at any size. One character = one pixel; '.' is transparent.
 */

export const PALETTE = {
  m: '#b6ffe9', // mint
  d: '#1e755a', // deep green
  k: '#0d2a21', // ink on mint
  w: '#ecf6f2', // highlight
  y: '#ffd166', // gold (trophy)
  o: '#c99a2e', // dark gold
};

// "Bit", the robot mascot: antenna, visor eyes, little feet.
export const ROBOT = [
  '........m.......',
  '........d.......',
  '...dddddddddd...',
  '..dmmmmmmmmmmd..',
  '..dmkkkmmkkkmd..',
  '..dmkwkmmkwkmd..',
  '..dmkkkmmkkkmd..',
  '..dmmmmmmmmmmd..',
  '..dmmkkkkkkmmd..',
  '..dmmmmmmmmmmd..',
  '...dddddddddd...',
  '.....dmmmmd.....',
  '...ddmmmmmmdd...',
  '..dmmmdmmdmmmd..',
  '..dmmmmmmmmmmd..',
  '...dd......dd...',
];

// Same robot, eyes closed: used for the blink.
const EYES_CLOSED = {
  4: '..dmmmmmmmmmmd..',
  5: '..dmkkkmmkkkmd..',
  6: '..dmmmmmmmmmmd..',
};
export const ROBOT_BLINK = ROBOT.map((row, i) => EYES_CLOSED[i] ?? row);

export const TROPHY = [
  '..yyyyyyyy..',
  'yyywyyyyyyyy',
  'y.ywyyyyyy.y',
  'y.ywyyyyyy.y',
  '.yywyyyyyyy.',
  '..yyyyyyyy..',
  '...oyyyyo...',
  '.....yy.....',
  '.....yy.....',
  '...oyyyyo...',
  '..yyyyyyyy..',
];

/** Lists every filled pixel as { x, y, c } for canvas or SVG rendering. */
export function pixels(grid) {
  const out = [];
  grid.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch !== '.') out.push({ x, y, c: PALETTE[ch] });
    })
  );
  return out;
}
