// تحويل التاريج و الوقت ل فترة عدت

export const timeAgo = (dateString) => {
  if (!dateString) return "time ago";

  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return interval === 1 ? "1 year ago" : `${interval} years ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return interval === 1 ? "1 month ago" : `${interval} months ago`;

  interval = Math.floor(seconds / 604800);
  if (interval >= 1) return interval === 1 ? "1 week ago" : `${interval} weeks ago`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return interval === 1 ? "1 day ago" : `${interval} days ago`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return interval === 1 ? "1 hour ago" : `${interval} hours ago`;

  return "seconds ago";
};