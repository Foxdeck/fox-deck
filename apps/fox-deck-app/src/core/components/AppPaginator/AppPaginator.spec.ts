import {describe, expect, it} from 'vitest'
import AppPaginator from './AppPaginator.vue'
import {render} from "@/testing/utils/vue-test-utils";


describe('FDPaginator', () => {
  it('should calculate the first pages correct', () => {
    const wrapper = render(AppPaginator, {
      pages: 10,
      currentPage: 2
    });

    const paginatorItem = wrapper.findAll("[data-testid=paginator-item]");

    const expectedNumbers = ["1","2","3","4","5"];
    paginatorItem.forEach((item, index) => {
      expect(item.text()).toBe(expectedNumbers[index])
    })

    expect(paginatorItem.length).toEqual(5);
  })

  it('should calculate the pages between correct', () => {
    const wrapper = render(AppPaginator, {
      pages: 10,
      currentPage: 4
    });

    const paginatorItem = wrapper.findAll("[data-testid=paginator-item]");

    const expectedNumbers = ["1","2","3","4","5"];
    paginatorItem.forEach((item, index) => {
      expect(item.text()).toBe(expectedNumbers[index])
    })

    expect(paginatorItem.length).toEqual(5);
  })

  it('should calculate the last pages correct', () => {
    const wrapper = render(AppPaginator, {
      pages: 10,
      currentPage: 8
    });

    const paginatorItem = wrapper.findAll("[data-testid=paginator-item]");

    const expectedNumbers2 = ["6","7","8","9","10"];
    paginatorItem.forEach((item, index) => {
      expect(item.text()).toBe(expectedNumbers2[index])
    })

    expect(paginatorItem.length).toEqual(5);
  })
})