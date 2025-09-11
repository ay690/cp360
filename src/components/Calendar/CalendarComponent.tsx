import React, { useMemo, useState } from "react";
import {
  Calendar,
  momentLocalizer,
  type View,
  type SlotInfo,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectDate, setFilter } from "../../redux/slices/calendarSlice";
import { type CalendarEvent } from "../../types";
import { getDateKey } from "../../utils/dateUtils";
import CalendarFilters, { type FilterType } from "./CalendarFilters";

const localizer = momentLocalizer(moment);

const CalendarComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, filteredEvents, data, activeFilter } = useAppSelector(
    (state) => state.calendar
  );
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>("month");
  const handleNavigate = (date: Date, view?: View) => {
    setCurrentDate(date);
    if (view) setCurrentView(view);
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };

  const filterStats = useMemo(() => {
    const totalDates = events.length;
    const datesWithData = events.filter(
      (event) => event.resource && event.resource.data.length > 0
    ).length;
    const datesWithoutData = totalDates - datesWithData;

    return { totalDates, datesWithData, datesWithoutData };
  }, [events]);

  const handleSelectEvent = (event: CalendarEvent) => {
    if (event.resource) {
      dispatch(
        selectDate({
          date: event.start,
          data: event.resource.data,
        })
      );
    }
  };

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    const dateKey = getDateKey(slotInfo.start);
    const dayData = data[dateKey];

    dispatch(
      selectDate({
        date: slotInfo.start,
        data: dayData,
      })
    );
  };

  const handleFilterChange = (filter: FilterType) => {
    dispatch(setFilter(filter));
  };

  const eventStyleGetter = (event: CalendarEvent) => {
    const hasData = event.resource && event.resource.data.length > 0;

    return {
      style: {
        backgroundColor: hasData ? "#3B82F6" : "#94A3B8",
        borderRadius: "6px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
        fontSize: "12px",
        fontWeight: "500",
        padding: "2px 6px",
      },
    };
  };

  const dayPropGetter = (date: Date) => {
    const dateKey = getDateKey(date);
    const hasData = data[dateKey] && data[dateKey].length > 0;

    return {
      className: hasData
        ? "bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors duration-200"
        : "hover:bg-gray-50 transition-colors duration-200",
    };
  };

  const customComponents = useMemo(
    () => ({
      event: ({ event }: { event: CalendarEvent }) => (
        <div className="flex items-center justify-center h-full">
          <span className="text-xs font-medium truncate">
            📊 {event.resource?.data.length || 0} entries
          </span>
        </div>
      ),
    }),
    []
  );

  return (
    <div className="space-y-6">
      <CalendarFilters
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        totalDates={filterStats.totalDates}
        datesWithData={filterStats.datesWithData}
        datesWithoutData={filterStats.datesWithoutData}
      />

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Data Calendar
          </h2>
          <p className="text-gray-600">
            Click on any date to view data visualization • Showing{" "}
            {filteredEvents.length} of {events.length} dates
          </p>
        </div>

        <div className="calendar-container" style={{ height: "600px" }}>
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable={true}
            eventPropGetter={eventStyleGetter}
            dayPropGetter={dayPropGetter}
            date={currentDate}
            view={currentView}
            onNavigate={handleNavigate}
            onView={handleViewChange}
            components={customComponents}
            views={["month", "week", "day"] as View[]}
            defaultView="month"
            popup
            className="custom-calendar"
            formats={{
              dateFormat: "DD",
              dayFormat: "ddd DD/MM",
              monthHeaderFormat: "MMMM YYYY",
            }}
          />
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-gray-700">Dates with data</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span className="text-gray-700">Dates without data</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
