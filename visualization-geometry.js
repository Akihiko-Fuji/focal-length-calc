(function exposeCropVisualization(root, factory) {
  const api = factory();

  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.CropVisualization = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, () => {
  'use strict';

  function computeCropGeometry(sx, sy, tx, ty) {
    const dimensions = [sx, sy, tx, ty];
    if (!dimensions.every(value => Number.isFinite(value) && value > 0)) {
      return null;
    }

    const sourceDiagonal = Math.hypot(sx, sy);
    const targetDiagonal = Math.hypot(tx, ty);

    // This is intentionally a normalized comparison, not a physical lens-coverage test.
    const scale = 300 / Math.max(sourceDiagonal, targetDiagonal);

    return {
      sourceDiagonal,
      targetDiagonal,
      scale,
      sourceWidth: sx * scale,
      sourceHeight: sy * scale,
      targetWidth: tx * scale,
      targetHeight: ty * scale
    };
  }

  return { computeCropGeometry };
});
