export function getHumanizedNumber(number, label) {
  if (typeof number !== 'number') {
    return '';
  }
  if (number > 1000000) {
    return `${(number / 1000000).toFixed(1)}M ${label}`;
  } else if (number > 1000) {
    return `${(number / 1000).toFixed(1)}K ${label}`;
  } else {
    return `${number.toString()} ${label}`;
  }
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
