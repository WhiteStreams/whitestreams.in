import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey="6LcVwBEpAAAAAFN5Tdk_6aylwZZxkYt2n_Qj_EXK">
      <App />
    </GoogleReCaptchaProvider>
  </StrictMode>
);