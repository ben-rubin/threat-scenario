import { configureStore } from '@reduxjs/toolkit'

import reducer from './reducers/threat-scenario-reducer'

export default configureStore({
    reducer: {
        notes: reducer,
    },
    devTools: true,
})