import type {AppMenuItemProps} from "@/core/components/AppMenu/AppMenu.types";
import {Icon} from "@/core/components/AppIcon/icons";

// todo: this is currently wip
export const addMenu: AppMenuItemProps[] = [
    {
        icon: Icon.FOLDER,
        label: "module"
    },
    {
        icon: Icon.DOCUMENT,
        label: "Note"
    },
]