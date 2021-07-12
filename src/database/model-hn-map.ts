import { DataTypes, Model, Optional } from "sequelize";
import { RadStudyModel } from "./model-rad-study";
import { pgSeq } from "./postgres-con";

interface HNMapAttributes {
  patient_id: number;
  siriraj_hn: string;
  create_at: Date;
  update_at: Date;
}

interface HNMapCreationAttributes
  extends Optional<HNMapAttributes, "patient_id"> {}

export class HNMapModel
  extends Model<HNMapAttributes, HNMapCreationAttributes>
  implements HNMapAttributes
{
  public patient_id!: number;
  public siriraj_hn!: string;
  public create_at!: Date;
  public update_at!: Date;
}

HNMapModel.init(
  {
    patient_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    siriraj_hn: {
      type: DataTypes.STRING(10),
      unique: true,
    },
    create_at: { type: DataTypes.DATE },
    update_at: { type: DataTypes.DATE },
  },
  {
    sequelize: pgSeq,
    tableName: "hn_map",
    charset: "utf8",
    timestamps: true,
    createdAt: "create_at",
    updatedAt: "update_at",
    schema: process.env.POSTGRES_SCHEMA,
    indexes: [{ unique: true, fields: ["siriraj_hn"] }],
  },
);

// setTimeout(() => {
// HNMapModel.hasMany(RadStudyModel, {
//   foreignKey: "patient_id",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });
// }, 100);
