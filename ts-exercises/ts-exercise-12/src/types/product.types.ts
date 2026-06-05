export interface ProductQuery {
  page?: string;
  limit?: string;
}

export interface ProductParams {
  id: string;
}

export interface UpdateProductBody {
  name: string;
  price: number;
}