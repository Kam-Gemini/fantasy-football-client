import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { leaguePost } from '../../services/leagueService'
import { UserContext } from '../../contexts/UserContext'

// Styles
import styles from '../Signin/Signin.module.css'

export default function LeagueName() {
    // Context
    // We need to pass the context into the useContext hook, which will give us any values set to it (in this case, user & setUser)
    const { user, setUser } = useContext(UserContext)

    // State
    const [leagueData, setLeagueData] = useState({
        league_name: ''
    })
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    //console.log(formData)
    // Events
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await leaguePost(leagueData)
            navigate('/selectteam')
        } catch (error) {
            setErrors(error.response?.data || { error: 'Failed to create league' })
        }
    }

    const handleChange = (e) => {
        setErrors({ ...errors, [e.target.name]: '' })
        setLeagueData({ ...leagueData, [e.target.name]: e.target.value })
    }

    return (
        <section className={styles.container}>
            <div className={styles.signinform}>
                <h1>League Name</h1>
                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="form-control">
                        <input
                            type="text"
                            name="league_name"
                            id="league_name"
                            placeholder="Enter your league name..."
                            required
                            onChange={handleChange}
                            style={{ textAlign: 'center', fontSize: '1.25rem', fontWeight: 'bold' }}
                        />
                    </div>
                    <button onClick={() => navigate('/selectteam')} type="submit" className={styles.button}>SUBMIT</button>
                </form>
            </div>
        </section>
    )
}