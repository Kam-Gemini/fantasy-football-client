const tokenName = 'sticky_token'

export const setToken = (token) => {
  localStorage.setItem(tokenName, token)
}

export const getToken = () => {
  return localStorage.getItem(tokenName)
}

export const removeToken = () => {
  localStorage.removeItem(tokenName)
}

// This function will decode the payload
// It will then check the expiry date is not in the past
// If the expiry is in the future, we will return the user object from the token 
export const getUserFromToken = () => {
    // 1. Get the token from storage
    const token = getToken()
    // 2. If there's not token, return null as no user exists
    if (!token) return null
    // 3. Separate the payload string from the rest of the token
    // - target only the middle string (payload)
    // - convert the b64 string to a JSON string using atob()
    // - convert the JSON string to an object using JSON.parse()
    const payload = JSON.parse(atob(token.split('.')[1]))
    
    // 4. Compare current time with expiry to check validity
    if (payload.exp < Date.now() / 1000) {
      // - Remove the token from storage
      removeToken()
      // - return null as no valid user present
      return null
    }
  
    // 5. Return the user from the payload
    return payload.user
  }