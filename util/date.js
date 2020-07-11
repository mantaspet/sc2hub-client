export function getHumanizedDate(date, now) {
  if (!date) {
    return '';
  }
  const d = new Date(date);
  const timeDiff = Math.round((now.getTime() - d.getTime()) / 1000);
  if (timeDiff === 1) {
    return '1 second ago';
  }
  if (timeDiff < 60) {
    return timeDiff + ' seconds ago';
  }
  if (timeDiff >= 60 && timeDiff < 120) {
    return '1 minute ago';
  }
  if (timeDiff < 3600) {
    return (timeDiff / 60).toFixed(0) + ' minutes ago';
  }
  if (timeDiff >= 3600 && timeDiff < 7200) {
    return '1 hour ago';
  }
  if (timeDiff < 86400) {
    return (timeDiff / 3600).toFixed(0) + ' hours ago';
  }
  if (timeDiff >= 86400 && timeDiff < 172800) {
    return 'yesterday';
  }
  if (timeDiff < 2592000) {
    return (timeDiff / 86400).toFixed(0) + ' days ago';
  }
  if (timeDiff >= 2592000 && timeDiff < 5184000) {
    return 'last month';
  }
  if (timeDiff < 31104000) {
    return (timeDiff / 2592000).toFixed(0) + ' months ago';
  }
  if (timeDiff >= 31104000 && timeDiff < 62208000) {
    return 'last year';
  }
  return (timeDiff / 31104000).toFixed(0) + ' years ago';
}

export function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const monthNumber = d.getMonth() + 1;
  const dayNumber = d.getDate();
  const month = monthNumber < 10 ? `0${monthNumber}` : monthNumber;
  const day = dayNumber < 10 ? `0${dayNumber}` : dayNumber;
  return `${year}-${month}-${day}`;
}

export function dateRange(from, to) {
  if (!from || !to || to <= from) {
    return [];
  }
  const _from = new Date(from);
  const _to = new Date(to);
  const dates = [];
  // eslint-disable-next-line no-unmodified-loop-condition
  for (let d = _from; d < _to; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }
  return dates;
}

export function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

export function endOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  let diff = d.getDate();
  if (day !== 6) {
    diff += 7 - day;
  }
  return new Date(d.setDate(diff));
}

export function startOfMonth(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth();
  return new Date(year, month, 1);
}

export function endOfMonth(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth();
  return new Date(year, month + 1, 0);
}

export function addMonths(date, count) {
  return new Date(date.setMonth(date.getMonth() + count));
}
