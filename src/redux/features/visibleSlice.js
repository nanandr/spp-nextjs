'use client'

import { createSlice } from "@reduxjs/toolkit"

const visibleSlice = createSlice({
	name: 'visible',
	initialState: {
		isVisible: false,
	},
	reducers: {
		toggleVisibility: (state) => {
			state.isVisible = !state.isVisible
		},
	},
})

export const { toggleVisibility } = visibleSlice.actions
export const selectVisibility = (state) => state.visible.isVisible
export default visibleSlice.reducer