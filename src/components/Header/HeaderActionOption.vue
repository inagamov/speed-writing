<template>
  <q-item clickable v-ripple class="q-hoverable" style="border-radius: 10px">
    <q-item-section>
      <div class="row no-wrap">
        <div class="q-pr-md" style="margin: auto 0">
          <slot name="title" />
        </div>

        <q-space />

        <slot name="icon" />
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { SETTINGS } from "src/constants/SETTINGS";
</script>
