function upperBound(n, max) {
  return n > max ? max : n;
}

function lowerBound(n, min) {
  return n < min ? min : n;
}

function bound(n, min, max) {
  return upperBound(lowerBound(n, min), max);
}

export { upperBound, lowerBound, bound };
