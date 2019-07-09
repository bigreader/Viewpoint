import Calc from './calc';

export default [
  decision => {
    if (decision.options.length <= 1) {
      return {
        title: 'Add some options',
        body: "Add a few of the options you're deciding between.",
        bg: 'subtle'
      }
    }
    if (decision.factors.length === 0) {
      return {
        title: 'Add some factors',
        body: 'Enter some factors that might influence your decision.',
        bg: 'subtle'
      }
    }
    if (decision.moods.filter(mood => mood.set).length === 0) {
      return {
        title: 'Add some feelings',
        body: 'Select an option or factor, then select how you feel about each part of your decision.',
        bg: 'subtle'
      }
    }
    return false;
  },

  decision => {
    const { results, score } = Calc.slices.best(decision, 'options');
    if (results.length === 0) return false; // no slices with scores

    const sorted = Calc.slices.sort(decision, 'options').reverse();
    sorted.splice(0, results.length);
    if (sorted.length === 0) return {
      title: 'No Best',
      body: 'All options look about the same. Try adding more factors or revisiting how you feel.',
      bg: 'grad-2'
    }

    const gap = score - decision.average(sorted[0]);
    const out = {};

    const gapPick = (arr) => {
      if (gap >= 1) return arr[0];
      if (gap >= 0.5) return arr[1];
      if (gap >= 0.25) return arr[2];
      return arr[3];
    }

    out.bg = gapPick(['grad-5', 'grad-5', 'grad-5', 'mostly-p']);

    if (results.length === 1) {
      out.title = results[0].name;
      out.body = gapPick([
        `This is your best option by far.`,
        `This looks like your best option overall.`,
        `This is probably your best option overall.`,
        `It's close, but this seems like your best option overall.`
      ]);

    } else if (results.length === 2) {
      out.title = `${results[0].name} & ${results[1].name}`;
      out.body = gapPick([
        `These two are your best options by far.`,
        `These two look like your best options overall.`,
        `These two are probably your best options overall.`,
        `It's close, but these two seem like your best options overall.`
      ]);

    } else if (results.length > 2) {
      out.title = `${results.length} Options`;
      const last = results.pop();
      const optionsStr = `${results.map(o => `<b>${o.name}</b>`).join(', ')}, and <b>${last.name}</b>`;
      out.body = gapPick([
        `${optionsStr} are your best options by far.`,
        `${optionsStr} look like your best options overall.`,
        `${optionsStr} are probably your best options overall.`,
        `It's close, but ${optionsStr} seem like your best options overall.`
      ]);
    }

    return out;
  }
];
