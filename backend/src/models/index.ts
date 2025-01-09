import { CategoryModel } from "./categoryModel";
import { ProductModel } from "./productModel";
import { ProductCategoryModel } from "./productCategoriesModel";
import { FlagModel } from "./flagsModel";
import { ProductFlagModel } from "./productFlagsModel";

CategoryModel.associate();
ProductModel.associate();
ProductCategoryModel.associate();
FlagModel.associate();
ProductFlagModel.associate();

export {
  CategoryModel,
  ProductModel,
  ProductCategoryModel,
  FlagModel,
  ProductFlagModel,
};
