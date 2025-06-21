import { Group } from "./group";
import { User } from "./user";

export const InviteStatus = {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
} as const;

export type InviteStatus = (typeof InviteStatus)[keyof typeof InviteStatus];

export interface Invite {
    id: number;
    user_id: number;
    group_id: number;
    status: InviteStatus;
    created_at: string;
    updated_at: string;
    group: Group;
}


