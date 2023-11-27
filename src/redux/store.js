'use client'

import { configureStore } from "@reduxjs/toolkit"
import visibleReducer from './features/visibleSlice'
import inputPopUpReducer from "./features/inputPopUpSlice"
import tahunAjarReducer from "./features/tahunAjarSlice"
import alertReducer from "./features/alertSlice"
import notificationReducer from "./features/notificationSlice"

export const store = configureStore({
	reducer: {
		visible: visibleReducer,
		inputPopUp: inputPopUpReducer,
		tahunAjar: tahunAjarReducer,
		alertVisible: alertReducer,
		notificationVisible: notificationReducer,
	}
})