import { Model, DataTypes } from "sequelize";
import { ProductModel } from "./productModel";
import { CategoryModel } from "../categories/categoryModel";
import { sequelize } from "../../config/db";

// CREATE TABLE `products_categories` (
//   `product_id` varchar(255) NOT NULL,
//   `category_id` varchar(255) NOT NULL,
//   KEY `product_id` (`product_id`),
//   KEY `category_id` (`category_id`),
//   FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
//   FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
// )

export class ProductCategoryModel extends Model {
  declare product_id: string;
  declare category_id: string;

  public static associate() {
    ProductCategoryModel.belongsTo(ProductModel, {
      foreignKey: "product_id",
    });

    ProductCategoryModel.belongsTo(CategoryModel, {
      foreignKey: "category_id",
    });
  }
}

ProductCategoryModel.init(
  {
    product_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "products_categories",
    timestamps: false,
  },
);
