import { defineStore } from "pinia";
import { MODES } from "src/constants/MODES";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    settings: {
      sounds: true,
      linesAmount: 5,
      mode: MODES.DEFAULT,
    },
  }),

  actions: {
    syncSettings() {
      localStorage.setItem("settings", JSON.stringify(this.settings));
    },

    loadSettings() {
      const settings = JSON.parse(localStorage.getItem("settings"));
      if (settings) {
        this.settings = settings;
      }
    },

    updateSettings(key, value) {
      this.settings[key] = value;
      this.syncSettings();
    },
  },
});
