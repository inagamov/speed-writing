<template>
  <div style="width: 100%; height: 100%">
    <div :style="`width: ${size}; height: ${size}`" class="absolute-center">
      <!-- ru-RU -->
      <q-img v-if="locale === 'ru-RU'" src="/public/russian_flag.svg" />

      <!-- en-US -->
      <q-img v-if="locale === 'en-US'" src="/public/british_flag.svg" />
    </div>

    <!-- options -->
    <q-menu
      v-model="showOptions"
      :anchor="anchor"
      :self="self"
      :transition-show="enterTransition"
      :transition-hide="leaveTransition"
      :offset="[8, 0]"
      separate-close-popup
    >
      <q-list dense>
        <q-item
          v-for="option in localeOptions"
          :key="option.id"
          v-close-popup
          clickable
          style="border-radius: 10px"
          @click="changeLang(option.value)"
        >
          <q-item-section>
            {{ option.label }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, watch } from "vue";

/*
 * props
 */
defineProps({
  size: { type: String, default: "24px" },
  anchor: { type: String, default: "top left" },
  self: { type: String, default: "top right" },
  enterTransition: { type: String, default: "jump-left" },
  leaveTransition: { type: String, default: "jump-right" },
});

/*
 * locale
 */
const { locale } = useI18n({ useScope: "global" });
const localeOptions = [
  { value: "en-US", label: "English" },
  { value: "ru-RU", label: "Русский" },
];

const changeLang = (lang) => {
  locale.value = lang;
  localStorage.setItem("lang", locale.value);
};

/*
 * options
 */
const emit = defineEmits(["toggleMenu"]);
const showOptions = ref(false);
watch(
  () => showOptions.value,
  () => {
    emit("toggleMenu", showOptions.value);
  }
);
</script>
