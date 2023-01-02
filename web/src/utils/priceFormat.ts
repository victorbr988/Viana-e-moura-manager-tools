export function toBRLCurrency(price: number): string {
  const optionsPrice = { style: 'currency', currency: "BRL" }

  return price.toLocaleString('pt-br', optionsPrice)
}