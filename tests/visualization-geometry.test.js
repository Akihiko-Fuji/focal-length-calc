'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { computeCropGeometry } = require('../visualization-geometry.js');

test('equal formats produce coincident rectangles', () => {
  const result = computeCropGeometry(36, 24, 36, 24);
  assert.equal(result.sourceWidth, result.targetWidth);
  assert.equal(result.sourceHeight, result.targetHeight);
});

test('35 mm to Micro Four Thirds makes the target rectangle smaller', () => {
  const result = computeCropGeometry(36, 24, 18, 13.5);
  assert.ok(result.targetWidth < result.sourceWidth);
  assert.ok(result.targetHeight < result.sourceHeight);
});

test('Micro Four Thirds to 35 mm makes the target rectangle larger', () => {
  const result = computeCropGeometry(18, 13.5, 36, 24);
  assert.ok(result.targetWidth > result.sourceWidth);
  assert.ok(result.targetHeight > result.sourceHeight);
});

test('8×10 and a small industrial format share one proportional scale', () => {
  const result = computeCropGeometry(245, 194, 4.61, 3.46);
  assert.equal(result.scale, 300 / Math.hypot(245, 194));
  assert.ok(Math.abs(result.targetWidth / result.sourceWidth - 4.61 / 245) < 1e-12);
  assert.ok(Math.abs(result.targetHeight / result.sourceHeight - 3.46 / 194) < 1e-12);
});

test('invalid custom dimensions do not produce visualization geometry', () => {
  assert.equal(computeCropGeometry(0, 24, 18, 13.5), null);
  assert.equal(computeCropGeometry(36, NaN, 18, 13.5), null);
});

test('invalid focal length and F-stop trigger the page clear path', () => {
  const fs = require('node:fs');
  const page = fs.readFileSync(require.resolve('../index.html'), 'utf8');
  const invalidBranch = /if \(errors\.length\) \{\s*clearCropVisual\(\);/;
  assert.match(page, invalidBranch);
  assert.match(page, /elements\.lensConstants\.textContent = 'レンズの値を入力してください'/);
});

test('dynamic crop values are exposed through an atomic polite live region', () => {
  const fs = require('node:fs');
  const page = fs.readFileSync(require.resolve('../index.html'), 'utf8');
  assert.match(
    page,
    /id="cropAccessibleSummary"[^>]*aria-live="polite"[^>]*aria-atomic="true"/
  );
  assert.match(page, /黄色の実線は入力条件の\$\{sourceName\}/);
  assert.match(page, /水色の破線は換算先の\$\{targetName\}/);
  assert.match(page, /入力値が正しくないため、クロップ比較を表示していません。/);
});
