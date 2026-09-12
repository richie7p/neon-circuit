export const STORY = {
  title: "霓虹環道",
  titleEn: "NEON CIRCUIT",
  chapter: "第一章　夜城入場券",
  player: { id: "hao", name: "林昊" },
  mentor: { id: "que", name: "鵲" },
  rival: { id: "bai", name: "白澤" },
  opening: [
    "que:這座城的夜晚只承認兩件事：圈速，和還得起的帳單。",
    "hao:我只有一台拼起來的雲雀。",
    "que:夠了。港灣業餘賽今晚缺人，贏了就有入場券。輸了……就再欠我一頓夜宵。",
    "hao:那我去報名。",
  ],
  ending: [
    "que:銀線不是終點。只是他們終於肯看你。",
    "hao:下一章呢？",
    "que:先把車庫燈打開。車還沒睡，你也別睡。",
  ],
  credits:
    "林昊　新銳車手　　鵲　夜班技師　　白澤　銀線隊長",
};

export const SPEAKERS: Record<string, { name: string; tone: string }> = {
  hao: { name: "林昊", tone: "text-primary" },
  que: { name: "鵲", tone: "text-accent" },
  bai: { name: "白澤", tone: "text-speaker-bai" },
  yan: { name: "阿焰", tone: "text-speaker-yan" },
  cat: { name: "霓虹貓", tone: "text-speaker-cat" },
  tie: { name: "鐵頭", tone: "text-muted" },
  ying: { name: "影", tone: "text-muted" },
};
