import React from 'react';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from './redux/store';
import 'react-toastify/dist/ReactToastify.css'
//  from react slick documentation
import "slick-carousel/slick/slick.css"; 
import './index.css';
import App from './App';
import { app } from "./firebase.config";
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientid="236182520549-f3ls4pav0ulj0unmtjd6dhotjbjo9aji.apps.googleusercontent.com">
    <ReduxProvider store={store} app={app}>
       <PersistGate loading={"loading"} persistor ={persistor}>
       <App />
       </PersistGate>
    </ReduxProvider>
    </GoogleOAuthProvider>
);

