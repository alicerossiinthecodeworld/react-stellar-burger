export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const options = { hour: '2-digit', minute: '2-digit' };
  const timeString = date.toLocaleTimeString('ru-RU', options);

  if (date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()) {
    return `Сегодня, ${timeString}  i-GMT+3`;
  }
  else {
    const dateOptions = { day: 'numeric', month: 'long' };
    const dateStringFormatted = date.toLocaleDateString('ru-RU', dateOptions);
    return `${dateStringFormatted}, ${timeString}  i-GMT+3`;
  }
}