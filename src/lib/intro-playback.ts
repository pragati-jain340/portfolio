export const INTRO_SENTENCE = "Let’s take a look around.";
export const INTRO_TYPING_START = 3;
export const INTRO_TYPING_DURATION = 1.25;

/** Use media time so pausing, buffering, or seeking never desynchronizes the text. */
export function introCharacterCount(mediaTime: number): number {
  if (!Number.isFinite(mediaTime)) return 0;
  const progress = Math.max(0, Math.min(1,
    (mediaTime - INTRO_TYPING_START) / INTRO_TYPING_DURATION,
  ));
  return Math.floor(progress * INTRO_SENTENCE.length);
}
