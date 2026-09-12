export class GameAudio {
  ctx: AudioContext | null = null;
  master: GainNode | null = null;
  sfx: GainNode | null = null;
  engineGain: GainNode | null = null;
  osc: OscillatorNode | null = null;
  osc2: OscillatorNode | null = null;
  noise: AudioBufferSourceNode | null = null;
  masterVol = 0.8;
  sfxVol = 0.85;
  muted = false;
  private unlocked = false;
  private engineOn = false;

  unlock = () => {
    try {
      if (!this.ctx) {
        const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new Ctx({ latencyHint: "interactive" });
        this.master = this.ctx.createGain();
        this.sfx = this.ctx.createGain();
        this.engineGain = this.ctx.createGain();
        this.sfx.connect(this.master);
        this.engineGain.connect(this.master);
        this.master.connect(this.ctx.destination);
        this.applyVol();
      }
      if (this.ctx.state === "suspended") void this.ctx.resume();
      this.unlocked = true;
    } catch {
      /* audio optional */
    }
  };

  setVolumes(master: number, sfx: number, muted: boolean) {
    this.masterVol = master;
    this.sfxVol = sfx;
    this.muted = muted;
    this.applyVol();
  }

  private applyVol() {
    if (!this.master || !this.sfx || !this.engineGain || !this.ctx) return;
    const m = this.muted ? 0 : this.masterVol * this.masterVol;
    this.master.gain.setTargetAtTime(m, this.ctx.currentTime, 0.02);
    this.sfx.gain.setTargetAtTime(this.sfxVol * this.sfxVol, this.ctx.currentTime, 0.02);
  }

  resume() {
    if (this.ctx?.state === "suspended") void this.ctx.resume();
  }

  startEngine() {
    if (!this.ctx || !this.engineGain || this.engineOn) return;
    try {
      this.osc = this.ctx.createOscillator();
      this.osc2 = this.ctx.createOscillator();
      this.osc.type = "sawtooth";
      this.osc2.type = "square";
      const g1 = this.ctx.createGain();
      const g2 = this.ctx.createGain();
      g1.gain.value = 0.04;
      g2.gain.value = 0.015;
      const filt = this.ctx.createBiquadFilter();
      filt.type = "lowpass";
      filt.frequency.value = 420;
      this.osc.connect(g1);
      this.osc2.connect(g2);
      g1.connect(filt);
      g2.connect(filt);
      filt.connect(this.engineGain);
      this.engineGain.gain.value = 0;
      this.osc.start();
      this.osc2.start();
      this.engineOn = true;
    } catch {
      /* ignore */
    }
  }

  updateEngine(speed: number, throttle: number, racing: boolean) {
    if (!this.ctx || !this.osc || !this.osc2 || !this.engineGain) return;
    if (!racing) {
      this.engineGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
      return;
    }
    const rpm = 48 + speed * 7.4 + throttle * 28;
    this.osc.frequency.setTargetAtTime(rpm, this.ctx.currentTime, 0.04);
    this.osc2.frequency.setTargetAtTime(rpm * 0.48 + 12, this.ctx.currentTime, 0.04);
    const vol = 0.018 + throttle * 0.075 + Math.min(0.06, speed * 0.0024);
    this.engineGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.04);
  }

  stopEngine() {
    try {
      this.osc?.stop();
      this.osc2?.stop();
    } catch {
      /* already */
    }
    this.osc = null;
    this.osc2 = null;
    this.engineOn = false;
  }

  beep(freq: number, dur = 0.12, type: OscillatorType = "square", vol = 0.08) {
    if (!this.ctx || !this.sfx) return;
    try {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.value = vol;
      g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur);
      o.connect(g);
      g.connect(this.sfx);
      o.start();
      o.stop(this.ctx.currentTime + dur);
    } catch {
      /* ignore */
    }
  }

  click() {
    this.beep(880, 0.05, "square", 0.04);
  }

  countdown(n: number) {
    if (n <= 0) this.beep(880, 0.28, "square", 0.1);
    else this.beep(440, 0.12, "square", 0.07);
  }

  collide() {
    this.beep(90, 0.14, "sawtooth", 0.09);
  }

  finish() {
    this.beep(523, 0.18, "triangle", 0.08);
    setTimeout(() => this.beep(659, 0.18, "triangle", 0.08), 140);
    setTimeout(() => this.beep(784, 0.28, "triangle", 0.1), 280);
  }

  dispose() {
    this.stopEngine();
    try {
      void this.ctx?.close();
    } catch {
      /* ignore */
    }
    this.ctx = null;
  }
}
