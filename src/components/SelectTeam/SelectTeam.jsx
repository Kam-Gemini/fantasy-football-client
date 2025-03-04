import { useState, useEffect } from 'react'
import { playerIndex } from '../../services/playerService'
import PlayerCard from './PlayerCard'
import Filters from './Filters'
import Spinner from '../Spinner/Spinner'

import styles from './SelectTeam.module.css'

export default function SelectTeam () {

    // State
    const [players, setPlayers] = useState([])
    const [displayedPlayers, setDisplayedPlayers] = useState([])
    const [filterBy, setFilterBy] = useState('All')
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const listAllClubs = [...new Set(players.map(player => player.club))]

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

        if (searchTerm) {
            results = results.filter(player => 
            player.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
        }

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

    }, [filterBy, searchTerm, players])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase())
    }

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
                <div className={styles.pitch}></div>
                <div className={styles.playerFiltering}>
                    <div className={styles.search}>
                        <input 
                            type="search" 
                            name="search" 
                            id="search" 
                            placeholder="Search..." 
                            onChange={handleSearch}
                            value={searchTerm}
                        />
                    </div>
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