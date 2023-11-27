'use client'

import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
	name: 'notificationVisible',
	initialState: {
		isVisible: false,
	},
	reducers: {
		openNotif: (state) => {
			state.isVisible = true
		},
		closeNotif: (state) => {
			state.isVisible = false
		},
	},
})

export const { openNotif, closeNotif } = notificationSlice.actions
export const notificationVisiblility = (state) => state.notificationVisible.isVisible
export default notificationSlice.reducer