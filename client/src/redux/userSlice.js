import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser : JSON.parse(localStorage.getItem("work_flow_token") || null),
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    updateUser: (state, action) => {
      localStorage.setItem("work_flow_token", JSON.stringify(action.payload))
      state.currentUser = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions

export default userSlice.reducer