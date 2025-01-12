import { DataTypes, Model } from "sequelize";
import { Category } from "@pcc/shared";
import { ProductModel } from "../products/productModel";
import { ProductCategoryModel } from "../products/productCategoriesModel";
import { sequelize } from "../../config/db";

// CREATE TABLE `categories` (
//   `id` varchar(255) NOT NULL,
//   `name` varchar(255) NOT NULL,
//   `parent_id` varchar(255) DEFAULT NULL,
//   PRIMARY KEY (`id`),
//   KEY `parent_id` (`parent_id`),
//   FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`)
// )

export class CategoryModel extends Model implements Category {
  declare id: string;
  declare name: string;
  declare parent_id: string;

  public static associate() {
    CategoryModel.belongsToMany(ProductModel, {
      through: ProductCategoryModel,
      foreignKey: "category_id",
      otherKey: "product_id",
    });

    CategoryModel.hasMany(ProductCategoryModel, {
      foreignKey: "category_id",
    });

    CategoryModel.hasMany(CategoryModel, {
      foreignKey: "parent_id",
      as: "Children",
    });

    CategoryModel.belongsTo(CategoryModel, {
      as: "Parent",
      foreignKey: "parent_id",
    });
  }
}

CategoryModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parent_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "categories",
    timestamps: false,
  },
);
