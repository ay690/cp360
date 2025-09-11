import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './slices/calendarSlice';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['calendar/selectDate'],
        ignoredPaths: ['calendar.events', 'calendar.filteredEvents'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;