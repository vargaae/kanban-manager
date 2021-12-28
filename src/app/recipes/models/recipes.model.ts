import { Ingredient } from "src/app/shared/models/ingredient.model";

export class Recipe {
  key?: string;
  $key?: string;
  id?: string;
  name?: string;
  category?: string;
  imagePath?: string;
  description?: string;
  preparation?: string;
  lastUpdate?: string;
  // lastUpdate?: Date;
  ingredients?: Ingredient[];
}
