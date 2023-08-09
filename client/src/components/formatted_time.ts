function formatTime(date: Date): string {
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  const formattedHour = hours > 12 ? hours - 12 : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
  const timeExtension = hours > 12 ? "PM" : "AM";

  return `${formattedHour}:${formattedMinutes} ${timeExtension}`;
}

export default formatTime;
