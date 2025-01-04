class SpeedGraph {
  constructor() {}

  easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }
  easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }
  easeInQuart(x) {
    return x * x * x * x;
  }
}

export default SpeedGraph;