import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Resource = {
    resourceId: string;
    parentResourceId: string | null;
    type: string;
    name: string;
    content: string | null;
    createdAt: string;
};
export type User = {
    id: string;
    username: Generated<string>;
    email: string;
    password: string;
};
export type UserResourceAssociation = {
    id: string;
    userId: string;
    resourceId: string;
};
export type DB = {
    Resource: Resource;
    User: User;
    UserResourceAssociation: UserResourceAssociation;
};
