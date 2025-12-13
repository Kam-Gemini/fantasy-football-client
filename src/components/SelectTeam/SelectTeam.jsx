import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router'
import { removeToken } from '../../utils/auth'
import { teamShow, teamIndex, teamUpdate, teamDelete } from '../../services/teamService'
import { playerIndex } from '../../services/playerService'
import { leagueIndex } from '../../services/leagueService'
import Pitch from './Pitch'
import Players from './Players'
import SavedTeam from './SavedTeam'
import DeleteTeam from './DeleteTeam'
import Leagues from '../Leagues/Leagues'

import styles from './SelectTeam.module.css'

export default function SelectTeam ({ existingTeam }) {

    // State
    const { user, setUser } = useContext(UserContext)
    const [players, setPlayers] = useState([])
    const [displayedPlayers, setDisplayedPlayers] = useState([])
    const [filterBy, setFilterBy] = useState('All')
    const [sortBy, setSortBy] = useState('') // State for sorting criteria
    const [isLoading, setIsLoading] = useState(true)
    const [isSaved, setIsSaved] = useState(true)
    const [showLeagues, setShowLeagues] = useState(false)
    const [savedTeam, setSavedTeam] = useState(true)
    const [totalCost, setTotalCost] = useState(0)
    const [totalPoints, setTotalPoints] = useState(0)
    const [costExceeded, setCostExceeded] = useState(false)
    const listAllClubs = [...new Set(players.map(player => player.club))]
    const [allTeams, setAllTeams] = useState([])
    const [currentTeam, setCurrentTeam] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false) // State for delete modal
    const [allLeagues, setAllLeagues] = useState([])

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

    // Derive pickedPlayers from teamData
    const pickedPlayers = [
        teamData.goalkeeper,
        ...teamData.defenders,
        ...teamData.midfielders,
        ...teamData.forwards,
    ].filter(playerId => playerId !== null)

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

        if (sortBy === 'totalPoints') {
            results.sort((a, b) => b.points - a.points)
        } else if (sortBy === 'price') {
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
        const points = calculateTotalPoints()
        setTotalPoints(points)
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

    const handleEdit = () => {
        setIsSaved(false)
        setShowLeagues(false)
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

        const totalCost = playerIds.reduce((total, id) => {
            const player = players.find(player => player.id === id)
            return total + (player ? parseFloat(player.price) : 0)
        }, 0)

        return totalCost
    }

    const calculateTotalPoints = () => {
        const playerIds = [
            teamData.goalkeeper,
            ...teamData.defenders,
            ...teamData.midfielders,
            ...teamData.forwards
        ].filter(id => id !== null)

        const totalPoints = playerIds.reduce((total, id) => {
            const player = players.find(player => player.id === id)
            return total + (player ? parseFloat(player.points) : 0)
        }, 0)

        return totalPoints
    }

    useEffect(() => {
        leagueIndex()
            .then(data => {
                setAllLeagues(data)
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }, [])

    const league = () => {
        setShowLeagues(true)
        setIsSaved(true)
    }

    const home = () => {
        setIsSaved(true)
        setShowLeagues(false)
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
                    <h2>Total Points: {totalPoints}</h2>
                    {costExceeded && <p className={styles.error}>You cannot spend more than 100m</p>}
                </div>
                <div className={styles.signOut}>
                    <div className={styles.navLinks}>
                        <a href="#" onClick={home}>My Team</a>
                        <a href="#" onClick={handleEdit}>Transfers</a>
                        <a href="#" onClick={league}>Leagues</a>
                        <a href="#" onClick={signOut}>Sign out</a>
                    </div>
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
                    isSaved={isSaved} // Pass isSaved state to Pitch component
                    pickedPlayers={pickedPlayers}
                    costExceeded={costExceeded}
                />
                {showLeagues ? (
                    <Leagues allLeagues={allLeagues}/>
                ) : isSaved || existingTeam && !showLeagues ? (
                    <SavedTeam savedTeam={savedTeam} totalCost={totalCost} totalPoints={totalPoints}/>
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