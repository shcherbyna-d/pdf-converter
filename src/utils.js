function formatCurrentDateTime() {
  const currentDate = new Date();

  // Get date parts
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Get time parts
  let hours = currentDate.getHours();
  const amPM = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  // Concatenate date and time with underscore
  const formattedDateTime = `${year}-${month}-${day}_${hours}:${minutes}_${amPM}`;

  return formattedDateTime;
}

export function getFormatedFileName() {
  return `Converted_${formatCurrentDateTime()}`;
}

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i]
  );
}
