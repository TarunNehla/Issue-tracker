import { string, z } from "zod";

export const IssueSchema = z.object({
  title: string().min(1, "Title is required").max(255),
  description: string().min(1, "Description is required"),
});

export const PatchIssueSchema = z.object({
  title: string().min(1, "Title is required").max(255).optional(),
  description: string().min(1, "Description is required").max(65535).optional(),
  assignedToUserId: string()
    .min(1, "AssignedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
});
