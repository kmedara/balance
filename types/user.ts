import type { IResourcable } from "./resourcable";

export type User = {
  firstName: string;
  lastName: string;
  email: string /**unique index */;
  features: string[];
  phone?: string;
  status: "active" | "disabled";
} & IResourcable;
