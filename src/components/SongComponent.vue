<template>
  <q-card
    flat
    class="fixed-bottom-right q-mb-lg q-mr-lg bg-grey-2"
    :style="
      $q.platform.is.mobile
        ? 'border-radius: 60px 60px 0 0; width: 100%; margin-right: 0; margin-bottom: 0;'
        : 'border-radius: 100px 40px 40px 100px;'
    "
  >
    <q-card-section class="row no-wrap">
      <div class="relative-position">
        <q-img
          :src="song.cover_src"
          class="cover spin"
          :class="!song.isPlaying ? 'spin--paused' : ''"
        />
        <q-item
          class="absolute-center q-item--btn cover__pause_btn q-hoverable"
          clickable
          style="border-radius: 100%"
          v-ripple
          @click="toggleAudio()"
        >
          <q-icon
            :name="song.isPlaying ? 'pause' : 'play_arrow'"
            color="white"
            size="24px"
            class="absolute-center"
          />
        </q-item>
      </div>

      <div class="q-pl-md ellipsis" style="margin: auto 0">
        <div class="text-h6 ellipsis">{{ song.name }}</div>
        <div class="text-grey ellipsis">{{ song.author }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useBaseStore } from "stores/base-store";

const { song } = storeToRefs(useBaseStore());
const { playTimer, pauseTimer } = useBaseStore();

const toggleAudio = () => {
  if (song.value.isPlaying) {
    song.value.audio.pause();
    song.value.isPlaying = false;
    pauseTimer();
  } else {
    song.value.audio.play();
    song.value.isPlaying = true;
    playTimer();
  }
};
</script>

<style scoped></style>

<style scoped lang="scss">
.cover {
  border-radius: 100%;
  width: 100px;
  height: 100px;
}

.spin {
  animation: spin 5s infinite linear;
}

.spin--paused {
  animation-play-state: paused;
}

@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
