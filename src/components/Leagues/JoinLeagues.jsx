import { useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { leagueUpdate } from '../../services/leagueService'

import styles from './Leagues.module.css'

const JoinLeagues = ({league}) => {
    const [savedLeague, setSavedLeague] = useState(null)
    const { user } = useContext(UserContext)

    const handleJoinLeague = async () => {
        try {
            const leagueData = {
                teams: [user.id]
            }
            const updatedLeague = await leagueUpdate(league.id, leagueData)
            setSavedLeague(updatedLeague)
            console.log('Joined league successfully:', updatedLeague)
        } catch (error) {
            console.error('Error updating team:', error)
        }
    }

    return (
        <section className={styles.joinLeagueTable}>
            <div className={styles.leagues}>
                <div className={styles.leagueJoin}>
                    <div className={styles.teamPosition}><strong>{league.league_name}</strong></div>
                    <button onClick={handleJoinLeague} className={styles.joinButton}>
                        +
                    </button>
                </div>
            </div>
        </section>
    )
}

export default JoinLeagues