import { z } from "zod";
import { User } from "./user";
import { createGroupSchema } from "../schemas/create-group.schema";
import { groupSchema } from "../schemas/group.schema";

export type Group = z.infer<typeof groupSchema>;

export type CreateGroupFormData = z.infer<typeof createGroupSchema>;