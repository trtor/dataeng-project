import { Op } from "sequelize";
import { RadStudyModel } from "../database/pg-model-rad-study";

const year_ms: number = 1000 * 60 * 60 * 24 * 365.25;

type SelectRadStudyRes =
  | {
      code: "OK";
      payload: RadStudyModel[];
    }
  | { code: "ERROR"; message: string };

export async function selectRadStudy({
  year,
}: {
  year: string;
}): Promise<SelectRadStudyRes> {
  const regDate = /^\d{4}$/;
  if (!regDate.test(year))
    return { code: "ERROR", message: "Invalid date format" };

  const dateISO8601 = year + "-01-01T00:00:00+07:00";
  const dateBegin = new Date(dateISO8601);
  const dateEnd = new Date(dateBegin.getTime() + year_ms * 1);

  try {
    const res = await RadStudyModel.findAll({
      where: {
        insert_date: {
          [Op.between]: [dateBegin, dateEnd],
        },
      },
    });
    return { code: "OK", payload: res };
  } catch (error) {
    return { code: "ERROR", message: "Query error" };
  }
}
