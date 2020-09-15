import { useMemo } from 'react'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { index } from './services/threat-scenario-service'

const INDEX_PAGE_SIZE_DEFAULT = 10
const INDEX_PAGE_SIZE_OPTIONS = [10]

let store

const initialState = {
    data: null,
    meta: {
        page: 1,
        pageSize: INDEX_PAGE_SIZE_DEFAULT,
        pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
        pageTotal: 1,
        total: 0,
    },
}

const USER_INDEX_REQUEST = 'USER_INDEX_REQUEST'
const fetchIndexRequest = () => {
    return {
        type: USER_INDEX_REQUEST,
    }
}

const USER_INDEX_SUCCESS = 'USER_INDEX_SUCCESS'
const fetchIndexSuccess = payload => {
    return {
        type: USER_INDEX_SUCCESS,
        data: payload,
    }
}
// SINGLE ACTION TYPE TO CHANGE META DATA
const USER_INDEX_META = 'USER_INDEX_META'

// ACTIONS CREATORS
export function $pageSize(pageSize = INDEX_PAGE_SIZE_DEFAULT) {
    if (pageSize < 1) {
        pageSize = 10
    }

    if (pageSize > 100) {
        pageSize = 100
    }

    return {
        type: USER_INDEX_META,
        meta: {
            pageSize,
            page: 1,
        },
    }
}

export function $page(page = 1) {
    return (dispatch, getState) => {
        const { meta } = getState()/*[substate]*/

        if (page < 1) {
            page = 1
        }

        if (page > meta.pageTotal) {
            page = meta.pageTotal - 1
        }

        dispatch({
            type: USER_INDEX_META,
            meta: {
                page,
            },
        })
    }
}


function reducer(
    state = initialState,
    action,
) {
    switch (action.type) {
        case USER_INDEX_META:
            return {
                ...state,
                meta: {
                    ...state.meta,
                    ...action.meta,
                },
            }
        case USER_INDEX_SUCCESS:
            return {
                ...state,
                data: action.data,
                meta: {
                    ...state.meta,
                    ...action.meta,
                },
            }
        default:
            return state
    }
}


export const $fetchIndex = async () => {
    return (dispatch, getState) => {
        const blah = getState()
        const { meta } = getState()

        dispatch(fetchIndexRequest())

        return index().then(result =>
            dispatch(fetchIndexSuccess({
                data: result.data,
                meta: {
                    page: 1 /*+ result.start / result.limit*/,
                    pageSize: 10/*result.limit*/,
                    pageTotal: 10/*Math.ceil(result.total / result.limit)*/,
                    total: 10000/*result.total*/,
                },
            })),
        )
        // .catch(error => dispatch(fetchIndexFailure(error)));
    }
}


export const initStore = (preloadedState = initialState) => {
    return createStore(
        reducer,
        preloadedState,
        composeWithDevTools(applyMiddleware(thunk)),
    )
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export const useStore = (initialState) => {
    return useMemo(() => initializeStore(initialState), [initialState])
}