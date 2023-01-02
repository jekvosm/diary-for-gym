import React from 'react'

import { createRoot } from 'react-dom/client'

import { HashRouter } from 'react-router-dom'

import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from './store/store'

import App from './App'

import './index.scss'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <App />
        </HashRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
