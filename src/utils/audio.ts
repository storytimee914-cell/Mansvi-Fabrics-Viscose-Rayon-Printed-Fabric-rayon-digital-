/**
 * Web Audio API helper to generate a premium mechanical click sound
 * on-the-fly without needing remote audio files.
 */
export function playClickSound() {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const now = ctx.currentTime;
    
    // Primary heavy mechanical bottom-end punch
    const punchOsc = ctx.createOscillator();
    const punchGain = ctx.createGain();
    punchOsc.type = 'triangle';
    punchOsc.frequency.setValueAtTime(320, now);
    punchOsc.frequency.exponentialRampToValueAtTime(60, now + 0.15);

    punchGain.gain.setValueAtTime(0.45, now);
    punchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    punchOsc.connect(punchGain);
    punchGain.connect(ctx.destination);

    // High frequency snappy mechanical definition transient
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = 'sine';
    clickOsc.frequency.setValueAtTime(900, now);
    clickOsc.frequency.exponentialRampToValueAtTime(150, now + 0.05);

    clickGain.gain.setValueAtTime(0.25, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);

    // Audio node triggers
    punchOsc.start(now);
    punchOsc.stop(now + 0.15);

    clickOsc.start(now);
    clickOsc.stop(now + 0.05);
  } catch (error) {
    // Avoid console spam in environments where AudioContext is restricted/blocked
    console.debug('AudioContext click sound prevented or unsupported.', error);
  }
}
