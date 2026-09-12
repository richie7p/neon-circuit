import type { LevelId } from "@/game/types";

export const ART = {
  boot: "/art/boot.jpg",
  hub: "/art/hub.jpg",
  dialogue: "/art/dialogue.jpg",
  levels: {
    "l1-harbor": "/art/l1-harbor.jpg",
    "l2-harbor-rev": "/art/l2-harbor.jpg",
    "l3-downtown": "/art/l3-downtown.jpg",
    "l4-downtown-rain": "/art/l4-rain.jpg",
    "l5-ridge": "/art/l5-ridge.jpg",
    "l6-finale": "/art/l6-finale.jpg",
  } satisfies Record<LevelId, string>,
  portraits: {
    hao: "/art/hao.jpg",
    que: "/art/que.jpg",
    bai: "/art/bai.jpg",
    yan: "/art/yan.jpg",
    cat: "/art/cat.jpg",
    tie: "/art/tie.jpg",
    ying: "/art/ying.jpg",
  } as Record<string, string>,
};

export function levelArt(id: LevelId) {
  return ART.levels[id];
}

export function portraitOf(id: string) {
  return ART.portraits[id] ?? ART.portraits.que;
}
