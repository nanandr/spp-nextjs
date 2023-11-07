'use client'

import { configureStore } from "@reduxjs/toolkit"
import visibleReducer from './features/visibleSlice'
import inputPopUpReducer from "./features/inputPopUpSlice"

export const store = configureStore({
    reducer: {
        visible: visibleReducer,
        inputPopUp: inputPopUpReducer,
    }
})