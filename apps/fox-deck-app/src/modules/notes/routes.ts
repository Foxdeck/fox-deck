import type {FoxdeckRoute} from "@/router/foxdeck-route.type";

export enum NoteRouteNames {
  NOTES = "notes",
}

export const noteRoutes: FoxdeckRoute[] = [
  {
    path: "/notes",
    name: NoteRouteNames.NOTES,
    component: () => import("./NotesView.vue"),
    isVisibleInNavigation: false
  },
];
