// Move generator correctness via perft (node counts from the Chess Programming Wiki),
// plus a few game-state and search sanity checks.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const ENGINE = createRequire(import.meta.url)('../src/engine.js');
const { Game, search, START, sqIdx } = ENGINE();

function perft(g, depth) {
  if (depth === 0) return 1;
  const moves = g.moves();
  if (depth === 1) return moves.length;
  let n = 0;
  for (const m of moves) { g.make(m); n += perft(g, depth - 1); g.undo(); }
  return n;
}

const POSITIONS = [
  ['position initiale', START, [20, 400, 8902, 197281]],
  ['kiwipete', 'r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1', [48, 2039, 97862]],
  ['position 3', '8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1', [14, 191, 2812, 43238]],
  ['position 4', 'r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1', [6, 264, 9467]],
  ['position 5', 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8', [44, 1486, 62379]],
];

for (const [name, fen, counts] of POSITIONS) {
  test(`perft : ${name}`, () => {
    const g = new Game(fen);
    counts.forEach((expected, i) => assert.equal(perft(g, i + 1), expected, `profondeur ${i + 1}`));
    assert.equal(g.fen(), fen, 'la position est restaurée après make/undo');
  });
}

test('mat du berger détecté', () => {
  const g = new Game('r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4');
  assert.deepEqual(g.status(), { over: true, result: '1-0', reason: 'checkmate' });
});

test('pat détecté', () => {
  const g = new Game('7k/5Q2/6K1/8/8/8/8/8 b - - 0 1');
  assert.equal(g.status().reason, 'stalemate');
});

test('matériel insuffisant détecté', () => {
  assert.equal(new Game('8/8/4k3/8/8/3NK3/8/8 w - - 0 1').status().reason, 'material');
});

test("l'ordinateur trouve un mat en un", () => {
  const r = search('6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1', { depth: 3, time: 5000 });
  assert.equal(r.to, sqIdx('d8'), 'Td8#');
});
