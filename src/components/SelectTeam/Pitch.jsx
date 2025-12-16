import PlayerCard from './PlayerCard'
import VacantPlayer from './VacantPlayer'
import { useState } from 'react'
import styles from './SelectTeam.module.css'

const Pitch = ({ teamData, players, handleRemovePlayer, handleSave, handleEdit, handleDelete, isSaved, costExceeded, playerLimitExceeded }) => {
    const [openInfoPlayerId, setOpenInfoPlayerId] = useState(null)

    const getPlayerById = (id) => {
        const player = players.find(player => player.id === id)
        return player
    }

    return (
        <div className={styles.leftColumn}>
            <div className={styles.pitch}>
                <div className={styles.pitchGoalkeeper}>
                    {teamData.goalkeeper ? 
                        <button onClick={() => handleRemovePlayer('Goalkeeper')} className={styles.vacantButton} disabled={isSaved || openInfoPlayerId === teamData.goalkeeper}>
                            <PlayerCard player={getPlayerById(teamData.goalkeeper)} onInfoToggle={(isOpen) => setOpenInfoPlayerId(isOpen ? teamData.goalkeeper : null)} isSaved={isSaved} />
                        </button> 
                        : <VacantPlayer position={"Goalkeeper"} disabled={true} />}
                </div>
                <div className={styles.pitchDefenders}>
                    {teamData.defenders.map((defender, index) => (
                        defender ? 
                            <button key={index} onClick={() => handleRemovePlayer('Defender', index)} className={styles.vacantButton} disabled={isSaved || openInfoPlayerId === defender}>
                                <PlayerCard player={getPlayerById(defender)} onInfoToggle={(isOpen) => setOpenInfoPlayerId(isOpen ? defender : null)} isSaved={isSaved} />
                            </button> 
                            : <VacantPlayer key={index} position={"Defender"} disabled={true} />
                    ))}
                </div>
                <div className={styles.pitchMidfielders}>
                    {teamData.midfielders.map((midfielder, index) => (
                        midfielder ? 
                            <button key={index} onClick={() => handleRemovePlayer('Midfielder', index)} className={styles.vacantButton} disabled={isSaved || openInfoPlayerId === midfielder}>
                                <PlayerCard player={getPlayerById(midfielder)} onInfoToggle={(isOpen) => setOpenInfoPlayerId(isOpen ? midfielder : null)} isSaved={isSaved} />
                            </button> 
                            : <VacantPlayer key={index} position={"Midfielder"} disabled={true} />
                    ))}
                </div>
                <div className={styles.pitchForwards}>
                    {teamData.forwards.map((forward, index) => (
                        forward ? 
                            <button key={index} onClick={() => handleRemovePlayer('Forward', index)} className={styles.vacantButton} disabled={isSaved || openInfoPlayerId === forward}>
                                <PlayerCard player={getPlayerById(forward)} onInfoToggle={(isOpen) => setOpenInfoPlayerId(isOpen ? forward : null)} isSaved={isSaved} />
                            </button> 
                            : <VacantPlayer key={index} position={"Forward"} disabled={true} />
                    ))}
                </div>
            </div>
            <div className={styles.saveButtonContainer}>
                {isSaved ? (
                    <>
                        <button onClick={handleEdit} className={styles.saveButton}>Update</button>
                        <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
                    </>
                ) : (
                    <button onClick={handleSave} className={styles.saveButton} disabled={costExceeded || playerLimitExceeded}>Save</button>
                )}
            </div>
        </div>
    )
}

export default Pitch