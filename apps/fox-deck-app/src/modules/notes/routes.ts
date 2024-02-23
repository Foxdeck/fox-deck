import type {RouteRecordRaw} from "vue-router";

export enum NoteRouteNames {
  NOTE = "note",
  CREATE_NOTE = "create-note",
}

export const noteRoutes: RouteRecordRaw[] = [
  {
    path: "/create-note",
    name: NoteRouteNames.CREATE_NOTE,
    component: () => import("./NotesView.vue"),
  },
  {
    path: "/note/:id",
    name: NoteRouteNames.NOTE,
    component: () => import("./NotesView.vue"),
  },
];
