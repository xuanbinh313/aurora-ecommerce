import { z } from "zod";
import { StatusEnum, VisibilityEnum } from "./schemas";

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type CategoryFormState =
  | {
      errors?: {
        name?: string[];
        parent_id?: string[];
      };
      message?: string;
    }
  | undefined;

export type Category = {
  id: number;
  name: string;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
};

export interface Product {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  regular_price: string;
  sale_price: string;
  brand: string;
  categories: Category[];
  created_at: string;
  updated_at: string;
  sale_price_dates?: {
    from: string;
    to: string;
  };
  isSetSalePriceDates: boolean;
  status: z.infer<typeof StatusEnum>;
  visibility: z.infer<typeof VisibilityEnum>;
}

export interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}
