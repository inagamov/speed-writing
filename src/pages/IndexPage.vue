<template>
  <q-page>
    <div class="container">
      <div class="row no-wrap q-py-lg">
        <!-- stats -->
        <div class="row q-gutter-lg full-width">
          <!-- typing speed / characters per minute -->
          <q-card
            flat
            class="bg-grey-2"
            :style="
              $q.platform.is.mobile
                ? 'width: 100%;'
                : 'width: calc(50% - 24px);'
            "
          >
            <q-card-section class="q-py-xl">
              <div class="text-h4 text-center">
                {{
                  timerInterval && isFinite(charsPerMinute)
                    ? charsPerMinute
                    : "***"
                }}
              </div>
              <div class="text-center">{{ $t("stats.speed") }}</div>
            </q-card-section>
          </q-card>

          <!-- accuracy -->
          <q-card
            flat
            class="bg-grey-2"
            :style="
              $q.platform.is.mobile
                ? 'width: 100%;'
                : 'width: calc(50% - 24px);'
            "
          >
            <q-card-section class="q-py-xl">
              <div class="text-h4 text-center">
                {{ timerInterval ? accuracy + "%" : "**" }}
              </div>
              <div class="text-center">{{ $t("stats.accuracy") }}</div>
            </q-card-section>
          </q-card>
        </div>

        <!-- settings -->
        <div class="column justify-between q-ml-md">
          <LangSwitch />
        </div>
      </div>

      <!-- loading -->
      <q-intersection
        v-if="loading"
        transition="scale"
        once
        class="row justify-center"
      >
        <q-spinner-ios color="grey" size="32px" />
      </q-intersection>

      <template v-else>
        <!-- lines -->
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
              lineIndex === activeLineIndex && activeCharIndex - 1 === charIndex
                ? 'line__passed_char--pressed'
                : ''
            }`"
          >
            {{ char }}
          </span>
        </q-intersection>
      </template>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onBeforeMount, watch } from "vue";
import { storeToRefs } from "pinia";
import { useBaseStore } from "stores/base-store";
import { useQuasar } from "quasar";
import LangSwitch from "components/LangSwitch.vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n({ useScope: "global" });
const $q = useQuasar();
const { fetchLines, startTimer } = useBaseStore();

/*
 * variables
 */
const {
  lines,
  activeLineIndex,
  activeCharIndex,
  mistakesCount,
  isMistaken,
  time,
  timerInterval,
  loading,
} = storeToRefs(useBaseStore());

const activeLine = computed(() => {
  return lines.value[activeLineIndex.value];
});

onBeforeMount(async () => {
  /*
   * fetch lines
   */
  await fetchLines(locale.value);

  /*
   * input
   */
  document.addEventListener("keydown", function (event) {
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
      }

      // proceed to the next line
      if (activeLine.value?.length === activeCharIndex.value) {
        activeLineIndex.value += 1;
        activeCharIndex.value = 0;
      }
    }
  });
});

/*
 * typing speed
 */
const charsPerMinute = computed(() => {
  // compute total amount of characters typed by user
  let totalChars = 0;
  lines.value.map((line, index) => {
    if (activeLineIndex.value >= index) {
      totalChars += line?.slice(
        0,
        activeLineIndex.value === index
          ? activeCharIndex.value + 1
          : line.length
      ).length;
    }
  });

  // compute typing speed, rounding the number
  return Math.trunc((totalChars / time.value) * 100);
});

/*
 * accuracy
 */
const accuracy = computed(() => {
  // compute total amount of characters typed by user
  let totalChars = 0;
  lines.value.map((line, index) => {
    if (activeLineIndex.value >= index) {
      totalChars += line?.slice(
        0,
        activeLineIndex.value === index
          ? activeCharIndex.value + 1
          : line.length
      ).length;
    }
  });

  // compute accuracy
  const result = Math.round(
    ((totalChars - mistakesCount.value) / totalChars) * 100
  );
  return result > 0 ? result : 0;
});

/*
 * watch locale
 */
watch(
  () => locale.value,
  () => {
    fetchLines(locale.value);
  }
);
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
</style>
