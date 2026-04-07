export const toSlug = (str: string, separator = '-'): string => {
  const escaped = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  return (
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, separator)
      .replace(new RegExp(`^${escaped}+|${escaped}+$`, 'g'), '') || 'n-a'
  );
};

export const fromSlug = (slug: string, separator = '-'): string => {
  return slug
    .split(separator)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getRandomString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
