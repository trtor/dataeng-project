import { Request, Response } from "express";
import { RadStudyModel } from "../database/pg-model-rad-study";
import { trimStringGeneric } from "../utils/fn-trim";
import { selectRadStudy } from "./query-read";

type ReadAPIRes =
  | {
      status: 200;
      payload: RadStudyModel[];
    }
  | { status: 404 }
  | { status: 400 | 401 | 500; message: string };

// GET  /api-read/:year
export async function readAPI(
  req: Request<{ year?: string }>,
  res: Response<ReadAPIRes>,
): Promise<Response> {
  const { year } = req.params;

  const regDate = /^\d{4}$/;
  if (!year || !regDate.test(year))
    return res
      .status(400)
      .json({ status: 400, message: "Invalid year format (YYYY)" });

  const readDB = await selectRadStudy({ year });

  if (readDB.code === "ERROR")
    return res
      .status(500)
      .json({ status: 500, message: "Error: query database" });

  return res.status(200).json({
    status: 200,
    payload: trimStringGeneric<RadStudyModel>(readDB.payload),
  });
}
