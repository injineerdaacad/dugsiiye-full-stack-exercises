// Convert a string to Title Case
export const toTitleCase = (str) => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};


// Format a date and time
export const strftime = (date = new Date(), format = "%Y-%m-%d %I:%M:%S %p") => {
  const pad = (num) => String(num).padStart(2, "0");

  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;
  const ampm = hours24 >= 12 ? "PM" : "AM";

  const tokens = {
    "%Y": date.getFullYear(),
    "%m": pad(date.getMonth() + 1),
    "%d": pad(date.getDate()),
    "%H": pad(hours24),
    "%I": pad(hours12),
    "%M": pad(date.getMinutes()),
    "%S": pad(date.getSeconds()),
    "%p": ampm,
  };

  return format.replace(/%[YmdHIMSp]/g, (match) => tokens[match] || match);
};
