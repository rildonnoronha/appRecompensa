export function getWeekday1to5(date = new Date()): 1 | 2 | 3 | 4 | 5 {
  // JS: 0=Dom, 1=Seg, ..., 6=Sáb
  const js = date.getDay();
  const map: Record<number, 1 | 2 | 3 | 4 | 5> = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
  };
  // Weekend (0=Sun, 6=Sat) defaults to Monday
  return map[js] ?? 1;
}

export function formatWeekdayPT(day: 1 | 2 | 3 | 4 | 5): string {
  return ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"][day - 1];
}
