export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatDateTime(dateString?: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  const time = timeFormatter.format(date);
  
  if (dateOnly.getTime() === today.getTime()) {
    return time;
  } else if (dateOnly.getTime() === yesterday.getTime()) {
    return `Yesterday ${time}`;
  } else {
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: dateOnly.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
    return `${dateFormatter.format(date)} ${time}`;
  }
}
