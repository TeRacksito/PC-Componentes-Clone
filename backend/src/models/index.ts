import { sequelize } from "../config/db";
import { ClientPassModel } from "./clients/clientPassModel";
import { ClientModel } from "./clients/clientModel";
import { CategoryModel } from "./categories/categoryModel";
import { ProductModel } from "./products/productModel";
import { ProductCategoryModel } from "./products/productCategoriesModel";
import { FlagModel } from "./products/flagsModel";
import { ProductFlagModel } from "./products/productFlagsModel";
import { ClientProductModel } from "./clients/clientProductModel";

CategoryModel.associate();
ProductModel.associate();
ProductCategoryModel.associate();
FlagModel.associate();
ProductFlagModel.associate();
ClientModel.associate();
ClientPassModel.associate();
ClientProductModel.associate();

sequelize.sync();

export {
  sequelize,
  CategoryModel,
  ProductModel,
  ProductCategoryModel,
  FlagModel,
  ProductFlagModel,
  ClientModel,
  ClientPassModel,
  ClientProductModel,
};
