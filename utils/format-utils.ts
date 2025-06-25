export function formatFileNameAsTitle(fileName: string): string {
  const withoutExtension = fileName.replace(/\.[^/.]+$/, '');

  const withSpace = withoutExtension
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z])(A-Z)/, '$1  $2');

  return withSpace
    .split('')
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase(),
    )
    .join(' ')
    .trim();
}
