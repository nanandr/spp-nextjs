'use client'

import { createSlice } from '@reduxjs/toolkit'

const inputPopUpSlice = createSlice({
	name: 'inputPopUp',
	initialState: {
		isPopUpOpen: false,
	},
	reducers: {
		openPopUp: (state) => {
			state.isPopUpOpen = true
		},
		closePopUp: (state) => {
			state.isPopUpOpen = false
		},
	},
})

export const { openPopUp, closePopUp } = inputPopUpSlice.actions
export const selectPopUpStat = (state) => state.inputPopUp.isPopUpOpen
export default inputPopUpSlice.reducer
