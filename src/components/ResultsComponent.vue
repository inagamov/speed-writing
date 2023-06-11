<template>
  <q-dialog v-model="showResults">
    <q-card flat class="results_card">
      <q-card-section class="q-pa-lg">
        <div class="row no-wrap justify-between">
          <!-- title -->
          <div class="text-h5">
            {{ $t("results.title") }}
          </div>

          <!-- close -->
          <q-btn
            icon="close"
            flat
            round
            v-close-popup
            class="bg-grey-2 text-grey"
            style="border-radius: 100%"
            size="12px"
          />
        </div>

        <!-- no results -->
        <div v-if="!results.length" class="q-mt-lg">
          <div class="text-center text-grey">
            {{ $t("results.noData") }}
          </div>

          <div class="row justify-center q-mt-lg">
            <q-img src="/public/empty.svg" style="width: 50%" />
          </div>
        </div>

        <!-- attempts -->
        <div v-else class="attempts q-mt-lg">
          <div class="row q-gutter-lg q-pt-lg">
            <q-card
              v-for="(result, index) in results"
              :key="index"
              flat
              class="bg-grey-2"
              style="width: calc(50% - 24px)"
            >
              <div v-if="index === 0 && showResultsConfetti" class="confetti">
                <div class="confetti-piece" v-for="i in 13" :key="i"></div>
              </div>

              <q-btn
                icon="delete"
                flat
                round
                size="sm"
                class="bg-grey-2"
                style="position: absolute; top: -12px; right: 16px; z-index: 10"
                @click="deleteResult(result.id)"
              />

              <q-card-section>
                <!-- date -->
                <div
                  class="text-grey"
                  style="font-size: 12px; position: absolute; top: -24px"
                >
                  {{ date.formatDate(result.id, "DD.MM, HH:mm") }}
                </div>

                <!-- speed -->
                <div>
                  <div class="text-h5 text-center">
                    <q-icon name="speed" style="margin-top: -4px" />
                    {{ result.speed }}
                  </div>
                  <div class="text-center text-grey">
                    {{ $t("stats.speed") }}
                  </div>
                </div>

                <!-- accuracy -->
                <div class="q-mt-lg">
                  <div class="text-h5 text-center">{{ result.accuracy }}%</div>
                  <div class="text-center text-grey">
                    {{ $t("stats.accuracy") }}
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { watch } from "vue";
import { date } from "quasar";
import { storeToRefs } from "pinia";
import { useBaseStore } from "stores/base-store";

// base
const { results, showResults, showResultsConfetti } = storeToRefs(
  useBaseStore()
);
const { deleteResult } = useBaseStore();

/*
 * watch for results dialog to be closed
 */
watch(
  () => showResults.value,
  () => {
    if (showResults.value === false) {
      showResultsConfetti.value = false;
    }
  }
);
</script>

<style scoped lang="scss">
.results_card {
  min-width: 500px;
  border-radius: 20px;
}

.attempts {
  max-height: 364px;
  overflow-y: scroll;
}

/*
 * confetti
 */
.confetti {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  max-height: 162px;
  overflow: hidden;
  z-index: 9;
}
.confetti-piece {
  position: absolute;
  width: 10px;
  height: 30px;
  background: #ffd300;
  top: 0;
  opacity: 0;
}
.confetti-piece:nth-child(1) {
  left: 7%;
  -webkit-transform: rotate(-40deg);
  -ms-transform: rotate(-40deg);
  transform: rotate(-40deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 182ms;
  animation-delay: 182ms;
  -webkit-animation-duration: 1116ms;
  animation-duration: 1116ms;
}
.confetti-piece:nth-child(2) {
  left: 14%;
  -webkit-transform: rotate(4deg);
  -ms-transform: rotate(4deg);
  transform: rotate(4deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 161ms;
  animation-delay: 161ms;
  -webkit-animation-duration: 1076ms;
  animation-duration: 1076ms;
}
.confetti-piece:nth-child(3) {
  left: 21%;
  -webkit-transform: rotate(-51deg);
  -ms-transform: rotate(-51deg);
  transform: rotate(-51deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 481ms;
  animation-delay: 481ms;
  -webkit-animation-duration: 1103ms;
  animation-duration: 1103ms;
}
.confetti-piece:nth-child(4) {
  left: 28%;
  -webkit-transform: rotate(61deg);
  -ms-transform: rotate(61deg);
  transform: rotate(61deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 334ms;
  animation-delay: 334ms;
  -webkit-animation-duration: 708ms;
  animation-duration: 708ms;
}
.confetti-piece:nth-child(5) {
  left: 35%;
  -webkit-transform: rotate(-52deg);
  -ms-transform: rotate(-52deg);
  transform: rotate(-52deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 302ms;
  animation-delay: 302ms;
  -webkit-animation-duration: 776ms;
  animation-duration: 776ms;
}
.confetti-piece:nth-child(6) {
  left: 42%;
  -webkit-transform: rotate(38deg);
  -ms-transform: rotate(38deg);
  transform: rotate(38deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 180ms;
  animation-delay: 180ms;
  -webkit-animation-duration: 1168ms;
  animation-duration: 1168ms;
}
.confetti-piece:nth-child(7) {
  left: 49%;
  -webkit-transform: rotate(11deg);
  -ms-transform: rotate(11deg);
  transform: rotate(11deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 395ms;
  animation-delay: 395ms;
  -webkit-animation-duration: 1200ms;
  animation-duration: 1200ms;
}
.confetti-piece:nth-child(8) {
  left: 56%;
  -webkit-transform: rotate(49deg);
  -ms-transform: rotate(49deg);
  transform: rotate(49deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 14ms;
  animation-delay: 14ms;
  -webkit-animation-duration: 887ms;
  animation-duration: 887ms;
}
.confetti-piece:nth-child(9) {
  left: 63%;
  -webkit-transform: rotate(-72deg);
  -ms-transform: rotate(-72deg);
  transform: rotate(-72deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 149ms;
  animation-delay: 149ms;
  -webkit-animation-duration: 805ms;
  animation-duration: 805ms;
}
.confetti-piece:nth-child(10) {
  left: 70%;
  -webkit-transform: rotate(10deg);
  -ms-transform: rotate(10deg);
  transform: rotate(10deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 351ms;
  animation-delay: 351ms;
  -webkit-animation-duration: 1059ms;
  animation-duration: 1059ms;
}
.confetti-piece:nth-child(11) {
  left: 77%;
  -webkit-transform: rotate(4deg);
  -ms-transform: rotate(4deg);
  transform: rotate(4deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 307ms;
  animation-delay: 307ms;
  -webkit-animation-duration: 1132ms;
  animation-duration: 1132ms;
}
.confetti-piece:nth-child(12) {
  left: 84%;
  -webkit-transform: rotate(42deg);
  -ms-transform: rotate(42deg);
  transform: rotate(42deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 464ms;
  animation-delay: 464ms;
  -webkit-animation-duration: 776ms;
  animation-duration: 776ms;
}
.confetti-piece:nth-child(13) {
  left: 91%;
  -webkit-transform: rotate(-72deg);
  -ms-transform: rotate(-72deg);
  transform: rotate(-72deg);
  -webkit-animation: makeItRain 1000ms infinite ease-out;
  animation: makeItRain 1000ms infinite ease-out;
  -webkit-animation-delay: 429ms;
  animation-delay: 429ms;
  -webkit-animation-duration: 818ms;
  animation-duration: 818ms;
}
.confetti-piece:nth-child(odd) {
  background: #7431e8;
}
.confetti-piece:nth-child(even) {
  z-index: 1;
}
.confetti-piece:nth-child(4n) {
  width: 5px;
  height: 12px;
  -webkit-animation-duration: 2000ms;
  animation-duration: 2000ms;
}
.confetti-piece:nth-child(3n) {
  width: 3px;
  height: 10px;
  -webkit-animation-duration: 2500ms;
  animation-duration: 2500ms;
  -webkit-animation-delay: 1000ms;
  animation-delay: 1000ms;
}
.confetti-piece:nth-child(4n-7) {
  background: red;
}
@-webkit-keyframes makeItRain {
  from {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  to {
    -webkit-transform: translateY(350px);
    transform: translateY(350px);
  }
}
@keyframes makeItRain {
  from {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  to {
    -webkit-transform: translateY(350px);
    transform: translateY(350px);
  }
}
</style>
