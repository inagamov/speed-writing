<template>
  <div class="header" ref="header">
    <!-- typing speed / characters per minute -->
    <HeaderCard>
      <div
        class="text-center"
        :class="$q.platform.is.mobile ? 'text-h6' : 'text-h4'"
      >
        <q-icon
          v-if="!$q.platform.is.mobile"
          name="speed"
          style="margin-top: -4px"
        />
        {{ timerInterval && isFinite(speed) ? speed : "***" }}
        <template v-if="song">
          / <span>{{ song.speed }}</span>
        </template>
      </div>
      <div class="text-center text-grey">{{ $t("stats.speed.full") }}</div>
    </HeaderCard>

    <!-- accuracy -->
    <HeaderCard class="q-mx-lg">
      <template #default>
        <div
          class="text-center"
          :class="$q.platform.is.mobile ? 'text-h6' : 'text-h4'"
        >
          {{ timerInterval ? accuracy + "%" : "**" }}
        </div>
        <div class="text-center text-grey">{{ $t("stats.accuracy") }}</div>
      </template>
    </HeaderCard>

    <div class="header__bar">
      <!-- language -->
      <HeaderAction
        class="q-pa-none"
        :class="showLangOptions ? 'bg-grey-2' : ''"
      >
        <LangSwitch @toggle-menu="showLangOptions = $event" />
      </HeaderAction>

      <!-- more -->
      <HeaderAction :class="showSettings ? 'bg-grey-2' : ''">
        <template #default>
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
            <q-list class="column q-gutter-sm">
              <!-- sounds on/off -->
              <HeaderActionOption
                :class="
                  settings[SETTINGS.SOUNDS]
                    ? 'bg-black text-white'
                    : 'bg-grey-2 text-black'
                "
                @click="
                  updateSettings(SETTINGS.SOUNDS, !settings[SETTINGS.SOUNDS])
                "
              >
                <template #title>
                  {{ $t("settings.sounds") }}
                </template>

                <template #icon>
                  <q-icon
                    :name="
                      settings[SETTINGS.SOUNDS] ? 'toggle_on' : 'toggle_off'
                    "
                    size="30px"
                  />
                </template>
              </HeaderActionOption>

              <!-- lines amount -->
              <HeaderActionOption class="bg-grey-2">
                <template #title>
                  {{ $t("settings.lines_amount") }}
                </template>

                <template #icon>
                  <div
                    class="row no-wrap"
                    style="margin: auto 0; margin-right: -3px"
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
                </template>
              </HeaderActionOption>

              <!-- mode -->
              <HeaderActionOption
                class="bg-grey-2 text-black"
                @click="
                  updateSettings(
                    SETTINGS.MODE,
                    settings[SETTINGS.MODE] === MODES.DEFAULT
                      ? MODES.LYRICS
                      : MODES.DEFAULT
                  )
                "
                v-close-popup
              >
                <template #title>
                  {{ $t("modes.title") }}
                </template>

                <template #icon>
                  <q-icon
                    :name="
                      settings[SETTINGS.MODE] === MODES.DEFAULT
                        ? 'article'
                        : 'library_music'
                    "
                    size="24px"
                  />
                </template>
              </HeaderActionOption>

              <q-separator class="q-mt-md q-mb-sm bg-grey-4" />

              <!-- results -->
              <HeaderActionOption
                @click="showResults = true"
                v-close-popup
                class="bg-grey-2"
              >
                <template #title>
                  {{ $t("results.title") }}
                </template>

                <template #icon>
                  <q-icon
                    name="open_in_new"
                    style="margin: auto 0"
                    size="18px"
                  />
                </template>
              </HeaderActionOption>
            </q-list>
          </q-menu>
        </template>
      </HeaderAction>

      <!-- restart -->
      <HeaderAction @click="loadLines()">
        <template #default>
          <q-icon
            name="auto_mode"
            size="24px"
            style="margin: auto auto"
            :class="loading ? 'spin' : ''"
          />
        </template>
      </HeaderAction>
    </div>
  </div>
</template>

<script setup>
import { SETTINGS } from "src/constants/SETTINGS";
import LangSwitch from "components/LangSwitch.vue";
import { useBaseStore } from "stores/base-store";
import { useSettingsStore } from "stores/settings-store";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import HeaderAction from "components/Header/HeaderAction.vue";
import HeaderCard from "components/Header/HeaderCard.vue";
import HeaderActionOption from "components/Header/HeaderActionOption.vue";
import { MODES } from "src/constants/MODES";

// lang
const { locale } = useI18n({ useScope: "global" });
const showLangOptions = ref(false);

// base
const {
  lines,
  loading,
  timerInterval,
  accuracy,
  speed,
  results,
  showResults,
  song,
} = storeToRefs(useBaseStore());
const { loadLines, addLine, removeLine } = useBaseStore();

// settings
const { settings } = storeToRefs(useSettingsStore());
const { updateSettings } = useSettingsStore();
const showSettings = ref(false);

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
 * watch for mode update
 */
watch(
  () => settings.value.mode,
  () => {
    loadLines();
  }
);

/*
 * header sticky styles
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 0.275s;
}
.header--stuck .q-card {
  box-shadow: rgba(0, 0, 0, 0.075) 0 10px 20px !important;
}

.header .q-card__section {
  padding: 48px 16px;
  transition: 0.275s;
}
.header--stuck .q-card__section {
  padding: 16px;
}

.header__bar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.275s;
}
</style>
