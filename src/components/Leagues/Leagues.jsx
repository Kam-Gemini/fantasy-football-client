import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import LeagueTable from './LeagueTable.jsx'
import JoinLeagues from './JoinLeagues.jsx'

import styles from './Leagues.module.css'

const Leagues = ({allLeagues, existingTeam}) => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const joinLeagues = allLeagues.filter(league => (league.teams.every(team => team.user !== user.id)))
    const [showLeagues, setShowLeagues] = useState(false)
    const [selectedLeagueId, setSelectedLeagueId] = useState(null)
    const handleLeagueClick = (leagueId) => {
        setSelectedLeagueId(selectedLeagueId === leagueId ? null : leagueId)
    }
    const handleJoinLeagueClick = () => {
        setShowLeagues(!showLeagues)
    }

    return (
        <section className={styles.container}>
            <div className={styles.leagues}>
                {allLeagues.map(league => (league.teams.map(team => team.user === user.id) && league.teams.length > 0 ?
                    <div key={league.id}>
                    <button className={styles.leagueButton} onClick={() => handleLeagueClick(league.id)}>
                    <h3>{league.league_name}</h3></button>
                    <div className={styles.spacer}></div>
                    {selectedLeagueId === league.id && <LeagueTable league={league} existingTeam={existingTeam} />}
                    </div> : null
                ))
                }
            </div>
            {joinLeagues.length > 0 ?
            <button className={styles.createButton} onClick={() => handleJoinLeagueClick()}>Join a League</button> : null}
                {showLeagues && (joinLeagues.length > 0 ? joinLeagues.map(league => (
                    <JoinLeagues key={league.id} league={league} />)) : <p>No leagues available to join</p>)}
            <div>
                <button onClick={() => navigate('/leaguename')} className={styles.createButton}>Create a league</button>
            </div>
        </section>
    )
}

export default Leagues