import React, { useState } from 'react'
import PlayerCard from './PlayerCard'
import Filters from './Filters'
import Sorting from './Sorting'
import Spinner from '../Spinner/Spinner'
import styles from './SelectTeam.module.css'

const Players = ({ filterBy, setFilterBy, listAllClubs, isLoading, displayedPlayers, handleAddPlayer, pickedPlayers, setPickedPlayers, sortBy, setSortBy }) => {

    const handlePlayerClick = (player) => {
        handleAddPlayer(player)
        setPickedPlayers([...pickedPlayers, player.id])
    }

    return (
        <div className={styles.rightColumn}>
            <div className={styles.filters}>
                <Filters filterBy={filterBy} setFilterBy={setFilterBy} listAllClubs={listAllClubs}/>
                <Sorting sortBy={sortBy} setSortBy={setSortBy} />
            </div>
            <div className={styles.playersContainer}>
                { isLoading ? <Spinner /> : 
                    displayedPlayers.map(player => (
                        <button 
                            key={player.id} 
                            onClick={() => handleAddPlayer(player)} 
                            className={styles.playerButton}
                            disabled={pickedPlayers.includes(player.id)}
                        >
                            <PlayerCard player={player} />
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default Players