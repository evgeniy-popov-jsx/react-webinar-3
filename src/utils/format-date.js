function formatDate(inputDate) {
    // Создаем объект даты из входной строки
    const date = new Date(inputDate);
  
    // Массивы для форматирования месяцев и дней недели
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
  
    // Форматирование дня
    const day = date.getDate();
  
    // Форматирование месяца
    const month = months[date.getMonth()];
  
    // Форматирование года
    const year = date.getFullYear();
  
    // Форматирование времени
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${day} ${month} ${year} в ${hours}:${minutes}`;
  }
  
export default formatDate;
