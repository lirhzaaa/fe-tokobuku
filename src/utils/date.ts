import { DateValue } from "@heroui/react";
import { parseAbsoluteToLocal, parseDate } from "@internationalized/date";

const standardTime = (time: number) => {
  if (time < 10) {
    return `0${time}`;
  } else {
    return `${time}`;
  }
};

const toDateStandard = (date: DateValue) => {
  const year = date.year;
  const month = standardTime(date.month);
  const day = standardTime(date.day);

  const result = `${year}-${month}-${day}`;
  return result;
};

const toDateValue = (dateString?: string): DateValue | undefined => {
  if (!dateString) {
    return undefined;
  }

  try {
    const datePart = dateString.split(' ')[0];
    if (!datePart || datePart.length < 10) {
      console.warn('Invalid date format:', dateString);
      return undefined;
    }
    
    return parseDate(datePart);
  } catch (error) {
    console.error('Error parsing date:', error);
    return undefined;
  }
};

const toInputDate = (date: string) => {
  const formatDate = parseAbsoluteToLocal(`${date.replace(" ", "T")}+07:00`);
  return formatDate;
};

const converTime = (isoDate: string) => {
  const dateObject = new Date(isoDate);
  const date = dateObject.toLocaleString("id-ID", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  });
  return `${date} WIB`;
};

export { toDateStandard, toDateValue, toInputDate, converTime };