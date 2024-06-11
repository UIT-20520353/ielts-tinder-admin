import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";
import { UserProfileProps } from "@/models/user";
import { initialUserProfile } from "@/app/initial-states";

interface AuthState {
  profile: UserProfileProps;
}

const initialState: AuthState = {
  profile: initialUserProfile,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfileProps>) => {
      state.profile = action.payload;
    },
    clearAuthState: (state) => {
      state.profile = initialUserProfile;
    },
  },
});

export const { setProfile, clearAuthState } = authSlice.actions;

export const selectProfile = (state: RootState) => state.auth.profile;

export default authSlice.reducer;
