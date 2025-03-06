import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { updateProfile } from '../../services/userService'
import { useNavigate } from 'react-router'
import styles from './FavouriteTeam.module.css'

export default function FavouriteTeam() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleTeamSelect = async (e) => {
        const favourite_team = e.currentTarget.value
        try {
            const updatedUser = await updateProfile({ favourite_team })
            setUser(updatedUser)
            navigate('/fantasyteamname')
        } catch (error) {
            console.error('Error updating profile:')
        }
    }

    return (
        <>
            <section className={styles.teams}>
                <h1 className={styles.heading}>Select Your Favourite Team!</h1>
                <div className={styles.crestContainer}>
                    <button value="Arsenal" onClick={handleTeamSelect}>
                        <img src="/assets/Arsenal.png" alt="Arsenal" />
                    </button>
                    <button value="Aston Villa" onClick={handleTeamSelect}>
                        <img src="/assets/AstonVilla.png" alt="Aston Villa" />
                    </button>
                    <button value="Bournemouth" onClick={handleTeamSelect}>
                        <img src="/assets/Bournemouth.png" alt="Bournemouth" />
                    </button>
                    <button value="Brentford" onClick={handleTeamSelect}>
                        <img src="/assets/Brentford.png" alt="Brentford" />
                    </button>
                    <button value="Brighton" onClick={handleTeamSelect}>
                        <img src="/assets/Brighton.png" alt="Brighton & Hove Albion" />
                    </button>
                    <button value="Chelsea" onClick={handleTeamSelect}>
                        <img src="/assets/Chelsea.png" alt="Chelsea" />
                    </button>
                    <button value="Crystal Palace" onClick={handleTeamSelect}>
                        <img src="/assets/CrystalPalace.png" alt="Crystal Palace" />
                    </button>
                    <button value="Everton" onClick={handleTeamSelect}>
                        <img src="/assets/Everton.png" alt="Everton" />
                    </button>
                    <button value="Nottingham Forest" onClick={handleTeamSelect}>
                        <img src="/assets/NottinghamForest.png" alt="Nottingham Forest" />
                    </button>
                    <button value="Fulham" onClick={handleTeamSelect}>
                        <img src="/assets/Fulham.png" alt="Fulham" />
                    </button>
                    <button value="Ipswich Town" onClick={handleTeamSelect}>
                        <img src="/assets/Ipswich.png" alt="Ipswich Town" />
                    </button>
                    <button value="Leicester" onClick={handleTeamSelect}>
                        <img src="/assets/Leicester.png" alt="Leicester" />
                    </button>
                    <button value="Liverpool" onClick={handleTeamSelect}>
                        <img src="/assets/Liverpool.png" alt="Liverpool" />
                    </button>
                    <button value="Man City" onClick={handleTeamSelect}>
                        <img src="/assets/ManCity.png" alt="Man City" />
                    </button>
                    <button value="Man United" onClick={handleTeamSelect}>
                        <img src="/assets/ManUtd.png" alt="Man United" />
                    </button>
                    <button value="Newcastle" onClick={handleTeamSelect}>
                        <img src="/assets/Newcastle.png" alt="Newcastle" />
                    </button>
                    <button value="Southampton" onClick={handleTeamSelect}>
                        <img src="/assets/Saints.png" alt="Southampton" />
                    </button>
                    <button value="Spurs" onClick={handleTeamSelect}>
                        <img src="/assets/Spurs.png" alt="Spurs" />
                    </button>
                    <button value="West Ham" onClick={handleTeamSelect}>
                        <img src="/assets/WestHam.png" alt="West Ham" />
                    </button>
                    <button value="Wolves" onClick={handleTeamSelect}>
                        <img src="/assets/Wolves.png" alt="Wolves" />
                    </button>
                </div>
            </section>
        </>
    )
}