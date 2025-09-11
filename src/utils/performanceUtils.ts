/* eslint-disable prefer-spread */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CalendarData, CalendarEvent } from "../types";

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
     // Virtualize events for large datasets
    virtualizeEvents: (events: CalendarEvent[], viewStart: Date, viewEnd: Date): CalendarEvent[] => {
      return events.filter(event => {
        return event.start >= viewStart && event.start <= viewEnd;
      });
    },

    // Debounce function for search/filter operations
    debounce: <T extends (...args: any[]) => void>(func: T, delay: number): T => {
      let timeoutId: NodeJS.Timeout;
      return ((...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
      }) as T;
    },

    // Memoize 
    memoize: <T extends (...args: any[]) => any>(fn: T): T => {
      const cache = new Map();
      return ((...args: any[]) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
          return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
      }) as T;
    },
  };
};
