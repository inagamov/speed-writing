import { EazyE_NoMoreQuestions } from "./lyrics/en-US/EazyE_NoMoreQuestions";
import { Eminem_RapGod } from "./lyrics/en-US/Eminem_RapGod";
import { Nirvana_SmellsLikeTeenSpirit } from "./lyrics/en-US/Nirvana_SmellsLikeTeenSpirit";
import { Joji_SLOWDANCINGINTHEDARK } from "./lyrics/en-US/Joji_SLOWDANCINGINTHEDARK";
import { Gorillaz_FeelGoodInc } from "./lyrics/en-US/Gorillaz_FeelGoodInc";
import { RickAstley_NeverGonnaGiveYouUp } from "./lyrics/en-US/RickAstley_NeverGonnaGiveYouUp";

import { Kizaru_KakVseIdet } from "./lyrics/ru-RU/Kizaru_KakVseIdet";
import { JuriiShatunov_BelieRozi } from "./lyrics/ru-RU/JuriiShatunov_BelieRozi";
import { MORGENSHTERNEldzhey_Cadillac } from "./lyrics/ru-RU/MORGENSHTERNEldzhey_Cadillac";
import { KINO_AlluminievieAgurtsi } from "./lyrics/ru-RU/KINO_AlluminievieAgurtsi";

export const SONGS = [
  /*
   * ru-RU
   */
  {
    lang: "ru-RU",
    audio_src: "/public/songs/ru-RU/Kizaru_КакВсёИдёт/audio.mp3",
    cover_src: "/public/songs/ru-RU/Kizaru_КакВсёИдёт/cover.jpg",
    lyrics: Kizaru_KakVseIdet,
    name: "Как всё идёт",
    author: "Kizaru",
    explicit: true,
    speed: 953,
  },
  {
    lang: "ru-RU",
    audio_src: "/public/songs/ru-RU/MORGENSHTERN&Элджей_Cadillac/audio.mp3",
    cover_src: "/public/songs/ru-RU/MORGENSHTERN&Элджей_Cadillac/cover.jpg",
    lyrics: MORGENSHTERNEldzhey_Cadillac,
    name: "Cadillac",
    author: "MORGENSHTERN & Элджей",
    explicit: true,
    speed: 372,
  },
  {
    lang: "ru-RU",
    audio_src: "/public/songs/ru-RU/КИНО_АлюминиевыеОгурцы/audio.mp3",
    cover_src: "/public/songs/ru-RU/КИНО_АлюминиевыеОгурцы/cover.jpg",
    lyrics: KINO_AlluminievieAgurtsi,
    name: "Алюминиевые огурцы",
    author: "КИНО",
    explicit: false,
    speed: 311,
  },
  {
    lang: "ru-RU",
    audio_src: "/public/songs/ru-RU/ЮрийШатунов_БелыеРозы/audio.mp3",
    cover_src: "/public/songs/ru-RU/ЮрийШатунов_БелыеРозы/cover.jpeg",
    lyrics: JuriiShatunov_BelieRozi,
    name: "Белые розы",
    author: "Юрий Шатунов",
    explicit: false,
    speed: 178,
  },

  /*
   * en-US
   */
  {
    lang: "en-US",
    audio_src: "/public/songs/en-US/EazyE_NoMoreQuestions/audio.mp3",
    cover_src: "/public/songs/en-US/EazyE_NoMoreQuestions/cover.jpg",
    lyrics: EazyE_NoMoreQuestions,
    name: "No More Question's",
    author: "Eazy E",
    explicit: true,
    speed: 831,
  },
  {
    lang: "en-US",
    audio_src: "/public/songs/en-US/Eminem_RapGod/audio.mp3",
    cover_src: "/public/songs/en-US/Eminem_RapGod/cover.jpeg",
    lyrics: Eminem_RapGod,
    name: "Rap God",
    author: "Eminem",
    explicit: true,
    speed: 1267,
  },
  {
    lang: "en-US",
    audio_src: "/public/songs/en-US/Gorillaz_FeelGoodInc/audio.mp3",
    cover_src: "/public/songs/en-US/Gorillaz_FeelGoodInc/cover.jpg",
    lyrics: Gorillaz_FeelGoodInc,
    name: "Feel Good Inc",
    author: "Gorillaz",
    explicit: true,
    speed: 621,
  },
  {
    lang: "en-US",
    audio_src: "/public/songs/en-US/Joji_SLOWDANCINGINTHEDARK/audio.mp3",
    cover_src: "/public/songs/en-US/Joji_SLOWDANCINGINTHEDARK/cover.jpg",
    lyrics: Joji_SLOWDANCINGINTHEDARK,
    name: "SLOW DANCING IN THE DARK",
    author: "Joji",
    explicit: true,
    speed: 323,
  },
  {
    lang: "en-US",
    audio_src: "/public/songs/en-US/Nirvana_SmellsLikeTeenSpirit/audio.mp3",
    cover_src: "/public/songs/en-US/Nirvana_SmellsLikeTeenSpirit/cover.jpeg",
    lyrics: Nirvana_SmellsLikeTeenSpirit,
    name: "Smells Like Teen Spirit",
    author: "Nirvana",
    explicit: false,
    speed: 280,
  },
  {
    lang: "en-US",
    audio_src: "/public/songs/en-US/RickAstley_NeverGonnaGiveYouUp/audio.mp3",
    cover_src: "/public/songs/en-US/RickAstley_NeverGonnaGiveYouUp/cover.jpeg",
    lyrics: RickAstley_NeverGonnaGiveYouUp,
    name: "Never Gonna Give You Up",
    author: "Rick Astley",
    explicit: true,
    speed: 485,
  },
];
