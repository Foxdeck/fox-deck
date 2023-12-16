import type {FoxdeckRoute} from "@/router/foxdeck-route.type";

export enum NoteRouteNames {
  NOTE = "note",
  CREATE_NOTE = "create-note",
}

export const noteRoutes: FoxdeckRoute[] = [
  {
    path: "/create-note",
    name: NoteRouteNames.CREATE_NOTE,
    component: () => import("./NotesView.vue"),
    isVisibleInNavigation: false,
  },
  {
    path: "/note/:id",
    name: NoteRouteNames.NOTE,
    component: () => import("./NotesView.vue"),
    isVisibleInNavigation: false
  },
];
