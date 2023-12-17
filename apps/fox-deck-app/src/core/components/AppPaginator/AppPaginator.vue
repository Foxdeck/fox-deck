<script setup lang="ts">
import {MathUtil} from "@/core/util/math.util";
import AppPaginatorItem from "@/core/components/AppPaginator/AppPaginatorItem.vue";
import {Icon} from "@/core/components/AppIcon/icons";

const props = defineProps({
  currentPage: {type: Number, default: 1},
  pages: {type: Number, default: 1},
});

const emit = defineEmits<{
  (e: "onPaginate", value: number);
}>();

const displayPageAmount = props.pages < 5 ? props.pages : 5;
const minPage = 1;

function generatePaginatorNumbers(): number[] {
  // TODO: refactor this to make it more logical, this is currently hard to read.
  const isFirstPages = props.currentPage < displayPageAmount;
  const isLastPages = props.currentPage >= props.pages - displayPageAmount + displayPageAmount - 1;
  const isBetweenFirstAndLastPages = !isFirstPages && !isLastPages;

  if (isFirstPages) {
    return MathUtil.range(displayPageAmount!, minPage);
  }

  if (isBetweenFirstAndLastPages) {
    return MathUtil.range(
        displayPageAmount!,
        props.currentPage - 2,
    );
  }

  if (isLastPages) {
    return MathUtil.range(
        displayPageAmount!,
        props.pages - displayPageAmount + 1,
    );
  }
}

function onPaginate(page: number) {
  emit("onPaginate", page);
}

function onPaginateNext() {
  if (props.currentPage < props.pages) {
    const nextPage = props.currentPage + 1;
    emit("onPaginate", nextPage);
  }
}

function onPaginatePrev() {
  if (props.currentPage > minPage) {
    const prevPage = props.currentPage - 1;
    emit("onPaginate", prevPage);
  }
}
</script>

<template>
  <div class="flex justify-center items-center gap-1">
    <AppPaginatorItem
      data-testid="paginator-prev"
      :icon="Icon.CHEVRON_LEFT"
      @click="onPaginatePrev()"
    />

    <AppPaginatorItem
      v-for="index in generatePaginatorNumbers()"
      :key="index"
      :is-selected="currentPage === index"
      :label="''+index"
      data-testid="paginator-item"
      @click="onPaginate(index)"
    />

    <AppPaginatorItem
      data-testid="paginator-next"
      :icon="Icon.CHEVRON_RIGHT"
      @click="onPaginateNext()"
    />
  </div>
</template>
