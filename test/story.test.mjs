// The story campaign is plain data: check every chapter can actually be played by app.js.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const STORY = createRequire(import.meta.url)('../src/story.js');
const LEVEL_COUNT = 5, TC_COUNT = 7;
const lines = (l) => Array.isArray(l) && l.length > 0 && l.every((x) => typeof x.who === 'string' && x.text);

test('prologue et épilogue', () => {
  assert.ok(lines(STORY.prologue));
  assert.ok(lines(STORY.epilogue));
});

test('chapitres jouables et difficulté croissante', () => {
  const ids = new Set();
  let prev = -1;
  for (const ch of STORY.chapters) {
    assert.ok(!ids.has(ch.id), `id dupliqué ${ch.id}`); ids.add(ch.id);
    assert.ok(ch.name && ch.short && ch.title && ch.place);
    assert.ok('PNBRQK'.includes(ch.piece) && ch.piece.length === 1);
    assert.ok(['w', 'b'].includes(ch.color));
    assert.ok(Number.isInteger(ch.level) && ch.level >= 0 && ch.level < LEVEL_COUNT);
    assert.ok(Number.isInteger(ch.tc) && ch.tc >= 0 && ch.tc < TC_COUNT);
    assert.ok(ch.level >= prev, 'le niveau ne doit pas baisser'); prev = ch.level;
    assert.ok(lines(ch.intro) && lines(ch.win) && lines(ch.lose), ch.id);
  }
  assert.equal(STORY.chapters.at(-1).level, LEVEL_COUNT - 1, 'le boss final joue au niveau Expert');
});
