'use client'

import { createSlice } from "@reduxjs/toolkit"

const alertSlice = createSlice({
  name: 'alertVisible',
  initialState: {
    isVisible: false,
  },
  reducers: {
    openAlert: (state) => {
      state.isVisible = true
    },
    closeAlert: (state) => {
      state.isVisible = false
    },
  },
})

export const { openAlert, closeAlert } = alertSlice.actions
export const alertVisiblility = (state) => state.alertVisible.isVisible
export default alertSlice.reducer