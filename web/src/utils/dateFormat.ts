const options = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric',
  hour12: false,
  timeZone: "America/Sao_paulo"
};

const secondOptions = {
  year: 'numeric', month: 'numeric', day: 'numeric',
}

export function dateFormat(date: Date): string {
  const dateFormatLocal = new Intl.DateTimeFormat('pt-br', options as any).format(date)
  return dateFormatLocal
}

export function fullDate(date: Date): string {
  const dateFormatLocal = new Intl.DateTimeFormat('pt-br', secondOptions as any).format(date)
  return dateFormatLocal
}
