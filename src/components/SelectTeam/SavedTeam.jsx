import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

import styles from './SelectTeam.module.css'

export default function SavedTeam({ savedTeam, totalCost, totalPoints }) {
    const { user } = useContext(UserContext)

    if (!savedTeam) {
        return null
    }

    const favouriteTeamImage = user.favourite_team.replace(/\s+/g, '')

    return (
        <section className={styles.savedTeam}>
            <h1>Welcome Back {user.username}</h1>
            <img src={`/assets/${favouriteTeamImage}.png`} alt={user.favourite_team} />
            <h2>{savedTeam.team_name}</h2>
            <h3>Total Cost: <strong>{totalCost}m</strong></h3>
            <h3>Total Points: <strong>{totalPoints}</strong></h3>
        </section>
    )
}