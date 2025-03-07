export function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Mês começa do 0
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export const formatISOToInputDate = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    return date.toISOString().split("T")[0];
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

export function formatPhone(phone: string) {
  return phone.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, "($1) $2 $3-$4");
}

export const removeMask = (value: string): string => {
  return value.replace(/\D/g, "");
};
