<template>
  <q-page>
    <div class="container">
      <!-- header -->
      <HeaderStats />

      <!-- loading -->
      <q-intersection
        v-if="loading"
        transition="scale"
        once
        class="row justify-center q-mt-lg"
      >
        <q-spinner-ios color="grey" size="32px" />
      </q-intersection>

      <!-- lines -->
      <div v-else class="q-mt-md">
        <transition-group appear leave-active-class="animated fadeOutDown">
          <q-intersection
            v-for="(line, lineIndex) in lines"
            :key="lineIndex"
            transition="scale"
            transition-duration="500"
            once
            class="line"
            :class="lineIndex === activeLineIndex ? 'line--active' : ''"
          >
            <!-- characters -->
            <span
              v-for="(char, charIndex) in line"
              :key="charIndex"
              :class="`${
                lineIndex === activeLineIndex
                  ? isMistaken && activeCharIndex === charIndex
                    ? 'line__error_char'
                    : activeCharIndex > charIndex
                    ? 'line__passed_char'
                    : activeCharIndex === charIndex
                    ? 'line__current_char'
                    : ''
                  : ''
              } ${
                lineIndex === activeLineIndex &&
                activeCharIndex - 1 === charIndex
                  ? 'line__passed_char--pressed'
                  : ''
              }`"
            >
              {{ char }}
            </span>
          </q-intersection>
        </transition-group>
      </div>

      <!-- results -->
      <ResultsComponent />
    </div>
  </q-page>
</template>

<script setup>
import { computed, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useBaseStore } from "stores/base-store";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { useSettingsStore } from "stores/settings-store";
import { SETTINGS } from "src/constants/SETTINGS";
import HeaderStats from "components/Header/HeaderComponent.vue";
import ResultsComponent from "components/ResultsComponent.vue";

// general
const { locale, t } = useI18n({ useScope: "global" });
const $q = useQuasar();

// base
const {
  lines,
  activeLineIndex,
  activeCharIndex,
  mistakesCount,
  isMistaken,
  timerInterval,
  loading,
  accuracy,
  speed,
  showResults,
  showResultsConfetti,
} = storeToRefs(useBaseStore());
const { loadLines, startTimer, loadResults, saveResult, clearData } =
  useBaseStore();

const activeLine = computed(() => {
  return lines.value[activeLineIndex.value];
});

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

  // handle input
  document.addEventListener("keydown", function (event) {
    // prevent space
    if (event.key === " ") {
      event.preventDefault();
    }

    // allow alphanumeric characters & some common special symbols
    if (
      /^[a-zA-Zа-яА-Я0-9]$/.test(event.key) ||
      /^[.,\s\-*&^%$#@!']$/.test(event.key)
    ) {
      // on start
      if (!timerInterval.value) {
        startTimer();
      }

      // warn about incorrect keyboard layout
      if (
        (locale.value === "ru-RU" && /^[a-zA-Z]*$/.test(event.key)) ||
        (locale.value === "en-US" && /^[а-яА-Я]*$/.test(event.key))
      ) {
        $q.notify({
          message: t("errors.keyboardLayout"),
          icon: "crisis_alert",
        });
      }

      // scroll into view
      const element = document.getElementsByClassName("line--active")[0];
      element.scrollIntoView({ behavior: "smooth", block: "center" });

      // remove mistake styles
      setTimeout(() => {
        isMistaken.value = false;
      }, 275);

      // check entered value
      if (activeLine.value[activeCharIndex.value] === event.key) {
        // proceed to the next character
        activeCharIndex.value += 1;
      } else {
        // highlight error
        isMistaken.value = true;
        mistakesCount.value += 1;

        // play error sound
        if (settings.value[SETTINGS.SOUNDS]) {
          const errorSound = new Audio("/public/error.mp3");
          errorSound.play();
        }
      }

      // line complete
      if (activeLine.value?.length === activeCharIndex.value) {
        // proceed to the next line
        if (activeLineIndex.value + 1 < lines.value.length) {
          activeLineIndex.value += 1;
          activeCharIndex.value = 0;

          // finish
        } else {
          saveResult(speed.value, accuracy.value);
          loadLines();

          showResults.value = true;
          showResultsConfetti.value = true;

          $q.notify({
            message: t("results.saved"),
            icon: "celebration",
            color: "black",
          });
        }
      }
    }
  });
});
</script>

<style scoped lang="scss">
// line
.line {
  font-size: 24px;
  opacity: 0.3;
  font-weight: 600;
  color: $grey;
  text-align: center;
  transition: 0.275s;
}

.line--active {
  font-size: 30px;
  opacity: 1;
  padding: 16px 0;
}

// passed character
.line__passed_char {
  color: black;
}

// current character
.line__current_char {
  animation: typing 1.25s infinite;
}

@keyframes typing {
  0% {
    text-decoration: underline;
  }
  50% {
    text-decoration: none;
  }
  100% {
    text-decoration: underline;
  }
}

// error character
.line__error_char {
  -webkit-animation: shake 0.5s linear;
  animation: shake 0.5s linear, typing 1.25s infinite;
  display: inline-block;
  min-width: 7.48px;
}

// spin animation
.spin {
  animation: spin 0.5s ease-in-out;
  transition: 0.5s;
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0);
  }
}
</style>
