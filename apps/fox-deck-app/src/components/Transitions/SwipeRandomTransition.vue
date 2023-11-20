<script setup lang="ts">
import { MathUtil } from "@/util/math.util";
import anime from "animejs/lib/anime.es.js";

function leaveAnimation(element: HTMLElement, done: any) {
  const randomRotation = MathUtil.random(-10, 10);
  anime({
    targets: element,
    opacity: [1, 0],
    translateX: [0, 800],
    rotate: [0, randomRotation],
    duration: 300,
    easing: "easeInOutSine",
    complete: done,
  });
}

function enterAnimation(element: HTMLElement, done: any) {
  const randomRotationMax = MathUtil.random(-10, 10);
  const randomRotationMin = MathUtil.random(-5, 5);
  const randomTranslateY = MathUtil.random(-200, 200);

  const random = MathUtil.random(0, 1);
  const width = window.innerWidth - element.clientWidth;
  const windowWidth = random === 0 ? width : -width;

  anime({
    targets: element,
    translateX: [windowWidth, 0],
    translateY: [randomTranslateY, 0],
    rotate: [randomRotationMax, randomRotationMin],
    duration: 1000,
    easing: "easeInOutSine",
    complete: done,
  });
}
</script>
<template>
  <TransitionGroup
    name="swipe-random"
    :css="false"
    @enter="enterAnimation"
    @leave="leaveAnimation"
  >
    <slot />
  </TransitionGroup>
</template>