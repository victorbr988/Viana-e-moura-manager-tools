const options = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: false,
  timeZone: "America/Sao_paulo"
};

export function dateFormat(date: Date): string {
  const dateFormatLocal = new Intl.DateTimeFormat('pt-br', options as any).format(date)
  return dateFormatLocal
}
