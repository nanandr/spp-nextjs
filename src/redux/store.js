'use client'

import { configureStore } from "@reduxjs/toolkit"
import visibleReducer from './features/visibleSlice'
import inputPopUpReducer from "./features/inputPopUpSlice"
import tahunAjarReducer from "./features/tahunAjarSlice"

export const store = configureStore({
    reducer: {
        visible: visibleReducer,
        inputPopUp: inputPopUpReducer,
        tahunAjar: tahunAjarReducer
    }
})