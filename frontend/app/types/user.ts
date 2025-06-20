import { Group } from "./group";

export interface User {
    name: string;
    email: string;
    password: string;
    phone: string;
    groups: Group[];
}