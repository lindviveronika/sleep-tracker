export default function hasValidDateOrders(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (startDate >= endDate) {
    return false;
  }

  return true;
}
