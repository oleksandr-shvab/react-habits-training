export function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export function getStreak(completedDates: string[]): number {
  let streak = 0;
  const today = new Date();

  for (let i = 0; ; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    if (completedDates.includes(dateStr)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
