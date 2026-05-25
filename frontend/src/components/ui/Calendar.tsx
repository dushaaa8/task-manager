import { useState } from "react";
import ArrowBtn from "./icons/ArrowBtnIcon";

interface Props {
  onDateSelect?: (date: Date) => void;
}

export default function Calendar({ onDateSelect }: Props) {
  const available =
    "text-[11px] font-medium text-secondary-gray rounded-sm text-center p-1 cursor-pointer hover:bg-gray-200";
  const disabled =
    "text-[11px] font-medium text-[#BFBFBF] text-center cursor-not-allowed p-1";

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const monthName = currentMonth.toLocaleString("en-US", { month: "long" });

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const prevMonthDays = Array.from(
    { length: firstDayOfMonth },
    (_, i) => daysInPrevMonth - firstDayOfMonth + i + 1,
  );
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const totalSlots = firstDayOfMonth + daysInMonth;
  const nextMonthDaysCount = (7 - (totalSlots % 7)) % 7;
  const nextMonthDays = Array.from(
    { length: nextMonthDaysCount },
    (_, i) => i + 1,
  );

  const handlePrevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  const handleDateClick = (day: number) => {
    const newSelectedDate = new Date(year, month, day);
    setSelectedDate(newSelectedDate);

    // Передаем дату родительскому компоненту (чтобы отфильтровать таски)
    if (onDateSelect) {
      onDateSelect(newSelectedDate);
    }
  };

  return (
    <div className="w-56 h-60 bg-main-background-gray rounded-xl p-4 flex flex-col">
      <div className="flex justify-between items-center mb-6 px-2">
        <button onClick={handlePrevMonth} className="cursor-pointer">
          <ArrowBtn />
        </button>

        <span className="font-bold text-primary-blue text-xs">{monthName}</span>

        <button onClick={handleNextMonth} className="rotate-180 cursor-pointer">
          <ArrowBtn />
        </button>
      </div>
      <div className="grid grid-cols-7 grid-y-2">
        {weekdays.map((day) => (
          <div
            className="text-[11px] font-medium text-secondary-gray text-center p-1"
            key={day}
          >
            {day}
          </div>
        ))}
        {prevMonthDays.map((prevMonthDay, index) => (
          <div key={"prevMonthDay" + index} className={disabled}>
            {prevMonthDay}
          </div>
        ))}
        {days.map((day) => {
          const isSelected =
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === month &&
            selectedDate.getFullYear() === year;

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`
                  ${available}
                  ${isSelected && "bg-primary-blue text-white hover:bg-primary-blue"}
                `}
            >
              {day}
            </button>
          );
        })}
        {nextMonthDays.map((nextMonthDay, index) => (
          <div key={"nextMonthDay" + index} className={disabled}>
            {nextMonthDay}
          </div>
        ))}
      </div>
    </div>
  );
}
