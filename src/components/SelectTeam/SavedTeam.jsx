import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

import styles from './SelectTeam.module.css'

export default function SavedTeam({ totalCost, totalPoints, userTeamName }) {
    const { user } = useContext(UserContext)
    if (!userTeamName) {
        return null
    }

    const favouriteTeamImage = user.favourite_team.replace(/\s+/g, '')

    return (
        <section className={styles.savedTeam}>
            <h1>Welcome Back {user.username}</h1>
            <img src={`/assets/${favouriteTeamImage}.png`} alt={user.favourite_team} />
            <h2>{userTeamName}</h2>
            <h3>Total Cost: {totalCost}m</h3>
            <h3>Total Points: {totalPoints}</h3>
        </section>
    )
}