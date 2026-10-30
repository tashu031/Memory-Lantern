// Pure Web Audio API gentle acoustic chime synthesizer
// No external assets required; runs locally in browser

let audioCtx = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a warm peaceful chime when lighting a candle or completing an action
 */
export function playChime(note = 528) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(note, ctx.currentTime);
    // Subtle harmonic shimmer
    osc.frequency.exponentialRampToValueAtTime(note * 1.5, ctx.currentTime + 0.1);
    osc.frequency.exponentialRampToValueAtTime(note, ctx.currentTime + 0.5);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 2.6);
  } catch (err) {
    // Gracefully ignore audio failure
  }
}

/**
 * Play an ethereal chord progression for the Ofrenda
 */
export function playOfrendaHarmonics() {
  try {
    const notes = [440, 554.37, 659.25, 880]; // A Major chime
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        playChime(freq);
      }, idx * 180);
    });
  } catch (err) {
    // Ignore
  }
}
