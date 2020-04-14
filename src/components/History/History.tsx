/** Third-party dependencies */
import React from 'react';

/** Our code */
import { Pomodoro, SortedPomodoros } from 'src/api/pomodoro/types';

const History = ({ pomodoros }: { pomodoros: SortedPomodoros }) => {
  const days = Object.keys(pomodoros);

  return days.map((dateString: any) => {
    const day = pomodoros[dateString];
    return (
      <DaySection
        key={dateString}
        items={day.items}
        title={day.title}
      ></DaySection>
    );
  });
};

export const DaySection = ({
  title,
  items,
}: {
  items: Pomodoro[];
  title: string;
}) => (
  <div>
    <h4>
      {title}
      <br />
      {items.length} completed
    </h4>
    <ul>{items.map(PomodoroItem)}</ul>
  </div>
);

export const PomodoroItem = (pomodoro: Pomodoro) => (
  <li key={pomodoro.startTime}>
    <span
      style={{ color: '#7d7d7d' }}
    >{`${pomodoro.startTimeString} - ${pomodoro.endTimeString}`}</span>{' '}
    {pomodoro.description}
  </li>
);

export default History;
