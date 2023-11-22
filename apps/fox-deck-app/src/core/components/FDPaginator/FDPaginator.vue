<script setup lang="ts">
import { MathUtil } from "@/core/util/math.util";
import FDPaginatorItem from "@/core/components/FDPaginator/FDPaginatorItem.vue";

const props = defineProps({
  currentPage: { type: Number, default: 1 },
  maxPage: { type: Number, default: 1 },
  displayPageAmount: { type: Number, default: 5 },
});

const emit = defineEmits<{
  (e: "onPaginate", value: number);
}>();

const minPage = 1;

function generatePaginatorNumbers(): number[] {
  if (props.currentPage < props.displayPageAmount) {
    return MathUtil.range(props.displayPageAmount!, minPage);
  }

  if (
    props.currentPage >= props.displayPageAmount &&
    props.currentPage <= props.maxPage - props.displayPageAmount / 2
  ) {
    return MathUtil.range(
      props.displayPageAmount!,
      props.currentPage - props.displayPageAmount / 2 - 2,
    );
  }

  if (props.currentPage >= props.maxPage - props.displayPageAmount) {
    return MathUtil.range(
      props.displayPageAmount!,
      props.maxPage - props.displayPageAmount + 1,
    );
  }
}

function onPaginate(page: number) {
  emit("onPaginate", page);
}

function onPaginateNext() {
  if (props.currentPage < props.maxPage) {
    const nextPage = (props.currentPage += 1);
    emit("onPaginate", nextPage);
  }
}

function onPaginatePrev() {
  if (props.currentPage > minPage) {
    const prevPage = (props.currentPage -= 1);
    emit("onPaginate", prevPage);
  }
}
</script>

<template>
  <ol class="flex justify-center gap-1 text-sm">
    <FDPaginatorItem @click="onPaginatePrev()">
      <vue-feather type="chevron-left" size="14" />
    </FDPaginatorItem>

    <FDPaginatorItem
      v-for="index in generatePaginatorNumbers()"
      :is-selected="currentPage === index"
      @click="onPaginate(index)"
    >
      {{ index }}
    </FDPaginatorItem>

    <FDPaginatorItem @click="onPaginateNext()">
      <vue-feather type="chevron-right" size="14" />
    </FDPaginatorItem>
  </ol>
</template>
