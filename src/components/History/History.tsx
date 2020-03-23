import React from 'react';

import { DailyHistory, Day } from 'src/api/history/selectors';
import { HistoryItem } from 'src/api/history/types';

const History = ({ history }: { history: DailyHistory }) => {
  const { days } = history;

  return <>{days.map(DaySection)}</>;
};

export const DaySection = ({ date, title, items }: Day) => (
  <div key={date}>
    <h4>
      {title}
      <br />
      {items.length} completed
    </h4>
    <ul>{items.map(PomodoroItem)}</ul>
  </div>
);

export const PomodoroItem = (pomodoro: HistoryItem) => (
  <li key={pomodoro.timeInitiated}>
    <span
      style={{ color: '#7d7d7d' }}
    >{`${pomodoro.timeStartedString} - ${pomodoro.timeCompletedString}`}</span>{' '}
    {pomodoro.description}
  </li>
);

export default History;
