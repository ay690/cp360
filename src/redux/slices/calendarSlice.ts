import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { mockCalendarData } from '../../data/mockData';
import { parseDateFromDDMMYYYY, getDateKey } from '../../utils/dateUtils';
import { type CalendarState, type CalendarData, type CalendarEvent, type UserData } from '../../types';

const createEventsFromData = (data: CalendarData): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  
  Object.entries(data).forEach(([dateString, userData]) => {
    const date = parseDateFromDDMMYYYY(dateString);
    if (date) {
      events.push({
        id: `event-${dateString}`,
        title: `${userData.length} entries`,
        start: date,
        end: date,
        resource: {
          date: dateString,
          data: userData,
        },
      });
    }
  });
  
  return events;
};




const initialState: CalendarState = {
  data: mockCalendarData,
  events: createEventsFromData(mockCalendarData),
  selectedDate: null,
  selectedData: null,
  isModalOpen: false,
  loading: false,
  error: null,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    selectDate: (state, action: PayloadAction<{ date: Date; data?: UserData[] }>) => {
      const { date, data } = action.payload;
      const dateKey = getDateKey(date);
      
      state.selectedDate = dateKey;
      state.selectedData = data || state.data[dateKey] || null;
      state.isModalOpen = true;
      state.error = null;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.selectedDate = null;
      state.selectedData = null;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { selectDate, closeModal, setError, clearError, setLoading } = calendarSlice.actions;
export default calendarSlice.reducer;

