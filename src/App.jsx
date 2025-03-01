import { Routes, Route } from 'react-router'

import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import FavouriteTeam from './components/FavouriteTeam/FavouriteTeam'
import TeamName from './components/TeamName'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/favouriteteam" element={<FavouriteTeam/>} />
        <Route path="/fantasyteamname" element={<TeamName/>} />
      </Routes>
    </>   
  )
}

export default App
