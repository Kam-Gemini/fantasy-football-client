import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useParams, useNavigate } from 'react-router'
import { teamShow, teamIndex, teamUpdate, teamDelete } from '../../services/teamService'
import { playerIndex } from '../../services/playerService'
import Pitch from './Pitch'
import Players from './Players'
import SavedTeam from './SavedTeam'
import DeleteTeam from './DeleteTeam'
import { Modal, Button } from 'react-bootstrap'

import styles from './SelectTeam.module.css'

export default function SelectTeam ({ existingTeam }) {

    // State
    const { user } = useContext(UserContext)
    const [players, setPlayers] = useState([])
    const [displayedPlayers, setDisplayedPlayers] = useState([])
    const [filterBy, setFilterBy] = useState('All')
    const [isLoading, setIsLoading] = useState(true)
    const [isSaved, setIsSaved] = useState(false)
    const [savedTeam, setSavedTeam] = useState(null)
    const listAllClubs = [...new Set(players.map(player => player.club))]
    const { team } = useParams()
    const [allTeams, setAllTeams] = useState([])
    const [currentTeam, setCurrentTeam] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false) // State for delete modal
    const navigate = useNavigate()

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

    useEffect(() => {
        console.log('isSaved changed:', isSaved)
    }, [isSaved])

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
            setSavedTeam(updatedTeam)
            setIsSaved(true)
            console.log('Team updated:', updatedTeam)
        } catch (error) {
            console.error('Error updating team:', error)
        }
    }

    const handleDelete = async () => {
        if (currentTeam) {
            setShowDeleteModal(true) // Show the delete confirmation modal
        } else {
            console.log("No team selected for deletion")
        }
    }

    const confirmDelete = async () => {
        try {
            await teamDelete(currentTeam.id)
            navigate(`/fantasyteamname`)
        } catch (error) {
            console.log("Failed to delete team", error)
        } finally {
            setShowDeleteModal(false) // Hide the modal
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
                <Pitch 
                    teamData={teamData} 
                    players={players} 
                    handleRemovePlayer={handleRemovePlayer} 
                    handleSave={handleSave} 
                    handleEdit={() => setIsSaved(false)} // Pass handleEdit function
                    handleDelete={handleDelete} // Pass handleDelete function
                    currentTeam={currentTeam} // Pass currentTeam to Pitch component
                    setTeamData={setTeamData} // Pass setTeamData to Pitch component
                    isSaved={isSaved} // Pass isSaved state to Pitch component
                />
                {isSaved ? (
                    <SavedTeam savedTeam={savedTeam} />
                ) : (
                    <Players 
                        filterBy={filterBy} 
                        setFilterBy={setFilterBy} 
                        listAllClubs={listAllClubs} 
                        isLoading={isLoading} 
                        displayedPlayers={displayedPlayers} 
                        handleAddPlayer={handleAddPlayer} 
                    />
                )}
            </section>
            {/* Delete Confirmation Modal */}
            <DeleteTeam
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
            />
        </>
    )
}