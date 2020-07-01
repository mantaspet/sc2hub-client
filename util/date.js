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
