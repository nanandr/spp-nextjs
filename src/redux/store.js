'use client'

import { configureStore } from "@reduxjs/toolkit"
import visibleReducer from './features/visibleSlice'

export const store = configureStore({
    reducer: {
        visible: visibleReducer,
    }
})