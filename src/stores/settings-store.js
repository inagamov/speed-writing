import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    settings: {
      sounds: true,
      linesAmount: 5,
    },
  }),

  actions: {
    syncSettings() {
      localStorage.setItem("settings", JSON.stringify(this.settings));
    },

    loadSettings() {
      this.settings = JSON.parse(localStorage.getItem("settings"));
    },

    updateSettings(key, value) {
      this.settings[key] = value;
      this.syncSettings();
    },
  },
});
