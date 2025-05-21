import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY='roles'
export const Roles= (  ...Roles : string[])=> SetMetadata(ROLES_KEY, Roles)
// this alloe user to use @Roles('admin') or @Roles('admin','customer')
