import { createContext, useContext } from 'react'
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const useAuth = () => {
   return {
      user: useContext(AuthContext),
   }
}

export const AuthProvider = ({ children }) => {
   const userToken = Cookies.get("ut")
   const user = userToken ? jwt_decode(userToken) : {};

   return (
      <AuthContext.Provider value={user}>
         {children}
      </AuthContext.Provider>
   )
}