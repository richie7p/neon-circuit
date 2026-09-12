import type { InputState } from "./types";

export class Input {
  keys = new Set<string>();
  injected: string[] | null = null;
  steerOverride: number | null = null;
  touch = { throttle: 0, brake: 0, steer: 0, handbrake: false, reset: false };
  private pauseQueued = false;
  private resetQueued = false;

  attach() {
    window.addEventListener("keydown", this.onDown);
    window.addEventListener("keyup", this.onUp);
    window.addEventListener("blur", this.onBlur);
    document.addEventListener("visibilitychange", this.onVis);
  }

  detach() {
    window.removeEventListener("keydown", this.onDown);
    window.removeEventListener("keyup", this.onUp);
    window.removeEventListener("blur", this.onBlur);
    document.removeEventListener("visibilitychange", this.onVis);
    this.keys.clear();
  }

  private onDown = (e: KeyboardEvent) => {
    if (e.repeat) {
      this.keys.add(e.code);
      return;
    }
    this.keys.add(e.code);
    if (e.code === "Escape") this.pauseQueued = true;
    if (e.code === "KeyR") this.resetQueued = true;
    const tag = (e.target as HTMLElement | null)?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
      e.preventDefault();
    }
  };

  private onUp = (e: KeyboardEvent) => {
    this.keys.delete(e.code);
  };

  private onBlur = () => this.keys.clear();
  private onVis = () => {
    if (document.hidden) this.keys.clear();
  };

  has(code: string) {
    if (this.injected) return this.injected.includes(code);
    return this.keys.has(code);
  }

  setKeys(codes: string[]) {
    this.injected = codes;
  }

  clearInjected() {
    this.injected = null;
    this.steerOverride = null;
  }

  read(): InputState {
    const left = this.has("KeyA") || this.has("ArrowLeft");
    const right = this.has("KeyD") || this.has("ArrowRight");
    let steer = (left ? 1 : 0) + (right ? -1 : 0);
    steer += this.touch.steer;
    if (this.steerOverride != null) steer = this.steerOverride;
    steer = Math.max(-1, Math.min(1, steer));
    const throttle = this.has("KeyW") || this.has("ArrowUp") ? 1 : this.touch.throttle;
    const brake = this.has("KeyS") || this.has("ArrowDown") ? 1 : this.touch.brake;
    const handbrake = this.has("Space") || this.touch.handbrake;
    const reset = this.resetQueued || this.touch.reset;
    this.resetQueued = false;
    this.touch.reset = false;
    const pause = this.pauseQueued;
    this.pauseQueued = false;
    return { throttle, brake, steer, handbrake, reset, pause };
  }
}
