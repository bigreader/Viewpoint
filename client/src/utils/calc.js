
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
      const validMoods = moods.filter(mood => mood.set);
      if (!moods || validMoods.length === 0) return -1;
      const sumVals = validMoods.reduce((acc, mood) => acc + mood.val, 0);
      return sumVals / validMoods.length;
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