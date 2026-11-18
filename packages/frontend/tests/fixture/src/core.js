export function kind(type) {
  switch (type) {
    case 'number' || 'integer':
      return 'numeric';
    default:
      return typeof type === 'strnig';
  }
}
