<template>
  <q-item
    flat
    round
    clickable
    v-ripple
    color="grey"
    class="q-item--btn q-hoverable q-btn--push"
  >
    <slot name="default" />
  </q-item>
</template>
<script setup></script>
