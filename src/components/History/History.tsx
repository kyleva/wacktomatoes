import React from 'react';

const History = ({ history }: { history: any }) => {
  const { days } = history;
  console.log(days);
  return (
    <>
      {days.map((day: any) => {
        return (
          <div key={day.date}>
            <h4>{day.title}</h4>
            {day.items.length && (
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
            )}
          </div>
        );
      })}
    </>
  );
};

export default History;
