export const calculateMean = array =>
  (array.reduce((a, b) => a + b) / array.length).toFixed(6);

export const calculateMedian = array => {
  if (array.length === 0) return 0;
  array.slice().sort((a, b) => a - b);
  let half = Math.floor(array.length / 2);
  if (array.length % 2) return array[half];
  return ((array[half - 1] + array[half]) / 2.0).toFixed(6);
};

export const calculateStdDev = array => {
  let n = array.length;
  let mean = calculateMean(array);
  return Math.sqrt(
    array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
  ).toFixed(6);
};

export const calculateMode = array => {
  let m = array.reduce(
    function (current, num) {
      const freq =
        num in current.numMap
          ? ++current.numMap[num]
          : (current.numMap[num] = 1);
      if (freq > current.modeFreq && freq > 1) {
        current.modeFreq = freq;
        current.mode = num;
      }
      return current;
    },
    { mode: null, modeFreq: 0, numMap: {} }
  ).mode;
  if (m) {
    return m.toFixed(6);
  }
  return "No Mode";
};
