export interface UserData {
  [key: string]: number;
}

export interface CalendarData {
  [date: string]: UserData[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource?: {
    date: string;
    data: UserData[];
  };
}

export type FilterType = "all" | "with-data" | "without-data";

export interface CalendarState {
  data: CalendarData;
  events: CalendarEvent[];
 
  
  selectedDate: string | null;
  selectedData: UserData[] | null;
  isModalOpen: boolean;
  loading: boolean;
  error: string | null;
}

export interface RootState {
  calendar: CalendarState;
}
