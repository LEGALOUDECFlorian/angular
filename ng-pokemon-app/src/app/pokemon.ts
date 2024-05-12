export class Pokemon {
  id: number = 0; // Valeur par défaut pour id
  hp: number = 0; // Valeur par défaut pour hp
  cp: number = 0; // Valeur par défaut pour cp
  name: string = ''; // Valeur par défaut pour name
  picture: string = ''; // Valeur par défaut pour picture
  types: Array<string> = []; // Valeur par défaut pour types
  created: Date = new Date(); // Valeur par défaut pour created
}