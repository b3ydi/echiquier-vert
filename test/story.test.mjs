// The story campaign is plain data: check every chapter, scene and portrait can actually be used by app.js.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const STORY = createRequire(import.meta.url)('../src/story.js');
const LEVEL_COUNT = 5, TC_COUNT = 7;
const asset = (p) => existsSync(new URL(`../src/${p}`, import.meta.url));

function checkLines(lines, label, needText = true) {
  assert.ok(Array.isArray(lines) && lines.length > 0, `${label} vide`);
  for (const l of lines) {
    assert.equal(typeof l.who, 'string', label);
    if (needText && !l.card) assert.ok(l.text, `${label} : réplique sans texte`);
    if (!l.who) continue;
    const ch = STORY.chars[l.who];
    assert.ok(ch, `${label} : personnage inconnu « ${l.who} »`);
    if (l.e) assert.ok(ch.img && ch.img[l.e], `${label} : expression ${l.who}/${l.e} sans image`);
  }
}

test('personnages et portraits', () => {
  for (const [id, ch] of Object.entries(STORY.chars)) {
    assert.ok(ch.name, id);
    if (ch.img) {
      assert.ok(ch.img[ch.def], `${id} : expression par défaut absente`);
      for (const p of Object.values(ch.img)) assert.ok(asset(p), `image manquante ${p}`);
    } else assert.ok('PNBRQK'.includes(ch.piece), `${id} : ni image ni pièce`);
  }
  assert.ok(STORY.chars.lelouch.img, 'Lelouch a un portrait');
});

test('prologue, épilogue et répliques de Lelouch', () => {
  checkLines(STORY.prologue, 'prologue');
  checkLines(STORY.epilogue, 'épilogue');
  for (const [k, lines] of Object.entries(STORY.lelouch))
    for (const l of lines) assert.ok(l.text && STORY.chars.lelouch.img[l.e], `lelouch.${k}`);
});

test('chapitres jouables et difficulté croissante', () => {
  const ids = new Set();
  let prev = -1;
  for (const ch of STORY.chapters) {
    assert.ok(!ids.has(ch.id), `id dupliqué ${ch.id}`); ids.add(ch.id);
    assert.ok(ch.name && ch.title && ch.place && STORY.chars[ch.char], ch.id);
    assert.ok('PNBRQK'.includes(ch.piece) && ch.piece.length === 1);
    assert.ok(['w', 'b'].includes(ch.color));
    assert.ok(Number.isInteger(ch.level) && ch.level >= 0 && ch.level < LEVEL_COUNT);
    assert.ok(Number.isInteger(ch.tc) && ch.tc >= 0 && ch.tc < TC_COUNT);
    assert.ok(ch.level >= prev, 'le niveau ne doit pas baisser'); prev = ch.level;
    checkLines(ch.intro, `${ch.id}.intro`); checkLines(ch.win, `${ch.id}.win`); checkLines(ch.lose, `${ch.id}.lose`);
    assert.ok(ch.intro[0].bg, `${ch.id} : la cinématique d'intro a un décor`);
    const img = STORY.chars[ch.char].img;
    for (const k of ['capture', 'check', 'advantage', 'hurt', 'checked']) {
      assert.ok(ch.barks[k]?.length, `${ch.id}.barks.${k}`);
      for (const l of ch.barks[k]) assert.ok(l.text && (!l.e || (img && img[l.e])), `${ch.id}.barks.${k}`);
    }
  }
  assert.equal(STORY.chapters.at(-1).level, LEVEL_COUNT - 1, 'le boss final joue au niveau Expert');
});
