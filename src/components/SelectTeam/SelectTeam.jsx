import { useState, useEffect } from 'react'
import { playerIndex } from '../../services/playerService'
import PlayerCard from './PlayerCard'
import VacantPlayer from './VacantPlayer'
import Filters from './Filters'
import Spinner from '../Spinner/Spinner'

import styles from './SelectTeam.module.css'

export default function SelectTeam () {

    // State
    const [players, setPlayers] = useState([])
    const [displayedPlayers, setDisplayedPlayers] = useState([])
    const [filterBy, setFilterBy] = useState('All')
    const [isLoading, setIsLoading] = useState(true)
    const [team, setTeam] = useState(null) // State to save the selected team
    const listAllClubs = [...new Set(players.map(player => player.club))]
    const [teamData, setTeamData] = useState({
        goalkeeper: null,
        defenders: [null, null, null, null],
        midfielders: [null, null, null],
        forwards: [null, null, null],
     })

    useEffect(() => {
        playerIndex()
            .then(data => {
                setPlayers(data)
                console.log(data)
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

    const handlePlayerClick = (player) => {
        if (player.position === 'Goalkeeper') {
            setTeamData(prevState => ({ ...prevState, goalkeeper: player }))
        } else if (player.position === 'Defender') {
            setTeamData(prevState => {
                const newDefenders = [...prevState.defenders]
                const index = newDefenders.findIndex(defender => defender === null)
                if (index !== -1) newDefenders[index] = player
                return { ...prevState, defenders: newDefenders }
            })
        } else if (player.position === 'Midfielder') {
            setTeamData(prevState => {
                const newMidfielders = [...prevState.midfielders]
                const index = newMidfielders.findIndex(midfielder => midfielder === null)
                if (index !== -1) newMidfielders[index] = player
                return { ...prevState, midfielders: newMidfielders }
            })
        } else if (player.position === 'Forward') {
            setTeamData(prevState => {
                const newForwards = [...prevState.forwards]
                const index = newForwards.findIndex(forward => forward === null)
                if (index !== -1) newForwards[index] = player
                return { ...prevState, forwards: newForwards }
            })
        }
    }

    const handleVacantClick = (position, index) => {
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

    const handleSave = () => {
        setTeam(teamData)
        console.log('Team saved:', teamData)
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
                                <button onClick={() => handleVacantClick('Goalkeeper')} className={styles.vacantButton}>
                                    <PlayerCard player={teamData.goalkeeper} />
                                </button> 
                                : <VacantPlayer position={"Goalkeeper"} />}
                        </div>
                        <div className={styles.pitchDefenders}>
                            {teamData.defenders.map((defender, index) => (
                                defender ? 
                                    <button key={index} onClick={() => handleVacantClick('Defender', index)} className={styles.vacantButton}>
                                        <PlayerCard player={defender} />
                                    </button> 
                                    : <VacantPlayer key={index} position={"Defender"} />
                            ))}
                        </div>
                        <div className={styles.pitchMidfielders}>
                            {teamData.midfielders.map((midfielder, index) => (
                                midfielder ? 
                                    <button key={index} onClick={() => handleVacantClick('Midfielder', index)} className={styles.vacantButton}>
                                        <PlayerCard player={midfielder} />
                                    </button> 
                                    : <VacantPlayer key={index} position={"Midfielder"} />
                            ))}
                        </div>
                        <div className={styles.pitchForwards}>
                            {teamData.forwards.map((forward, index) => (
                                forward ? 
                                    <button key={index} onClick={() => handleVacantClick('Forward', index)} className={styles.vacantButton}>
                                        <PlayerCard player={forward} />
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
                            <button key={player.id} onClick={() => handlePlayerClick(player)} className={styles.playerButton}>
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