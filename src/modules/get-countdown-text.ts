// Templates
const MINUTES_TEMPLATE = '<%minutes%> min';
const SECONDS_TEMPLATE = '<%seconds%> sec';
// Time constants
const ONE_MINUTE = 60 * 1000;
const THIRTY_SECONDS = ONE_MINUTE / 2;

export const getCountdownText = ({
  duration,
  startTime,
}: {
  duration: number;
  startTime: number;
}) => {
  const timeSinceInitiated = Date.now() - new Date(startTime).getTime();
  const timeRemaining = duration - timeSinceInitiated;

  console.log(timeRemaining);

  const { minutes, seconds } = getMinutesSecondsFromMilliseconds(timeRemaining);
  const countdownTextTemplate = getCountdownTextTemplate({
    minutes,
    seconds,
    timeRemaining,
  });

  return countdownTextTemplate
    .replace('<%minutes%>', minutes.toString())
    .replace('<%seconds%>', seconds.toString());
};

const getCountdownTextTemplate = ({
  timeRemaining,
}: {
  minutes: number;
  seconds: number;
  timeRemaining: number;
}) => {
  if (timeRemaining > THIRTY_SECONDS) {
    return MINUTES_TEMPLATE;
  }

  return SECONDS_TEMPLATE;
};

const getMinutesSecondsFromMilliseconds = (timeRemaining: number) => {
  const minutes = Math.ceil(timeRemaining / ONE_MINUTE);
  const seconds = Math.floor(
    (timeRemaining - (minutes - 1) * ONE_MINUTE) / 1000,
  );

  return {
    minutes,
    seconds,
  };
};

export default getCountdownText;
