import PlayerCard from './PlayerCard'
import VacantPlayer from './VacantPlayer'
import styles from './SelectTeam.module.css'

const Pitch = ({ teamData, players, handleRemovePlayer, handleSave, handleEdit, handleDelete, isSaved, costExceeded }) => {

    const getPlayerById = (id) => {
        const player = players.find(player => player.id === id)
        return player
    }

    return (
        <div className={styles.leftColumn}>
            <div className={styles.pitch}>
                <div className={styles.pitchGoalkeeper}>
                    {teamData.goalkeeper ? 
                        <button onClick={() => handleRemovePlayer('Goalkeeper')} className={styles.vacantButton} disabled={isSaved}>
                            <PlayerCard player={getPlayerById(teamData.goalkeeper)} />
                        </button> 
                        : <VacantPlayer position={"Goalkeeper"} disabled={true} />}
                </div>
                <div className={styles.pitchDefenders}>
                    {teamData.defenders.map((defender, index) => (
                        defender ? 
                            <button key={index} onClick={() => handleRemovePlayer('Defender', index)} className={styles.vacantButton} disabled={isSaved}>
                                <PlayerCard player={getPlayerById(defender)} />
                            </button> 
                            : <VacantPlayer key={index} position={"Defender"} disabled={true} />
                    ))}
                </div>
                <div className={styles.pitchMidfielders}>
                    {teamData.midfielders.map((midfielder, index) => (
                        midfielder ? 
                            <button key={index} onClick={() => handleRemovePlayer('Midfielder', index)} className={styles.vacantButton} disabled={isSaved}>
                                <PlayerCard player={getPlayerById(midfielder)} />
                            </button> 
                            : <VacantPlayer key={index} position={"Midfielder"} disabled={true} />
                    ))}
                </div>
                <div className={styles.pitchForwards}>
                    {teamData.forwards.map((forward, index) => (
                        forward ? 
                            <button key={index} onClick={() => handleRemovePlayer('Forward', index)} className={styles.vacantButton} disabled={isSaved}>
                                <PlayerCard player={getPlayerById(forward)} />
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
                    <button onClick={handleSave} className={styles.saveButton} disabled={costExceeded}>Save</button>
                )}
            </div>
        </div>
    )
}

export default Pitch