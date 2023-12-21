import {describe, expect, it} from "vitest";
import {render} from "@/testing/utils/vue-test-utils";
import {DOMWrapper} from "@vue/test-utils";
import type {AppCardProps} from "@/core/components/AppCard/AppCard.types";
import AppCard from "@/core/components/AppCard/AppCard.vue";

describe("AppCard", () => {
  it("should only render the image", async () => {
    const wrapper = render<AppCardProps>(AppCard, {
        imageUrl: "https://myimageurl",
      }
    );

    const cardElement = wrapper.find(AppCardSpecHelper.cardElementSelector);

    expect(AppCardSpecHelper.doesHeaderExist(cardElement)).toBeTruthy();
    expect(AppCardSpecHelper.doesBodyExist(cardElement)).toBeFalsy();
    expect(AppCardSpecHelper.doesFooterExist(cardElement)).toBeFalsy();
  })

  it("should only render headline", async () => {
    const wrapper = render<AppCardProps>(AppCard, {
        headline: "Glass Souls´ World Tour"
      }
    );

    const cardElement = wrapper.find(AppCardSpecHelper.cardElementSelector);

    expect(AppCardSpecHelper.doesHeaderExist(cardElement)).toBeFalsy();
    expect(AppCardSpecHelper.doesFooterExist(cardElement)).toBeFalsy();
    expect(AppCardSpecHelper.doesBodyExist(cardElement)).toBeTruthy();
    expect(AppCardSpecHelper.getHeadlineText(cardElement)).toBe("Glass Souls´ World Tour");
  })

  it("should only render footer", async () => {
    const wrapper = render<AppCardProps>(AppCard, {
        actions: [
          {
            label: "Primary action"
          },
          {
            label: "Secondary action"
          }
        ]
      }
    );

    const cardElement = wrapper.find(AppCardSpecHelper.cardElementSelector);

    expect(AppCardSpecHelper.doesHeaderExist(cardElement)).toBeFalsy();
    expect(AppCardSpecHelper.doesBodyExist(cardElement)).toBeFalsy();
    expect(AppCardSpecHelper.doesFooterExist(cardElement)).toBeTruthy();
    expect(AppCardSpecHelper.getActions(cardElement).length).toEqual(2);
    expect(AppCardSpecHelper.getActionsText(cardElement)).toEqual(["Primary action", "Secondary action"]);
  })
})

/**
 * Helper functions for writing UI tests for the card component.
 */
const AppCardSpecHelper = {
  cardElementSelector: "[data-testid=card]",
  cardHeaderElementSelector: "[data-testid=card-header]",
  cardBodyElementSelector: "[data-testid=card-body]",
  cardFooterElementSelector: "[data-testid=card-footer]",
  cardHeadlineElementSelector: "[data-testid=card-headline]",
  cardActionElementSelector: "[data-testid=card-action]",

  doesHeaderExist: (cardElement: DOMWrapper<Element>) => {
    return cardElement.find(AppCardSpecHelper.cardHeaderElementSelector).exists();
  },

  doesBodyExist: (cardElement: DOMWrapper<Element>) => {
    return cardElement.find(AppCardSpecHelper.cardBodyElementSelector).exists();
  },

  doesFooterExist: (cardElement: DOMWrapper<Element>) => {
    return cardElement.find(AppCardSpecHelper.cardFooterElementSelector).exists();
  },

  getHeadlineText: (cardElement: DOMWrapper<Element>) => {
    return cardElement.find(AppCardSpecHelper.cardHeadlineElementSelector).text();
  },

  getActions: (cardElement: DOMWrapper<Element>) => {
    return cardElement.findAll(AppCardSpecHelper.cardActionElementSelector);
  },

  getActionsText: (cardElement: DOMWrapper<Element>) => {
    return AppCardSpecHelper.getActions(cardElement).map((action) => action.text());
  }
}