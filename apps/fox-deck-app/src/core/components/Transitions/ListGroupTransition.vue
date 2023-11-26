<script setup lang="ts">
import anime from "animejs/lib/anime.es.js";

const duration = 500;
const easing = "easeInOutSine";

function leaveAnimation(element: HTMLElement, done: any) {
  anime({
    targets: element,
    opacity: [1, 0],
    scale: [1, 0],
    easing,
    duration,
    complete: done,
  });
}

function enterAnimation(element: HTMLElement, done: any) {
  anime({
    targets: element,
    opacity: [0, 1],
    scale: [0, 1],
    duration,
    easing,
    complete: done,
  });
}
</script>
<template>
  <TransitionGroup
    :css="false"
    @enter="enterAnimation"
    @leave="leaveAnimation"
  >
    <slot />
  </TransitionGroup>
</template>
