// @flow weak
/* eslint import/namespace: ['error', { allowComputed: true }] */
/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */
import { assert } from 'chai';
import * as MaterialSon from './index';

describe('Material-Son', () => {
  it('should have exports', () => assert.ok(MaterialSon));

  it('should not do undefined exports', () => {
    Object.keys(MaterialSon).forEach(exportKey => assert.ok(MaterialSon[exportKey]));
  });
});
