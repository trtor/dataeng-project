import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { HNMapModel } from "./pg-model-hn-map";
import { pgSeq } from "./postgres-con";

interface RadStudyAttribute {
  report_id: number;
  patient_id: number;
  acc_no: number;
  modality: string | null;
  bodypart: string | null;
  study_date: Date | null;
  insert_date: Date | null;
  report_date: Date | null;
  report: string | null;
  lvef: number | null;
  p_status: string | null;
  create_at: Date;
  update_at: Date;
}

interface RadStudyCreationAttributes
  extends Optional<
    RadStudyAttribute,
    "report_id" | "create_at" | "update_at"
  > {}

export class RadStudyModel
  extends Model<RadStudyAttribute, RadStudyCreationAttributes>
  implements RadStudyAttribute
{
  public report_id!: number;
  public patient_id!: number;
  public acc_no!: number;
  public modality!: string | null;
  public bodypart!: string | null;
  public study_date!: Date | null;
  public insert_date!: Date | null;
  public report_date!: Date | null;
  public report!: string | null;
  public lvef!: number | null;
  public p_status!: string | null;
  public readonly create_at!: Date;
  public readonly update_at!: Date;

  public getPatient!: Sequelize.BelongsToGetAssociationMixin<HNMapModel>;
  public createPatient!: Sequelize.BelongsToCreateAssociationMixin<HNMapModel>;
  public setPatient!: Sequelize.BelongsToSetAssociationMixin<
    HNMapModel,
    number
  >;

  // public readonly hnmap?: HNMapModel[];

  // public static associations: {
  //   hnmap: Association<RadStudyModel, HNMapModel>;
  // };
}

RadStudyModel.init(
  {
    report_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    acc_no: { type: DataTypes.INTEGER, unique: true },
    patient_id: { type: DataTypes.INTEGER, allowNull: false, unique: false },
    modality: { type: DataTypes.STRING(255), allowNull: true },
    bodypart: { type: DataTypes.STRING(255), allowNull: true },
    study_date: { type: DataTypes.DATE, allowNull: true },
    insert_date: { type: DataTypes.DATE, allowNull: true },
    report_date: { type: DataTypes.DATE, allowNull: true },
    report: { type: DataTypes.TEXT, allowNull: true },
    lvef: { type: DataTypes.SMALLINT, allowNull: true },
    p_status: { type: DataTypes.STRING(20), allowNull: true },
    create_at: { type: DataTypes.DATE },
    update_at: { type: DataTypes.DATE },
  },
  {
    sequelize: pgSeq,
    tableName: "rad_study",
    charset: "utf8",
    timestamps: true,
    createdAt: "create_at",
    updatedAt: "update_at",
    schema: process.env.POSTGRES_SCHEMA,
    indexes: [
      { unique: true, fields: ["patient_id"] },
      { unique: true, fields: ["acc_no"] },
      { unique: false, fields: ["modality"] },
      { unique: false, fields: ["bodypart"] },
      { unique: false, fields: ["modality", "bodypart"] },
      { unique: false, fields: ["insert_date"] },
      { unique: false, fields: ["create_at"] },
    ],
  },
);
