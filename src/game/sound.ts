let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    ctx = new Ctor();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

interface ToneOpts {
  freq: number;
  duration: number;
  type?: OscillatorType;
  gain?: number;
  attack?: number;
  release?: number;
  detune?: number;
  delay?: number;
}

function tone({
  freq,
  duration,
  type = 'sine',
  gain = 0.25,
  attack = 0.005,
  release = 0.08,
  detune = 0,
  delay = 0,
}: ToneOpts): void {
  const ac = getCtx();
  const t0 = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  osc.detune.setValueAtTime(detune, t0);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + attack);
  g.gain.linearRampToValueAtTime(0, t0 + duration + release);
  osc.connect(g);
  g.connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + duration + release + 0.05);
}

function noiseBurst(duration: number, gain = 0.2, filterFreq = 2000): void {
  const ac = getCtx();
  const t0 = ac.currentTime;
  const frames = Math.floor(ac.sampleRate * duration);
  const buffer = ac.createBuffer(1, frames, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / frames);
  }
  const src = ac.createBufferSource();
  src.buffer = buffer;
  const filter = ac.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(filterFreq, t0);
  const g = ac.createGain();
  g.gain.setValueAtTime(gain, t0);
  g.gain.linearRampToValueAtTime(0, t0 + duration);
  src.connect(filter);
  filter.connect(g);
  g.connect(ac.destination);
  src.start(t0);
}

export const Sound = {
  unlock() {
    getCtx();
  },

  chime() {
    tone({ freq: 880, duration: 0.12, type: 'sine', gain: 0.22 });
    tone({ freq: 1320, duration: 0.18, type: 'sine', gain: 0.16, delay: 0.04 });
  },

  pop() {
    tone({ freq: 600, duration: 0.06, type: 'triangle', gain: 0.3 });
    tone({ freq: 900, duration: 0.08, type: 'sine', gain: 0.2, delay: 0.02 });
  },

  chip() {
    noiseBurst(0.06, 0.18, 3500);
    tone({ freq: 180, duration: 0.04, type: 'square', gain: 0.12 });
  },

  snap() {
    tone({ freq: 1200, duration: 0.05, type: 'square', gain: 0.18 });
    tone({ freq: 800, duration: 0.1, type: 'sine', gain: 0.15, delay: 0.03 });
  },

  sparkle() {
    [1568, 1976, 2637].forEach((f, i) =>
      tone({ freq: f, duration: 0.15, type: 'sine', gain: 0.14, delay: i * 0.05 }),
    );
  },

  fanfare() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((f, i) =>
      tone({ freq: f, duration: 0.25, type: 'triangle', gain: 0.22, delay: i * 0.12 }),
    );
    tone({ freq: 1568, duration: 0.4, type: 'sine', gain: 0.2, delay: 0.5 });
  },

  whoosh() {
    noiseBurst(0.3, 0.1, 800);
  },

  prompt() {
    tone({ freq: 660, duration: 0.1, type: 'sine', gain: 0.18 });
    tone({ freq: 990, duration: 0.14, type: 'sine', gain: 0.14, delay: 0.06 });
  },

  goodbye() {
    [784, 659, 523, 392].forEach((f, i) =>
      tone({ freq: f, duration: 0.2, type: 'triangle', gain: 0.2, delay: i * 0.15 }),
    );
  },
};
