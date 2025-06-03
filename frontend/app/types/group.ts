import { z } from "zod";
import { User } from "./user.interface";
import { createGroupSchema } from "../schemas/create-group.schema";

export interface Group {
    id: number;
    name: string;
    description: string;
    owner_id: number;
    invites: User[];
    created_at: string;
}

export type CreateGroupFormData = z.infer<typeof createGroupSchema>;