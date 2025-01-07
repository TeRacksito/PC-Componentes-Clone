import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { ProductCategory } from "./productCategoriesModel";
import { Product } from "./productModel";

// CREATE TABLE `categories` (
//   `id` varchar(255) NOT NULL,
//   `name` varchar(255) NOT NULL,
//   `parent_id` varchar(255) DEFAULT NULL,
//   PRIMARY KEY (`id`),
//   KEY `parent_id` (`parent_id`),
//   CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`)
// )

export class Category extends Model {
  declare id: string;
  declare name: string;
  declare parent_id: string;

  public static associate() {
    Category.belongsToMany(Product, {
      through: ProductCategory,
      foreignKey: "category_id",
      otherKey: "product_id",
    });

    Category.hasMany(Category, {
      foreignKey: "parent_id",
      as: "Children",
    });

    Category.belongsTo(Category, {
      as: "Parent",
      foreignKey: "parent_id",
    });
  }
}

Category.init(
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
  }
);
