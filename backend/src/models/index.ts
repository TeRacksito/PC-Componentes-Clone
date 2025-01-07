import { Category } from "./categoryModel";
import { Product } from "./productModel";
import { ProductCategory } from "./productCategoriesModel";

Category.associate();
Product.associate();

export { Category, Product, ProductCategory };
