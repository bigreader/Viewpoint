
const moodSummaries = [
  'Terrible',
  'Bad',
  'Poor',
  'Mixed',
  'Okay',
  'Good',
  'Great',
  'Outstanding'
];

const Calc = {
  slices: {
    sort: function(decision, side) {
      return decision[side].slice().sort((a, b) => decision.average(b) - decision.average(a));
    },

    best: function(decision, side) {
      const best = decision[side].reduce((acc, slice) => {
        const score = decision.average(slice);
        if (score > acc.score) return { score, results: [slice] };
        if (score === acc.score) acc.results.push(slice);
        return acc;
      }, { score: 0, results: [] });
      return best;
    },

    worst: function (decision, side) {
      const worst = decision[side].reduce((acc, slice) => {
        const score = decision.average(slice);
        if (score === -1) return acc;
        if (score < acc.score) return { score, results: [slice] };
        if (score === acc.score) acc.results.push(slice);
        return acc;
      }, { score: 6, results: [] });
      return worst;
    }
  },

  moods: {
    average: function (moods = [], decision) {
      const validMoods = moods.filter(mood => mood.set);
      if (!moods || validMoods.length === 0) return -1;
      const sumVals = validMoods.reduce((acc, mood) => acc + mood.val, 0);
      const avg = sumVals / validMoods.length;
      if (!decision) return avg;
      
      const best = Calc.slices.best(decision, 'options').score;
      const worst = Calc.slices.worst(decision, 'options').score * 0.95;

      return Math.max(1, Math.min(5, (avg - worst) / (best - worst) * 4 + 1));
    },

    averageRound: function (moods, decision) {
      return Math.round(this.average(moods, decision));
    },

    summary: function (moods) {
      const avg = this.average(moods);
      if (avg < 0) return 'Undecided';
      return moodSummaries[Math.round(avg / 5 * 9 - 1)] || 'Unknown';
    },

    bg: function (moods, decision) {
      const avg = this.averageRound(moods, decision);
      return (avg >= 1? 'grad-' + avg : 'unknown');
    }
  }
}

export default Calc;