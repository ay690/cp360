import moment from "moment";

export const formatDateToDDMMYYYY = (date: Date): string => {
  return moment(date).format("DD-MM-YYYY");
};

export const parseDateFromDDMMYYYY = (dateString: string): Date | null => {
  try {
    const parsed = moment(dateString, "DD-MM-YYYY", true);
    return parsed.isValid() ? parsed.toDate() : null;
  } catch (error) {
    console.error("Error parsing date:", error);
    return null;
  }
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return moment(date1).isSame(moment(date2), "day");
};

export const getDateKey = (date: Date): string => {
  return formatDateToDDMMYYYY(date);
};
