import PlayerCard from './PlayerCard'
import Filters from './Filters'
import Sorting from './Sorting'
import Spinner from '../Spinner/Spinner'
import styles from './SelectTeam.module.css'

const Players = ({ filterBy, setFilterBy, listAllClubs, isLoading, displayedPlayers, handleAddPlayer, pickedPlayers, sortBy, setSortBy }) => {
    const handlePlayerClick = (player) => {
        // Prevent adding a player that's already picked
        (pickedPlayers && pickedPlayers.includes(player.id)) ? null : handleAddPlayer(player)
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
                        <div
                            role="button" 
                            key={player.id} 
                            onClick={() => handlePlayerClick(player)} 
                            className={styles.playerButton}
                        >
                            <PlayerCard player={player} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Players