
export const getDefaultAvatar = (name: string): string => {
  const colors: readonly string[] = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
  const initial = name.charAt(0).toUpperCase();
  const colorIndex = name.charCodeAt(0) % colors.length;
  const color = colors[colorIndex]!;

  const encodedColor = encodeURIComponent(color);
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='${encodedColor}'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='white'%3E${initial}%3C/text%3E%3C/svg%3E`;
};

