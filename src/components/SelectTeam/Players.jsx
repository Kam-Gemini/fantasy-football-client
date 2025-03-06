import React, { useState } from 'react'
import PlayerCard from './PlayerCard'
import Filters from './Filters'
import Spinner from '../Spinner/Spinner'
import styles from './SelectTeam.module.css'

const Players = ({ filterBy, setFilterBy, listAllClubs, isLoading, displayedPlayers, handleAddPlayer, pickedPlayers, setPickedPlayers }) => {

    const handlePlayerClick = (player) => {
        handleAddPlayer(player)
        setPickedPlayers([...pickedPlayers, player.id])
    }

    return (
        <div className={styles.rightColumn}>
            <Filters filterBy={filterBy} setFilterBy={setFilterBy} listAllClubs={listAllClubs}/>
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