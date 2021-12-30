import { Ingredient } from "src/app/shared/models/ingredient.model";

export class Developer {
  key?: string;
  $key?: string;
  id?: string;
  name?: string;
  category?: string;
  imagePath?: string;
  phone?: string;
  email?: string;
  description?: string;
  preparation?: string;
  lastUpdate?: string;
  // lastUpdate?: Date;
  ingredients?: Ingredient[];
}
