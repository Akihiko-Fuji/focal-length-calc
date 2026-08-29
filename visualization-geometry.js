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

  function computeSceneScale(effectiveFocal) {
    if (!Number.isFinite(effectiveFocal) || effectiveFocal <= 0) {
      return null;
    }

    // Compress the very wide supported focal-length range into a legible schematic cue.
    // This affects only the scenery; sensor rectangles keep their physical size ratio.
    const referenceFocal = 50;
    const minimumScale = 0.45;
    const maximumScale = 2.75;
    const perceptualScale = Math.sqrt(effectiveFocal / referenceFocal);

    return Math.min(maximumScale, Math.max(minimumScale, perceptualScale));
  }

  return { computeCropGeometry, computeSceneScale };
});
