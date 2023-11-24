<script setup lang="ts">
import {MathUtil} from "@/core/util/math.util";
import FDPaginatorItem from "@/core/components/FDPaginator/FDPaginatorItem.vue";

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
  <ol class="flex justify-center gap-1 text-sm">
    <FDPaginatorItem
      data-testid="paginator-prev"
      @click="onPaginatePrev()"
    >
      <vue-feather
        type="chevron-left"
        size="14"
      />
    </FDPaginatorItem>

    <FDPaginatorItem
      v-for="index in generatePaginatorNumbers()"
      :key="index"
      :is-selected="currentPage === index"
      data-testid="paginator-item"
      @click="onPaginate(index)"
    >
      {{ index }}
    </FDPaginatorItem>

    <FDPaginatorItem
      data-testid="paginator-next"
      @click="onPaginateNext()"
    >
      <vue-feather
        type="chevron-right"
        size="14"
      />
    </FDPaginatorItem>
  </ol>
</template>
