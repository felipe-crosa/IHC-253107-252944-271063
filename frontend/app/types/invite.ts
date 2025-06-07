import { Group } from "./group";
import { User } from "./user.interface";

export const InviteStatus = {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
} as const;

export type InviteStatus = (typeof InviteStatus)[keyof typeof InviteStatus];

export interface Invite extends Group {}


