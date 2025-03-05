import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

import styles from './SelectTeam.module.css'

export default function SavedTeam({ savedTeam }) {
    const { user } = useContext(UserContext)
    console.log('user: ', user)

    if (!savedTeam) {
        return null
    }

    return (
        <section className={styles.savedTeam}>
            <h1>{savedTeam.team_name}</h1>
            <p>Total Cost: <strong>{savedTeam.total_cost}</strong></p>
            <p>Total Points: <strong>{savedTeam.total_points}</strong></p>
        </section>
    )
}