import { RadStudyModel } from "../database/pg-model-rad-study";
import { HNMapModel } from "../database/pg-model-hn-map";

type InsertRadStudyProps = {
  si_hn: string;
  acc_no: number;
  modality: string | null;
  bodypart: string | null;
  study_date: Date | null;
  insert_date: Date | null;
  report_date: Date | null;
  report: string | null;
  p_status: string | null;
};

export async function insertRadStudy(
  props: InsertRadStudyProps,
): Promise<RadStudyModel | false> {
  const find = await findPatientIdOrInsert({ si_hn: props.si_hn });
  if (find.code === "ERROR") return false;

  const patient_id = find.result.patient_id;

  try {
    const insertRes = await RadStudyModel.create({
      patient_id: patient_id,
      acc_no: props.acc_no,
      modality: props.modality,
      bodypart: props.bodypart,
      study_date: props.study_date,
      insert_date: props.insert_date,
      report_date: props.report_date,
      report: props.report,
      p_status: props.p_status,
    });
    return insertRes;
  } catch (error) {
    console.error("insertRadStudy()", error.message || error);
    return false;
  }
}

// *******************************************************

type FindPatientIdOrInsert =
  | {
      code: "OK";
      result: HNMapModel;
      isCreated: boolean;
    }
  | { code: "ERROR"; message: string };

export async function findPatientIdOrInsert({
  si_hn,
}: {
  si_hn: string;
}): Promise<FindPatientIdOrInsert> {
  try {
    const [readRes, created] = await HNMapModel.findOrCreate({
      where: {
        siriraj_hn: si_hn,
      },
    });

    return { code: "OK", result: readRes, isCreated: created };
  } catch (error) {
    console.error("findPatientIdOrInsert()", error.message || error);
    return { code: "ERROR", message: error.message || error };
  }
}
