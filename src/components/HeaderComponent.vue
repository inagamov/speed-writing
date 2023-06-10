<template>
  <div class="header" ref="header">
    <!-- typing speed / characters per minute -->
    <q-card flat class="bg-grey-2">
      <q-card-section>
        <div class="text-h4 text-center">
          {{
            timerInterval && isFinite(charsPerMinute) ? charsPerMinute : "***"
          }}
        </div>
        <div class="text-center">{{ $t("stats.speed") }}</div>
      </q-card-section>
    </q-card>

    <!-- accuracy -->
    <q-card flat class="bg-grey-2 q-mx-lg">
      <q-card-section>
        <div class="text-h4 text-center">
          {{ timerInterval ? accuracy + "%" : "**" }}
        </div>
        <div class="text-center">{{ $t("stats.accuracy") }}</div>
      </q-card-section>
    </q-card>

    <!-- settings -->
    <div class="header__settings">
      <!-- language -->
      <LangSwitch />

      <!-- other settings -->
      <q-item
        flat
        round
        color="grey"
        clickable
        v-ripple
        class="q-item--btn q-hoverable q-btn--push"
        :class="showSettings ? 'bg-grey-2' : ''"
      >
        <q-icon name="more_horiz" size="24px" style="margin: auto auto" />

        <!-- options -->
        <q-menu
          v-model="showSettings"
          anchor="top left"
          self="top right"
          transition-show="jump-left"
          transition-hide="jump-right"
          :offset="[8, 0]"
          separate-close-popup
        >
          <q-list>
            <!-- sounds -->
            <q-item
              clickable
              style="border-radius: 10px"
              :class="
                settings[SETTINGS.SOUNDS]
                  ? 'bg-black text-white'
                  : 'bg-white text-black'
              "
              @click="
                updateSettings(SETTINGS.SOUNDS, !settings[SETTINGS.SOUNDS])
              "
            >
              <q-item-section>
                <div class="row no-wrap">
                  <div class="q-pr-md" style="margin: auto 0">
                    {{ $t("settings.sounds") }}
                  </div>

                  <q-space />

                  <q-icon
                    :name="
                      settings[SETTINGS.SOUNDS] ? 'toggle_on' : 'toggle_off'
                    "
                    size="30px"
                  />
                </div>
              </q-item-section>
            </q-item>

            <!-- lines amount -->
            <q-item
              style="border-radius: 10px"
              class="q-mt-sm q-py-none bg-grey-2"
            >
              <q-item-section>
                <div class="row no-wrap">
                  <div class="q-pr-lg" style="margin: auto 0">
                    {{ $t("settings.lines_amount") }}
                  </div>

                  <q-space />

                  <div
                    class="row no-wrap"
                    style="margin: auto 0; margin-right: -6px"
                  >
                    <!-- remove line -->
                    <q-btn
                      flat
                      round
                      style="min-width: 30px; min-height: 30px"
                      :disable="lines.length === 1"
                      @click="
                        updateSettings(
                          SETTINGS.LINES_AMOUNT,
                          (settings[SETTINGS.LINES_AMOUNT] -= 1)
                        );
                        removeLine();
                      "
                    >
                      <template #default>
                        <q-icon name="do_not_disturb_on" />
                      </template>
                    </q-btn>

                    <!-- add line -->
                    <q-btn
                      flat
                      round
                      style="min-width: 30px; min-height: 30px"
                      @click="
                        updateSettings(
                          SETTINGS.LINES_AMOUNT,
                          (settings[SETTINGS.LINES_AMOUNT] += 1)
                        );
                        addLine();
                      "
                    >
                      <template #default>
                        <q-icon name="add_circle" />
                      </template>
                    </q-btn>
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-item>

      <!-- restart -->
      <q-item
        flat
        round
        color="grey"
        clickable
        v-ripple
        class="q-item--btn q-hoverable q-btn--push"
        @click="loadLines()"
      >
        <q-icon
          name="auto_mode"
          size="24px"
          style="margin: auto auto"
          :class="loading ? 'spin' : ''"
        />
      </q-item>
    </div>
  </div>
</template>

<script setup>
import { SETTINGS } from "src/constants/SETTINGS";
import LangSwitch from "components/LangSwitch.vue";
import { useBaseStore } from "stores/base-store";
import { useSettingsStore } from "stores/settings-store";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n({ useScope: "global" });

const { loadLines, addLine, removeLine } = useBaseStore();
const { updateSettings } = useSettingsStore();

const {
  lines,
  activeLineIndex,
  activeCharIndex,
  mistakesCount,
  time,
  timerInterval,
  loading,
} = storeToRefs(useBaseStore());

const { settings } = storeToRefs(useSettingsStore());

const showSettings = ref(false);

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
 * watch for locale update
 */
watch(
  () => locale.value,
  () => {
    loadLines();
  }
);

/*
 * stuck
 */
const header = ref();
window.addEventListener("scroll", () => {
  if (header.value.offsetTop > 24) {
    header.value.classList.add("header--stuck");
  } else {
    header.value.classList.remove("header--stuck");
  }
});
</script>

<style scoped lang="scss">
.header {
  display: flex;
  position: sticky;
  top: 24px;
  z-index: 1;
  max-width: 100%;
  transition: 0.275s;
}

.header--stuck {
  background: rgba($secondary, 0.5);
  backdrop-filter: blur(8px);
  border-radius: 30px;
  padding: 16px;
}

.header .q-card {
  width: 100%;
  transition: 0.275s;
}
.header--stuck .q-card {
  box-shadow: rgba(0, 0, 0, 0.075) 0 10px 20px !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.header .q-card__section {
  padding: 48px 16px;
  transition: 0.275s;
}
.header--stuck .q-card__section {
  padding: 16px;
}

.header__settings {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.275s;
}
</style>
