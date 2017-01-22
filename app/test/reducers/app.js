import { expect } from 'chai';
import app from '../../src/reducers/app';
import initState from '../../src/reducers/initState';
import * as actionTypes from '../../src/constants/ActionTypes';

const
    initialState = initState.app,
    deepFreeze = (obj) => {
        // Retrieve the property names defined on obj
        const propNames = Object.getOwnPropertyNames(obj);

        // Freeze properties before freezing self
        propNames.forEach(name => {
            const prop = obj[name];

            // Freeze prop if it is an object
            if (typeof prop === 'object' && prop !== null) {
                deepFreeze(prop);
            }
        });

        // Freeze self (no-op if already frozen)
        return Object.freeze(obj);
    };

describe('[REDUCERS] app reducer', () => {
    let state = deepFreeze(app());

    it('should have an initial state', () => {
        expect(state).to.deep.equal(initialState);
    });

    it('should set isFetching for a app request', () => {
        const action = {
            type: actionTypes.APP_REQUEST
        };
        state = app(state, action);
        expect(state.isFetching).to.equal(true);
    });

    it('should unset isFetching and set info after a get info success', () => {
        const action = {
            type: actionTypes.APP_GET_INFO_SUCCESS,
            data: { a: 1 }
        };
        state = app(state, action);
        expect(state.isFetching).to.equal(false);
        expect(state.info).to.be.a('object');
        expect(state.info.a).to.equal(1);
        expect(state.error).to.equal(null);
    });

    it('should unset isFetching, info and set error after a get info error', () => {
        const action = {
            type: actionTypes.APP_GET_INFO_ERROR,
            error: { status: 500 }
        };
        state = app(state, action);
        expect(state.isFetching).to.equal(false);
        expect(state.error).to.deep.equal(action.error);
        expect(state.info).to.equal(null);

    });

});
