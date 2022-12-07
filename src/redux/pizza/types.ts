import { Sort } from "../filter/types";

export type sarchPizzaParams = {
  search: string;
  categoryId: number;
  currentPage: string;
  sortBy: Sort;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error"
}

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
