
const moodSummaries = [
  'Very Negative',
  'Negative',
  'Meh',
  'Positive',
  'Very Positive'
];

const Calc = {
  slices: {
    sort: function(decision, side) {
      return decision[side].slice().sort((a, b) => decision.average(a) - decision.average(b));
    },

    best: function(decision, side) {
      const best = decision[side].reduce((acc, slice) => {
        const score = decision.average(slice);
        if (score > acc.score) return { score, results: [slice] };
        if (score === acc.score) acc.results.push(slice);
        return acc;
      }, { score: 0, results: [] });
      return best;
    }
  },

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

export default Calc;