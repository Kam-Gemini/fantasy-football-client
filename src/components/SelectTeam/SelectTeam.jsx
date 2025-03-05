import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useParams } from 'react-router'
import { teamShow, teamIndex, teamUpdate } from '../../services/teamService'
import { playerIndex } from '../../services/playerService'
import PlayerCard from './PlayerCard'
import VacantPlayer from './VacantPlayer'
import Filters from './Filters'
import Spinner from '../Spinner/Spinner'

import styles from './SelectTeam.module.css'

export default function SelectTeam ({ existingTeam }) {

    // State
    const { user } = useContext(UserContext)
    const [players, setPlayers] = useState([])
    const [displayedPlayers, setDisplayedPlayers] = useState([])
    const [filterBy, setFilterBy] = useState('All')
    const [isLoading, setIsLoading] = useState(true)
    const listAllClubs = [...new Set(players.map(player => player.club))]
    const { team } = useParams()
    const [allTeams, setAllTeams] = useState([])
    const [currentTeam, setCurrentTeam] = useState(null)

    const initializeTeamData = (team) => {
        return {
            goalkeeper: team.goalkeeper || null,
            defenders: team.defenders && team.defenders.length === 4 ? team.defenders : [null, null, null, null],
            midfielders: team.midfielders && team.midfielders.length === 3 ? team.midfielders : [null, null, null],
            forwards: team.forwards && team.forwards.length === 3 ? team.forwards : [null, null, null],
        }
    }

    const [teamData, setTeamData] = useState(initializeTeamData(existingTeam || {
        goalkeeper: null,
        defenders: [null, null, null, null],
        midfielders: [null, null, null],
        forwards: [null, null, null],
    }))

    useEffect(() => {
        playerIndex()
            .then(data => {
                setPlayers(data)
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        let results = players

        if (filterBy === 'Goalkeepers') {
            results = results.filter(player => player.position === 'Goalkeeper')
        } else if (filterBy === 'Defenders') {
            results = results.filter(player => player.position === 'Defender')
        } else if (filterBy === 'Midfielders') {
            results = results.filter(player => player.position === 'Midfielder')
        } else if (filterBy === 'Forwards') {
            results = results.filter(player => player.position === 'Forward')
        } else if (filterBy !== 'All') {
            results = results.filter(player => player.club === filterBy)
        }

        setDisplayedPlayers(results)

    }, [filterBy, players])

    useEffect(() => {
        teamIndex()
            .then(data => {
                setAllTeams(data)
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        if (allTeams.length > 0) {
            const team = allTeams.find(team => team.user === user.id)
            if (team) {
                setCurrentTeam(team)
                teamShow(team.id)
                    .then(data => {
                        setTeamData(initializeTeamData(data))
                    })
                    .catch(err => console.log(err))
            }
        }
    }, [allTeams, user.id])

    const handleAddPlayer = (player) => {
        if (player.position === 'Goalkeeper') {
            setTeamData(prevState => ({ ...prevState, goalkeeper: player.id }))
        } else if (player.position === 'Defender') {
            setTeamData(prevState => {
                const newDefenders = [...prevState.defenders]
                const index = newDefenders.findIndex(defender => defender === null)
                if (index !== -1) newDefenders[index] = player.id
                return { ...prevState, defenders: newDefenders }
            })
        } else if (player.position === 'Midfielder') {
            setTeamData(prevState => {
                const newMidfielders = [...prevState.midfielders]
                const index = newMidfielders.findIndex(midfielder => midfielder === null)
                if (index !== -1) newMidfielders[index] = player.id
                return { ...prevState, midfielders: newMidfielders }
            })
        } else if (player.position === 'Forward') {
            setTeamData(prevState => {
                const newForwards = [...prevState.forwards]
                const index = newForwards.findIndex(forward => forward === null)
                if (index !== -1) newForwards[index] = player.id
                return { ...prevState, forwards: newForwards }
            })
        }
        console.log('team: ', teamData)
    }

    const handleRemovePlayer = (position, index) => {
        setTeamData(prevState => {
            if (position === 'Goalkeeper') {
                return { ...prevState, goalkeeper: null }
            } else if (position === 'Defender') {
                const newDefenders = [...prevState.defenders]
                newDefenders[index] = null
                return { ...prevState, defenders: newDefenders }
            } else if (position === 'Midfielder') {
                const newMidfielders = [...prevState.midfielders]
                newMidfielders[index] = null
                return { ...prevState, midfielders: newMidfielders }
            } else if (position === 'Forward') {
                const newForwards = [...prevState.forwards]
                newForwards[index] = null
                return { ...prevState, forwards: newForwards }
            }
        })
    }

    const handleSave = async (e) => {
        e.preventDefault()
        try {
            console.log('team data', teamData)
            console.log('team id:', currentTeam.id)
            const updatedTeam = await teamUpdate(currentTeam.id, teamData)
            setTeamData(updatedTeam)
            console.log('Team updated:', updatedTeam)
        } catch (error) {
            console.error('Error updating team:', error)
        }
    }   

    return (
        <>
            <section className={styles.header}>
                <div className={styles.imageContainer}>
                    <img src="/assets/MainGraphic.jpeg" alt="player kicking ball"/>
                </div>
                <div className={styles.textContainer}>
                    <h1>Fantasy Football</h1>
                    <p>Create your own team</p>
                </div>
            </section>
            <section className={styles.mainBody}>
                <div className={styles.leftColumn}>
                    <div className={styles.pitch}>
                        <div className={styles.pitchGoalkeeper}>
                            {teamData.goalkeeper ? 
                                <button onClick={() => handleRemovePlayer('Goalkeeper')} className={styles.vacantButton}>
                                    <PlayerCard player={players.find(player => player.id === teamData.goalkeeper)} />
                                </button> 
                                : <VacantPlayer position={"Goalkeeper"} />}
                        </div>
                        <div className={styles.pitchDefenders}>
                            {teamData.defenders.map((defender, index) => (
                                defender ? 
                                    <button key={index} onClick={() => handleRemovePlayer('Defender', index)} className={styles.vacantButton}>
                                        <PlayerCard player={players.find(player => player.id === defender)} />
                                    </button> 
                                    : <VacantPlayer key={index} position={"Defender"} />
                            ))}
                        </div>
                        <div className={styles.pitchMidfielders}>
                            {teamData.midfielders.map((midfielder, index) => (
                                midfielder ? 
                                    <button key={index} onClick={() => handleRemovePlayer('Midfielder', index)} className={styles.vacantButton}>
                                        <PlayerCard player={players.find(player => player.id === midfielder)} />
                                    </button> 
                                    : <VacantPlayer key={index} position={"Midfielder"} />
                            ))}
                        </div>
                        <div className={styles.pitchForwards}>
                            {teamData.forwards.map((forward, index) => (
                                forward ? 
                                    <button key={index} onClick={() => handleRemovePlayer('Forward', index)} className={styles.vacantButton}>
                                        <PlayerCard player={players.find(player => player.id === forward)} />
                                    </button> 
                                    : <VacantPlayer key={index} position={"Forward"} />
                            ))}
                        </div>
                    </div>
                    <div className={styles.saveButtonContainer}>
                        <button onClick={handleSave} className={styles.saveButton}>SAVE</button>
                    </div>
                </div>
                <div className={styles.rightColumn}>
                    <Filters filterBy={filterBy} setFilterBy={setFilterBy} listAllClubs={listAllClubs}/>
                    <div className={styles.playersContainer}>
                    { isLoading ? <Spinner /> : 
                        displayedPlayers.map(player => (
                            <button key={player.id} onClick={() => handleAddPlayer(player)} className={styles.playerButton}>
                                <PlayerCard player={player} />
                            </button>
                        ))
                    }
                    </div>
                </div>
            </section>
        </>
    )
}