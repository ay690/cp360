import { type CalendarData } from "../types";

export const createLazyDataLoader = (data: CalendarData) => {
  return {
    // Loading data in chunks
    loadDataChunk: (startDate: Date, endDate: Date): CalendarData => {
      const chunk: CalendarData = {};

      Object.entries(data).forEach(([dateKey, userData]) => {
        const date = new Date(dateKey.split("-").reverse().join("-"));
        if (date >= startDate && date <= endDate) {
          chunk[dateKey] = userData;
        }
      });

      return chunk;
    },
  };
};
