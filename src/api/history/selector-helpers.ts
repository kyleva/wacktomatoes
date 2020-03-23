export const getShortDateString = (date: Date): string => {
  const shortDateString = date.toLocaleString('default', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return shortDateString;
};

export const getDateString = (date: Date): string => {
  const dayNumber = date.toLocaleString('default', { day: '2-digit' });
  const day = date.toLocaleString('default', { weekday: 'long' });
  const month = date.toLocaleString('default', { month: 'long' });

  const dateCompletedString = `${day}, ${month} ${dayNumber}`;

  return dateCompletedString;
};

export const addPomodorosToCollection = (pomodoros: any, collection: any) => {
  const collectionWithPomodoros = { ...collection };

  const sortedPomodoros = pomodoros
    .slice()
    .sort((a: any, b: any) => b.timeInitiated - a.timeInitiated);

  sortedPomodoros.forEach((pomodoro: any) => {
    const timeCompleted = new Date(pomodoro.timeCompleted);
    const timeStarted = new Date(pomodoro.timeInitiated);

    const timeCompletedString = timeCompleted
      .toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })
      .toLowerCase()
      .replace(' ', '');
    const timeStartedString = timeStarted
      .toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })
      .toLowerCase()
      .replace(' ', '');

    const newPomodoro = {
      ...pomodoro,
      timeCompletedString,
      timeStartedString,
    };

    const dayToAddTo = collectionWithPomodoros.days.find(
      (day: any) =>
        day.title === getDateString(new Date(newPomodoro.timeInitiated)),
    );

    dayToAddTo.items.push(newPomodoro);
  });

  collectionWithPomodoros.days.sort((a: any, b: any) => {
    const date1 = new Date(a.date).getTime();
    const date2 = new Date(b.date).getTime();

    return date2 - date1;
  });

  collectionWithPomodoros.days.sort((a: any, b: any) => {
    const date1 = new Date(a.date).getTime();
    const date2 = new Date(b.date).getTime();

    return date2 - date1;
  });

  return collectionWithPomodoros;
};
