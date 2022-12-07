export enum SortPropertyEnum {
  RATING = "rating",
  PRICE = "price",
  TITLE = "title"
}
export enum SortEnum {
  DESC = "desc",
  ASC = "asc"
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
  sort: SortEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}
