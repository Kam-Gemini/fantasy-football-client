import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

import styles from './Leagues.module.css'

const LeagueTable = ({league}) => {
    const { user } = useContext(UserContext)
    const sortedTeams = [...league.teams].sort((a, b) => b.total_points - a.total_points)
    
    return (
        <section className={styles.leagueTable}>
            <div className={styles.leagues}>
                {sortedTeams.map((team, index) => (
                    <div key={team.id} className={styles.leagueTeam}>
                        { team.user === user.id ? (
                            <>
                                <div className={styles.teamPositionUser} style={{color: 'red'}}><strong>{index + 1}. {team.team_name}</strong></div> 
                                <div className={styles.teamPoints} style={{color: 'red'}} >{team.total_points}</div> 
                            </>
                            ) : (
                            <>
                                <div className={styles.teamPosition}><strong>{index + 1}. {team.team_name}</strong></div> 
                                <div className={styles.teamPoints}>{team.total_points}</div>
                            </>
                           )}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default LeagueTable