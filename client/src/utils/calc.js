
const moodSummaries = [
  'Very Negative',
  'Negative',
  'Meh',
  'Positive',
  'Very Positive'
];

export default {
  moods: {
    average: function (moods = []) {
      if (!moods || moods.length === 0) return -1;
      const sumVals = moods.reduce((acc, mood) => acc + mood.val, 0);
      const validMoods = moods.reduce((acc, mood) => acc + (mood.set? 1:0), 0);
      return sumVals / validMoods;
    },

    averageRound: function (moods) {
      return Math.round(this.average(moods));
    },

    summary: function (moods) {
      return (moodSummaries[this.averageRound(moods) - 1] || 'Unknown') + ' • ' + this.average(moods);
    },

    bg: function (moods) {
      const avg = this.averageRound(moods);
      return (avg >= 1? 'grad-' + avg : 'unknown');
    }
  }
}