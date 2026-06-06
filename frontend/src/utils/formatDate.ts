const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};

export function formatDate(value: string | null | undefined): string {
  if (!value) {
    return "Not set";
  }

  return new Date(value)
    .toLocaleDateString("en-GB", DATE_FORMAT)
    .replace(/\//g, " / ");
}
