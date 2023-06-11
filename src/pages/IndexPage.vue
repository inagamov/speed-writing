<template>
  <q-page>
    <div
      class="container"
      :style="
        settings.mode === MODES.LYRICS && $q.platform.is.mobile
          ? 'padding-bottom: 164px'
          : ''
      "
    >
      <!-- header -->
      <HeaderStats />

      <!-- exercise -->
      <ExerciseComponent />

      <!-- playing song -->
      <SongComponent v-if="song?.audio" />

      <!-- results -->
      <ResultsComponent />
    </div>
  </q-page>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useBaseStore } from "stores/base-store";
import { useSettingsStore } from "stores/settings-store";
import HeaderStats from "components/Header/HeaderComponent.vue";
import ResultsComponent from "components/ResultsComponent.vue";
import SongComponent from "components/SongComponent.vue";
import { MODES } from "src/constants/MODES";
import ExerciseComponent from "components/ExerciseComponent.vue";

// base
const { song } = storeToRefs(useBaseStore());
const { loadLines, loadResults } = useBaseStore();

// settings
const { settings } = storeToRefs(useSettingsStore());
const { loadSettings } = useSettingsStore();

/*
 * functions
 */
onBeforeMount(async () => {
  // load settings
  loadSettings();

  // load results
  loadResults();

  // fetch lines
  await loadLines();
});
</script>
