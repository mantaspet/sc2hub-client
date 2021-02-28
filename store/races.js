export const getters = {
  raceRegexes() {
    const races = ['[P]', '[T]', '[Z]', 'Protoss', 'Terran', 'Zerg'];

    const regexes = [];
    for (let i = 0; i < races.length; i++) {
      regexes.push(new RegExp(`\\b${races[i]}\\b`, 'gi'));
    }
    return regexes;
  },
};
