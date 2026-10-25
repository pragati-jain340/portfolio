import test from "node:test";
import assert from "node:assert/strict";
import { INTRO_SENTENCE, introCharacterCount } from "../src/lib/intro-playback.ts";

test("keeps the exact requested sentence", () => {
  assert.equal(INTRO_SENTENCE, "Let’s take a look around.");
});
test("waits for the presenting pose at three seconds of media time", () => {
  for (const time of [0, 1, 2.99, 3]) assert.equal(introCharacterCount(time), 0);
});
test("types over 1.25 seconds and stays complete for the final frame", () => {
  assert.equal(introCharacterCount(3.625), Math.floor(INTRO_SENTENCE.length / 2));
  for (const time of [4.25, 7.17, 60]) assert.equal(introCharacterCount(time), INTRO_SENTENCE.length);
});
test("buffering or pausing cannot advance text while media time is unchanged", () => {
  const pausedTime = 3.5;
  const count = introCharacterCount(pausedTime);
  for (let frame = 0; frame < 100; frame++) assert.equal(introCharacterCount(pausedTime), count);
});
test("seeking backwards restores the corresponding text and invalid times stay safe", () => {
  assert.equal(introCharacterCount(7), INTRO_SENTENCE.length);
  assert.equal(introCharacterCount(2), 0);
  for (const time of [-1, NaN, Infinity]) assert.equal(introCharacterCount(time), 0);
});
