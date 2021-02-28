export function getHumanizedNumber(number, labelSingular, labelPlural) {
  if (typeof number !== 'number') {
    return '';
  }
  let result = '';
  if (number > 1000000) {
    result = `${(number / 1000000).toFixed(1)}M`;
  } else if (number > 1000) {
    result = `${(number / 1000).toFixed(1)}K`;
  } else {
    result = number.toString();
  }

  if (number === 1 && labelSingular) {
    result += ` ${labelSingular}`;
  } else if (labelPlural) {
    result += ` ${labelPlural}`;
  }
  return result;
}

// duration argument has to be in seconds
export function getHumanizedDuration(duration) {
  let secondsRemaining = duration;
  let durationLabel = '';

  if (secondsRemaining > 3600) {
    durationLabel += `${Math.floor(secondsRemaining / 3600)}:`;
    secondsRemaining %= 3600;
  }

  if (secondsRemaining / 60 < 10 && duration > 3600) {
    durationLabel += '0';
  }
  durationLabel += `${Math.floor(secondsRemaining / 60)}:`;
  secondsRemaining %= 60;

  if (secondsRemaining < 10) {
    durationLabel += '0';
  }
  durationLabel += secondsRemaining;

  return durationLabel;
}
