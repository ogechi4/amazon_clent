import { configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"

// connecting the slice with the store
import amazonReducer from '../redux/amazonSlice'
// import { version } from 'react'   
// import persistReducer from 'redux-persist/es/persistReducer'

const persistConfig = {
    key: "root",
    version: 1,
    storage,
}
const persistedReducer =persistReducer(persistConfig, amazonReducer)

export const store = configureStore({
reducer: {amazon:persistedReducer},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck:{
                ignoredActions: [FLUSH, REHYDRATE,PAUSE,PERSIST, PURGE, REGISTER],
            },
        })
})
export let persistor = persistStore(store)