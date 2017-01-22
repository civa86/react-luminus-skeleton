import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { expect } from 'chai';

import Config from '../../src/config'
import * as actions from '../../src/actions/AppActions';
import * as actionTypes from '../../src/constants/ActionTypes';

const
    config = Config(),
    middlewares = [thunk],
    mockStore = configureMockStore(middlewares);

describe('[ACTIONS] AppActions', () => {

    afterEach(() => {
        nock.cleanAll()
    });

    it('should dispatch getInfo with: Success', () => {
        const
            store = mockStore(),
            apiResult = {
                version: 'test'
            },
            expectedActions = [
                { type: actionTypes.APP_REQUEST },
                {
                    type: actionTypes.APP_GET_INFO_SUCCESS,
                    data: apiResult
                }
            ];

        nock(config.apiEndpoint)
            .get('/info')
            .reply(200, apiResult);

        return store.dispatch(actions.getInfo()).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions)
        });
    });

    it('should dispatch getInfo with: Error', () => {
        const
            store = mockStore(),
            apiResult = {
                code: 500,
                error: 'Error'
            },
            expectedActions = [
                { type: actionTypes.APP_REQUEST },
                {
                    type: actionTypes.APP_GET_INFO_ERROR,
                    error: apiResult
                }
            ];

        nock(config.apiEndpoint)
            .get('/info')
            .reply(500, apiResult);

        return store.dispatch(actions.getInfo()).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions)
        });
    });
});
