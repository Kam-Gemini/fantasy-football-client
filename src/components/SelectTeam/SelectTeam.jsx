import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router'
import { removeToken } from '../../utils/auth'
import { teamShow, teamIndex, teamUpdate, teamDelete } from '../../services/teamService'
import { playerIndex } from '../../services/playerService'
import Pitch from './Pitch'
import Players from './Players'
import SavedTeam from './SavedTeam'
import DeleteTeam from './DeleteTeam'

import styles from './SelectTeam.module.css'

export default function SelectTeam ({ existingTeam }) {

    // State
    const { user, setUser } = useContext(UserContext)
    const [players, setPlayers] = useState([])
    const [displayedPlayers, setDisplayedPlayers] = useState([])
    const [filterBy, setFilterBy] = useState('All')
    const [sortBy, setSortBy] = useState('') // State for sorting criteria
    const [isLoading, setIsLoading] = useState(true)
    const [isSaved, setIsSaved] = useState(false)
    const [savedTeam, setSavedTeam] = useState(null)
    const [totalCost, setTotalCost] = useState(0)
    const [costExceeded, setCostExceeded] = useState(false)
    const listAllClubs = [...new Set(players.map(player => player.club))]
    const [allTeams, setAllTeams] = useState([])
    const [currentTeam, setCurrentTeam] = useState(null)
    const [pickedPlayers, setPickedPlayers] = useState([])
    const [showDeleteModal, setShowDeleteModal] = useState(false) // State for delete modal
    const navigate = useNavigate()

    const signOut = () => {
        removeToken()
        setUser(null)
        navigate('/')
    }

    const initializeTeamData = (team) => {
        return {
            goalkeeper: team.goalkeeper?.id || null,
            defenders: team.defenders && team.defenders.length === 4 ? team.defenders.map(defender => defender?.id || null) : [null, null, null, null],
            midfielders: team.midfielders && team.midfielders.length === 3 ? team.midfielders.map(midfielder => midfielder?.id || null) : [null, null, null],
            forwards: team.forwards && team.forwards.length === 3 ? team.forwards.map(forward => forward?.id || null) : [null, null, null],
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

        // Sort players based on the selected sorting criteria
        if (sortBy === 'totalPoints') {
            console.log('sort by points')
            results.sort((a, b) => b.points - a.points)
        } else if (sortBy === 'price') {
            console.log('sort by price')
            results.sort((b, a) => a.price - b.price)
        }

        setDisplayedPlayers(results)

    }, [filterBy, players, sortBy])

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
            } else {
                console.log("No team found for user")
            }
        }
    }, [allTeams, user.id])

    useEffect(() => {
        if (existingTeam) {
            setTeamData(initializeTeamData(existingTeam))
        }
    }, [existingTeam])

    useEffect(() => {
        const total = calculateTotalCost()
        setTotalCost(total)
        setCostExceeded(total > 100)
    }, [teamData, players])

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
            const updatedTeam = await teamUpdate(currentTeam.id, teamData)
            setSavedTeam(updatedTeam)
            setIsSaved(true)
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

    const calculateTotalCost = () => {
        const playerIds = [
            teamData.goalkeeper,
            ...teamData.defenders,
            ...teamData.midfielders,
            ...teamData.forwards
        ].filter(id => id !== null)

        console.log('playerIds:', playerIds)

        const totalCost = playerIds.reduce((total, id) => {
            const player = players.find(player => player.id === id)
            console.log('player:', player)
            return total + (player ? parseFloat(player.price) : 0)
        }, 0)

        console.log('totalCost:', totalCost)
        return totalCost
    }

    return (
        <>
            <section className={styles.header}>
                <div className={styles.imageContainer}>
                    <img src="/assets/MainGraphic.jpeg" alt="player kicking ball"/>
                </div>
                <div className={styles.textContainer}>
                    <h1>Fantasy Football</h1>
                    <p>Create your own team...</p>
                    <h2>Total Cost: {totalCost}m</h2>
                    {costExceeded && <p className={styles.error}>You cannot spend more than 100m</p>}
                </div>
                <div className={styles.signOut}>
                    <button onClick={signOut}>Sign out</button>
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
                    pickedPlayers={pickedPlayers}
                />
                {isSaved || existingTeam ? (
                    <SavedTeam savedTeam={savedTeam} />
                ) : (
                    <Players 
                        filterBy={filterBy} 
                        setFilterBy={setFilterBy}
                        sortBy={sortBy}
                        setSortBy={setSortBy} 
                        listAllClubs={listAllClubs} 
                        isLoading={isLoading} 
                        displayedPlayers={displayedPlayers} 
                        handleAddPlayer={handleAddPlayer}
                        pickedPlayers={pickedPlayers}
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