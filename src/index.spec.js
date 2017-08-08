// @flow weak
/* eslint import/namespace: ['error', { allowComputed: true }] */
/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */

import { assert } from 'chai';
import * as Utube from './index';

describe('Utube', () => {
  it('should have exports', () => assert.ok(Utube));

  it('should not do undefined exports', () => {
    Object.keys(Utube).forEach(exportKey => assert.ok(Utube[exportKey]));
  });
});
