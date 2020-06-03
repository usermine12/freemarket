import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import authReducer from './authReducer'
import loginFormReducer from './loginFormReducer'
import registerFormReducer from './registerFormReducer'
import addListingDialogReducer from './addListingDialogReducer'
import listingsReducer from './listingsReducer'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'

const createReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    loginForm: loginFormReducer,
    registerForm: registerFormReducer,
    addListingDialog: addListingDialogReducer,
    listings: listingsReducer
  })

export const history = createBrowserHistory()

const store = createStore(
  createReducer(history),
  composeWithDevTools(
    applyMiddleware(thunk, routerMiddleware(history))
  )
)

export default store