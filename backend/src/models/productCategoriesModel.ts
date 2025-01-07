import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { Product } from "./productModel";
import { Category } from "./categoryModel";

// CREATE TABLE `products_categories` (
//   `product_id` varchar(255) NOT NULL,
//   `category_id` varchar(255) NOT NULL,
//   KEY `product_id` (`product_id`),
//   KEY `category_id` (`category_id`),
//   CONSTRAINT `products_categories_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
//   CONSTRAINT `products_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
// )

export class ProductCategory extends Model {
  declare product_id: string;
  declare category_id: string;
}

ProductCategory.init(
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
  }
);
