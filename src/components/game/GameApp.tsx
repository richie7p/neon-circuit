import { useEffect, useRef } from "react";
import { GameAudio } from "@/game/audio";
import { useCareer } from "@/store/career";
import {
  LevelsScreen,
  PreRaceScreen,
  DialogueScreen,
  ResultsScreen,
} from "./CareerScreens";
import { GarageScreen, ShopScreen, TuneScreen, PaintScreen } from "./GarageScreens";
import {
  BootScreen,
  HubScreen,
  HelpScreen,
  SettingsScreen,
  ConfirmHost,
  ToastHost,
  IntroScreen,
} from "./MenuScreens";
import { RaceView } from "./RaceView";

export function GameApp() {
  const screen = useCareer((s) => s.screen);
  const hydrate = useCareer((s) => s.hydrate);
  const hydrated = useCareer((s) => s.hydrated);
  const save = useCareer((s) => s.save);
  const raceNonce = useCareer((s) => s.raceNonce);
  const audioRef = useRef<GameAudio | null>(null);
  if (!audioRef.current) audioRef.current = new GameAudio();
  const audio = audioRef.current;

  useEffect(() => {
    hydrate();
    const unlock = () => audio.unlock();
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
    const vis = () => {
      if (!document.hidden) audio.resume();
    };
    document.addEventListener("visibilitychange", vis);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      document.removeEventListener("visibilitychange", vis);
    };
  }, [hydrate, audio]);

  useEffect(() => {
    audio.setVolumes(save.settings.master, save.settings.sfx, save.settings.muted);
  }, [audio, save.settings.master, save.settings.sfx, save.settings.muted]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest("button")) audio.click();
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [audio]);

  useEffect(() => {
    const api = {
      getSave: () => useCareer.getState().save,
      getScreen: () => useCareer.getState().screen,
      newGame: () => useCareer.getState().newGame(),
      go: (s: string) => useCareer.getState().go(s as never),
      buyCar: (id: string) => useCareer.getState().buyCar(id as never),
      buyUpgrade: (id: string, cat: string) =>
        useCareer.getState().buyUpgrade(id as never, cat as never),
      selectCar: (id: string) => useCareer.getState().selectCar(id as never),
      applyPaint: (id: string, paint: { body: string; rim: string; metalness: number }) =>
        useCareer.getState().applyPaint(id as never, paint),
      openLevel: (id: string) => useCareer.getState().openLevel(id as never),
      startRace: () => useCareer.getState().startRace(),
    };
    (window as unknown as { __careerQa: typeof api }).__careerQa = api;
  }, []);

  if (!hydrated) {
    return (
      <div className="h-dvh w-full overflow-hidden bg-bg text-fg">
        <BootScreen />
        <ConfirmHost />
        <ToastHost />
      </div>
    );
  }

  return (
    <div className="h-dvh w-full overflow-hidden bg-bg text-fg">
      {screen === "boot" && <BootScreen />}
      {screen === "intro" && <IntroScreen />}
      {screen === "hub" && <HubScreen />}
      {screen === "levels" && <LevelsScreen />}
      {screen === "prerace" && <PreRaceScreen />}
      {screen === "dialogue" && <DialogueScreen />}
      {screen === "garage" && <GarageScreen />}
      {screen === "shop" && <ShopScreen />}
      {screen === "tune" && <TuneScreen />}
      {screen === "paint" && <PaintScreen />}
      {screen === "settings" && <SettingsScreen />}
      {screen === "help" && <HelpScreen />}
      {screen === "race" && <RaceView key={raceNonce} audio={audio} />}
      {screen === "results" && <ResultsScreen />}
      <ConfirmHost />
      <ToastHost />
    </div>
  );
}
