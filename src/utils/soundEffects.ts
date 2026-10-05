/**
 * Self-contained Web Audio API Sound Synthesizer
 * Zero external audio files required — 100% offline and standalone compliant.
 */

class SoundEffectManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private hissSource: AudioBufferSourceNode | null = null;
  private hissGain: GainNode | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.hissGain && this.ctx) {
      try {
        this.hissGain.gain.setValueAtTime(0, this.ctx.currentTime);
      } catch (e) {}
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playClick() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  }

  public playCorrect() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.12, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.25);
      });
    } catch (e) {}
  }

  public playIncorrect() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.25);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }

  public startHiss() {
    const ctx = this.getContext();
    if (!ctx) return;

    if (this.hissSource) return; // already playing

    try {
      const bufferSize = ctx.sampleRate * 2; // 2 seconds of white noise looped
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      this.hissSource = ctx.createBufferSource();
      this.hissSource.buffer = noiseBuffer;
      this.hissSource.loop = true;

      // Bandpass filter to make it sound like high pressure propellant escaping
      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 1600;
      bandpass.Q.value = 1.2;

      this.hissGain = ctx.createGain();
      this.hissGain.gain.setValueAtTime(0.001, ctx.currentTime);
      this.hissGain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.1);

      this.hissSource.connect(bandpass);
      bandpass.connect(this.hissGain);
      this.hissGain.connect(ctx.destination);

      this.hissSource.start();
    } catch (e) {}
  }

  public stopHiss() {
    if (this.hissGain && this.ctx) {
      try {
        this.hissGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
        setTimeout(() => {
          if (this.hissSource) {
            try {
              this.hissSource.stop();
              this.hissSource.disconnect();
            } catch (err) {}
            this.hissSource = null;
          }
          this.hissGain = null;
        }, 120);
      } catch (e) {
        this.hissSource = null;
        this.hissGain = null;
      }
    } else {
      this.hissSource = null;
      this.hissGain = null;
    }
  }

  public playExplosion() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Low punch sub-bass
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(120, now);
      subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.7);

      subGain.gain.setValueAtTime(0.4, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.8);

      // Noise crackle
      const bufferSize = Math.floor(ctx.sampleRate * 0.8);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(800, now);
      lowpass.frequency.exponentialRampToValueAtTime(100, now + 0.8);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.35, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      noise.connect(lowpass);
      lowpass.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.8);
    } catch (e) {}
  }

  public playElectricArc() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      for (let i = 0; i < 4; i++) {
        const time = now + i * 0.08;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120 + Math.random() * 400, time);

        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.06);
      }
    } catch (e) {}
  }

  public playAlarm() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(660, now + 0.2);
      osc.frequency.setValueAtTime(880, now + 0.4);
      osc.frequency.setValueAtTime(660, now + 0.6);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.85);
    } catch (e) {}
  }

  public playVictory() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.2, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.45);
      });
    } catch (e) {}
  }
}

export const sounds = new SoundEffectManager();
