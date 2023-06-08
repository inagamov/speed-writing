import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useBaseStore = defineStore("base", {
  state: () => ({
    lines: [],
    activeLineIndex: 0,
    activeCharIndex: 0,

    mistakesCount: 0,
    isMistaken: false,

    time: 0,
    timerInterval: null,
  }),

  getters: {
    activeLine: (state) => {
      return state._user;
    },
  },

  actions: {
    fetchLines() {
      api
        .get("https://baconipsum.com/api/?type=meat-and-filler&lines=5")
        .then((response) => {
          this.lines = response.data[0]
            .split(/[.?!]\s/)
            .map((line) => line.trim().split(""));
        })
        .catch((error) => {
          console.log(error);
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
