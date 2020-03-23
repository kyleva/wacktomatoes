import React from 'react';

const History = ({ history }: { history: any }) => {
  const { days } = history;

  return (
    <>
      {days.map((day: any) => {
        return (
          <div key={day.date}>
            <h4>
              {day.title}
              <br />
              {day.items.length} completed
            </h4>
            <ul>
              {day.items.map((pomodoro: any) => {
                return (
                  <li key={pomodoro.timeInitiated}>
                    <span
                      style={{ color: '#7d7d7d' }}
                    >{`${pomodoro.timeStartedString} - ${pomodoro.timeCompletedString}`}</span>{' '}
                    {pomodoro.description}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default History;
