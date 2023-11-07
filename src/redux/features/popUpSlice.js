'use client'

import { createSlice } from '@reduxjs/toolkit'

const popUpSlice = createSlice({
    name: 'popUp',
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

export const { openPopUp, closePopUp } = popUpSlice.actions
export const selectPopUpStat = (state) => state.popUp.isPopUpOpen
export default popUpSlice.reducer
