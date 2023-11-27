'use client'

import { createSlice } from '@reduxjs/toolkit'

const tahunAjarSlice = createSlice({
	name: 'tahunAjar',
	initialState: {
		id: null,
	},
	reducers: {
		setId: (state, action) => {
			state.id = action.payload
		},
	},
})

export const { setId } = tahunAjarSlice.actions
export const getId = (state) => state.tahunAjar.id
export default tahunAjarSlice.reducer
