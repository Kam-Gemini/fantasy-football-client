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

    return (
        <>
            <section className={styles.header}>
                <div className={styles.imageContainer}>
                    <img src="/assets/MainGraphic.jpeg" alt="player kicking ball"/>
                </div>
                <div className={styles.textContainer}>
                    <h1>Fantasy Football</h1>
                    <p>Creat your own team</p>
                </div>
            </section>
            <section className={styles.mainBody}>
                <div className={styles.pitch}>
                    <div className={styles.pitchGoalkeeper}>
                        <VacantPlayer position={"Goalkeeper"} />  
                    </div>
                    <div className={styles.pitchDefenders}>
                        <VacantPlayer position={"Defender"} />
                        <VacantPlayer position={"Defender"} />
                        <VacantPlayer position={"Defender"} />
                        <VacantPlayer position={"Defender"} />
                    </div>
                    <div className={styles.pitchMidfielders}>
                        <VacantPlayer position={"Midfielder"} />
                        <VacantPlayer position={"Midfielder"} />
                        <VacantPlayer position={"Midfielder"} />
                    </div>
                    <div className={styles.pitchForwards}>
                        <VacantPlayer position={"Forward"} />
                        <VacantPlayer position={"Forward"} />
                        <VacantPlayer position={"Forward"} />
                    </div>
                </div>
                <div className={styles.playerFiltering}>
                    <Filters filterBy={filterBy} setFilterBy={setFilterBy} listAllClubs={listAllClubs}/>
                    <div className={styles.playersContainer}>
                    { isLoading ? <Spinner /> : 
                        displayedPlayers.map(player => (
                            <PlayerCard key={player.id} player={player} />
                        ))
                    }
                    </div>
                </div>
            </section>
        </>
    )
}