export const getters = {
  matchupRegexes() {
    const matchups = [
      'PvP',
      'PvT',
      'PvZ',
      'TvP',
      'TvT',
      'TvZ',
      'ZvP',
      'ZvT',
      'ZvZ',
    ];

    const regexes = [];
    for (let i = 0; i < matchups.length; i++) {
      regexes.push(new RegExp(`\\b${matchups[i]}\\b`, 'gi'));
    }
    return regexes;
  },
};
