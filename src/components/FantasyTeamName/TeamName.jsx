import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { signin } from '../../services/userService'
import { setToken } from '../../utils/auth'
import { getUserFromToken } from '../../utils/auth'
import { UserContext } from '../../contexts/UserContext'

// Styles
import styles from '../Signin/Signin.module.css'

export default function FantasyTeamName() {
    // Context
    // We need to pass the context into the useContext hook, which will give us any values set to it (in this case, user & setUser)
    const { user, setUser } = useContext(UserContext)

    // State
    const [formData, setFormData] = useState({
        team_name: ''
    })
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    //console.log(formData)
    // Events
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await signin(formData)
            setToken(data.token)
            setUser(getUserFromToken())
            handleNavigate()
        } catch (error) {
            setErrors(error.response.data)
            console.log('Error Object Detail', error.response.data.detail)
        }
    }

    const handleChange = (e) => {
        //console.dir(e.target)
        setErrors({ ...errors, [e.target.name]: '' })
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <section className={styles.container}>
            <h1>Fantasy Team Name</h1>
            <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className="form-control">
                    <input
                        type="text"
                        name="team_name"
                        id="team_name"
                        placeholder="Enter your team name..."
                        required
                        onChange={handleChange}
                    />
                </div>

                <button onClick={() => navigate('/')} disabled={!formData.team_name} type="submit" className={styles.button}>Submit</button>
            </form>
        </section>
    )
}