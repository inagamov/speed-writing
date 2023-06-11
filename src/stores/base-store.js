import { defineStore, storeToRefs } from "pinia";
import { api } from "boot/axios";
import { transliterateEnglishToRussian } from "src/helpers/transliterate";
import { useSettingsStore } from "stores/settings-store";

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

    results: [],
    showResults: false,
    showResultsConfetti: false,
  }),

  getters: {
    /*
     * characters per minute
     */
    speed: (state) => {
      // compute total amount of characters typed by user
      let totalChars = 0;
      state.lines.map((line, index) => {
        if (state.activeLineIndex >= index) {
          totalChars += line?.slice(
            0,
            state.activeLineIndex === index
              ? state.activeCharIndex + 1
              : line.length
          ).length;
        }
      });

      // compute typing speed, rounding the number
      return Math.trunc((totalChars / state.time) * 100);
    },

    /*
     * accuracy
     */
    accuracy: (state) => {
      // compute total amount of characters typed by user
      let totalChars = 0;
      state.lines.map((line, index) => {
        if (state.activeLineIndex >= index) {
          totalChars += line?.slice(
            0,
            state.activeLineIndex === index
              ? state.activeCharIndex + 1
              : line.length
          ).length;
        }
      });

      // compute accuracy
      const result = Math.round(
        ((totalChars - state.mistakesCount) / totalChars) * 100
      );
      return result > 0 ? result : 0;
    },
  },

  actions: {
    clearData() {
      this.lines = [];

      this.activeLineIndex = 0;
      this.activeCharIndex = 0;

      this.mistakesCount = 0;
      this.isMistaken = false;

      this.stopTimer();
    },

    processLines(lines) {
      lines[0].split(/[.?!]\s/).map((line, index) => {
        if (localStorage.getItem("lang") === "ru-RU") {
          line = transliterateEnglishToRussian(line);
        }

        setTimeout(() => {
          this.lines.push(line.trim().split(""));
        }, 100 * index);
      });
    },

    /*
     * fetching lines
     */
    async fetchLines(linesAmount = 5) {
      return await api
        .get(
          `https://baconipsum.com/api/?type=meat-and-filler&sentences=${linesAmount}`
        )
        .catch((error) => {
          console.log(error);
        });
    },

    async loadLines() {
      this.clearData();

      this.loading = true;

      const { settings } = storeToRefs(useSettingsStore());
      const response = await this.fetchLines(settings.value.linesAmount);
      this.processLines(response.data);

      this.loading = false;
    },

    /*
     * timer
     */
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

    // lines amount setting
    async addLine() {
      const response = await this.fetchLines(1);
      this.processLines(response.data);
    },

    removeLine() {
      if (this.lines.length > 1) {
        this.activeLineIndex = 0;
        this.activeCharIndex = 0;

        this.lines.pop();
      }
    },

    /*
     * results
     */
    syncResults() {
      localStorage.setItem("results", JSON.stringify(this.results));
    },

    loadResults() {
      const results = JSON.parse(localStorage.getItem("results"));
      this.results = results ? results : [];
    },

    saveResult(speed, accuracy) {
      this.results.unshift({
        id: new Date(),
        speed: speed,
        accuracy: accuracy,
      });
      this.syncResults();
    },

    deleteResult(id) {
      this.results = this.results.filter((result) => result.id !== id);
      this.showResultsConfetti = false;
      this.syncResults();
    },
  },
});
