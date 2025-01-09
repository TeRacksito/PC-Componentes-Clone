import { Category } from './category.types';
import { ProductWithFlags } from './flag.types';

export type LandPageContent = {
  featuredProductsWithFlags: ProductWithFlags;
  featuredCategories: Category[];
}