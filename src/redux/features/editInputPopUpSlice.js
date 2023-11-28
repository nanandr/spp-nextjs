'use client'

import { createSlice } from '@reduxjs/toolkit'

const editInputPopUpSlice = createSlice({
	name: 'editInputPopUp',
	initialState: {
		isEPopUpOpen: false,
	},
	reducers: {
		openEPopUp: (state) => {
			state.isEPopUpOpen = true
		},
		closeEPopUp: (state) => {
			state.isEPopUpOpen = false
		},
	},
})

export const { openEPopUp, closeEPopUp } = editInputPopUpSlice.actions
export const selectEPopUpStat = (state) => state.editInputPopUp.isEPopUpOpen
export default editInputPopUpSlice.reducer
