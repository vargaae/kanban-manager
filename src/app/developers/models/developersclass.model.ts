import { Ingredient } from "src/app/shared/models/ingredient.model";

export class Developers {
  public name: string;
  // public category: string;
  public phone: string;
  public email: string;
  public description: string;
  public preparation: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  // public ingredients: Ingredient={} as Ingredient;
  public lastUpdate: string;

    constructor(name: string, phone: string, eml: string, desc: string, prep: string, imagePath: string, ingredients: Ingredient[], lastUpdate: string) {
    this.name = name;
    // this.category = category;
    this.phone = phone;
    this.email = eml;
    this.description = desc;
    this.preparation = prep;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.lastUpdate = lastUpdate;
  }
}
