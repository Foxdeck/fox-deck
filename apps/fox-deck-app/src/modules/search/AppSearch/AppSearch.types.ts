import type {DatabaseResource} from "@/core/services/api";

export type AppSearchResultProps = {
  results: DatabaseResource[];
}

export type AppSearchResultItemProps = {
  readonly label?: string;
  readonly isFavorite?: boolean;
};