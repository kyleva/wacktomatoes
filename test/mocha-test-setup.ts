import chai, { expect } from 'chai';
import enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { describe, it } from 'mocha';
import React from 'react';
import sinonChai from 'sinon-chai';

/**
 * Setup sinon-chai
 */
chai.use(sinonChai);

const globalAny: any = global;

globalAny.expect = expect;
globalAny.React = React;
globalAny.suite = describe;
globalAny.test = it;

/**
 * Setup Enzyme
 */
enzyme.configure({ adapter: new EnzymeAdapter() });
