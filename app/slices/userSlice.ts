import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'


// Define a type for the slice state
interface UserState {
  view: number | null,
  user: string | null,
}

// Define the initial state using that type
const initialState: UserState = {
  view: null, 
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setView: (state) => {
        if (state.view == 0) {
            // Stasher view
            state.view = 1
        }
        else {
            // Host view
            state.view = 0
        }
    },
    setUser: (state, action: PayloadAction<string>) => {
      // User id for keeping track of what to display
      state.user = action.payload
    },
  },
})

export const { setView, setUser } = userSlice.actions

export default userSlice.reducer