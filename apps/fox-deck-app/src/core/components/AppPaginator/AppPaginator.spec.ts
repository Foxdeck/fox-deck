import {describe, expect, it} from 'vitest'
import AppPaginator from './AppPaginator.vue'
import {render} from "@/testing/utils/vue-test-utils";
import type {DOMWrapper} from "@vue/test-utils";


describe('FDPaginator', () => {
  it('should calculate the first pages correct', () => {
    const wrapper = render(AppPaginator, {
      pages: 10,
      currentPage: 2
    });

    const paginatorItems = wrapper.findAll(AppPaginatorSpecHelper.paginatorItem);

    expect(AppPaginatorSpecHelper.getPaginatorItemsText(paginatorItems)).toEqual(["1","2","3","4","5"]);
  })

  it('should calculate the pages between correct', () => {
    const wrapper = render(AppPaginator, {
      pages: 10,
      currentPage: 4
    });

    const paginatorItems = wrapper.findAll(AppPaginatorSpecHelper.paginatorItem);

    expect(AppPaginatorSpecHelper.getPaginatorItemsText(paginatorItems)).toEqual(["1","2","3","4","5"]);
  })

  it('should calculate the last pages correct', () => {
    const wrapper = render(AppPaginator, {
      pages: 10,
      currentPage: 8
    });

    const paginatorItems = wrapper.findAll(AppPaginatorSpecHelper.paginatorItem);

    expect(AppPaginatorSpecHelper.getPaginatorItemsText(paginatorItems)).toEqual(["6","7","8","9","10"]);
  })
})

/**
 * Helper functions for writing UI tests for the paginator component.
 */
const AppPaginatorSpecHelper = {
  paginatorItem: "[data-testid=paginator-item]",

  getPaginatorItemsText: (paginatorItems: DOMWrapper<Element>[]): string[] => {
    return paginatorItems.map((item) => item.text());
  },
}