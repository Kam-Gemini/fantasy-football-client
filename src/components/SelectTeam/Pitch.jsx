import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { teamDelete } from '../../services/teamService'
import PlayerCard from './PlayerCard'
import VacantPlayer from './VacantPlayer'
import styles from './SelectTeam.module.css'

const Pitch = ({ teamData, players, handleRemovePlayer, handleSave, handleEdit, handleDelete, currentTeam, setTeamData, isSaved }) => {
    const [initialTeamData, setInitialTeamData] = useState(teamData)
    const navigate = useNavigate()

    useEffect(() => {
        setInitialTeamData(teamData)
    }, [teamData])

    const handleSaveClick = (e) => {
        handleSave(e)
    }

    return (
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
                {isSaved ? (
                    <>
                        <button onClick={handleEdit} className={styles.saveButton}>UPDATE</button>
                        <button onClick={handleDelete} className={styles.deleteButton}>DELETE</button>
                    </>
                ) : (
                    <button onClick={handleSaveClick} className={styles.saveButton}>SAVE</button>
                )}
            </div>
        </div>
    )
}

export default Pitch