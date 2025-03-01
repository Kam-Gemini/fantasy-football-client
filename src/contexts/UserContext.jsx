import { createContext, useState } from 'react'
import { getUserFromToken } from '../utils/auth'

// Creates a context that will hold the state values for the user
const UserContext = createContext(null)

// The "Provider" is wrapped around any component that should have access to the above context
function UserProvider({ children }){
  // The user state works as any other state and will form the value of our user context
  const [user, setUser] = useState(getUserFromToken())

  // Below, we provide a value key to the context provider, which gives any component access to the user and setUser values
  return (
    <UserContext.Provider value={{ user, setUser }}>
      { children }
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }