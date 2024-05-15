export interface MyObject {
  id: any;
  numApr: string;
  otherData: string;
}
export interface MyObject2 {
  other: any;
  numApr: string;
  otherData: string;
}

const array1: any[] = [
  { id: '1', numApr: '123A', otherData: '...' },
  { id: '2', numApr: '456B', otherData: '...' },
  { id: '3', numApr: '789C', otherData: '...' },
  { id: '4', numApr: '012D', otherData: '...' },
];

const array2: any[] = [
  { other: '1', numApr: '123A', otherData: '...' },
  { other: '3', numApr: '789C', otherData: '...' },
  { other: '4', numApr: '456B', otherData: '...' },
  { other: '2', numApr: '456B', otherData: '...' },
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                  /*           trie par le numApr du premier tableau                     */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Fonction de comparaison personnalisée
// function compare(a: MyObject2, b: MyObject2): number {
//   const indexA = array1.findIndex(obj => obj.numApr === a.numApr);
//   const indexB = array1.findIndex(obj => obj.numApr === b.numApr);

  // Compare les indices des objets correspondants dans le premier tableau
//   if (indexA < indexB) {
//     return -1;
//   }
//   if (indexA > indexB) {
//     return 1;
//   }
//   return 0;
// }

// Trie le deuxième tableau en utilisant la fonction de comparaison personnalisée
// array2.sort(compare);

// console.log(array2);
// Résultat : [ { other: 1, numApr: '123A', otherData: '...' },
//              { other: 4, numApr: '456B', otherData: '...' },
//              { other: 2, numApr: '456B', otherData: '...' },
//              { other: 3, numApr: '789C', otherData: '...' } ]

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                  /*           trie par le numéro du premier tableau                     */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Fonction de comparaison personnalisée
function compare(a: any, b: any): any {
  const indexA = array1.findIndex(obj => obj.id === a.other);
  const indexB = array1.findIndex(obj => obj.id === b.other);

  // Compare les indices des objets correspondants dans le premier tableau
  if (indexA < indexB) {
    return -1;
  }
  if (indexA > indexB) {
    return 1;
  }
  return 0;
}

// Trie le deuxième tableau en utilisant la fonction de comparaison personnalisée
array2.sort(compare);

console.log(array2, array1);
// Résultat : [ { other: 1, numApr: '123A', otherData: '...' },
//              { other: 2, numApr: '456B', otherData: '...' },
//              { other: 4, numApr: '456B', otherData: '...' },
//              { other: 3, numApr: '789C', otherData: '...' } ]
  let truc: any[] =[];
  truc[0] = array1 ;
  truc[1] = array2

  console.log(truc);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                            /*           autre solution                     */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Crée un tableau de références aux éléments de array1 dans l'ordre souhaité
// const array1Order = array1.map((item, index) => ({ index, item }));
// array1Order.sort((a, b) => a.item.id - b.item.id);

// Trie array2 en fonction de l'ordre des éléments correspondants dans array1
// const array2Ordered = array2.sort((a, b) => {
//   const indexA = array1Order.findIndex(item => item.item.numApr === a.numApr);
//   const indexB = array1Order.findIndex(item => item.item.numApr === b.numApr);
//   return indexA - indexB;
// });

// console.log(array2Ordered);
// Résultat : [ { other: 1, numApr: '123A', otherData: '...' },
//              { other: 2, numApr: '456B', otherData: '...' },
//              { other: 4, numApr: '456B', otherData: '...' },
//              { other: 3, numApr: '789C', otherData: '...' } ]