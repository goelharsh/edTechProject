import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../reducer/slices/authSlice"

const rootReducer = combineReducers({
    auth: authReducer
})

export default rootReducer
