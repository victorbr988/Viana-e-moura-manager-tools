// program to convert first letter of a string to uppercase
export function capitalizeFirstLetter(word: string) {

  // converting first letter to uppercase
  const capitalized = word.charAt(0).toUpperCase() + word.slice(1);

  return capitalized;
}
