import type { Request, Response } from "express";

interface GoodbyeRequest extends Request {
  query: {name?: string;};
}

export const sayGoodbye = (req: GoodbyeRequest, res: Response) => {
  const name = req.query.name;

  if (!name) {
    return res.status(400).json({
      code: 400,
      message: "name is required",
    });
  }

  return res.status(200).json({
    code: 200,
    farewell: `Goodbye, ${name}`,
  });
};