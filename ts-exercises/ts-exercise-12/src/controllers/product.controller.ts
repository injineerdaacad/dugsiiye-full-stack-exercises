import type { Request, Response } from "express";
import type { ProductParams, UpdateProductBody, ProductQuery } from "../types/product.types.js";

export const getProducts = (req: Request<{}, {}, {}, ProductQuery>, res: Response) => {
  const { page = "1", limit = "10" } = req.query;

  return res.status(200).json({
    code: 200,
    message: `Page ${page} with ${limit} items`,
  });
};

export const updateProduct = (req: Request<ProductParams, {}, UpdateProductBody>, res: Response) => {
  const { id } = req.params;
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
        code: 400,
      message: "Name and price are required",
    });
  }

  return res.status(200).json({
    code: 200,
    message: `Product ${id} updated`,
    data: {id, name, price},
  });
};