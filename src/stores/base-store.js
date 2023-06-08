import { defineStore } from "pinia";
import { api } from "boot/axios";
import { useI18n } from "vue-i18n";
import { transliterateEnglishToRussian } from "src/helpers/transliterate";

export const useBaseStore = defineStore("base", {
  state: () => ({
    lines: [],
    activeLineIndex: 0,
    activeCharIndex: 0,

    mistakesCount: 0,
    isMistaken: false,

    time: 0,
    timerInterval: null,

    loading: false,
  }),

  getters: {
    activeLine: (state) => {
      return state._user;
    },
  },

  actions: {
    fetchLines(locale) {
      this.loading = true;

      api
        .get("https://baconipsum.com/api/?type=meat-and-filler&lines=5")
        .then((response) => {
          this.lines = [];
          response.data[0].split(/[.?!]\s/).map((line, index) => {
            if (locale === "ru-RU") {
              line = transliterateEnglishToRussian(line);
            }

            setTimeout(() => {
              this.lines.push(line.trim().split(""));
            }, 100 * index);
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    startTimer() {
      this.timerInterval = setInterval(() => {
        this.time++;
      }, 1000);
    },

    pauseTimer() {
      clearInterval(this.timerInterval);
    },

    stopTimer() {
      this.pauseTimer();
      this.time = 0;
    },
  },
});
