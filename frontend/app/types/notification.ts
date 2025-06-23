import { notificationSchema } from "../schemas/notification.schema";
import { z } from "zod";

export type Notification = z.infer<typeof notificationSchema>;