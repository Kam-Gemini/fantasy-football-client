import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { signin } from '../../services/userService'
import { teamIndex } from '../../services/teamService'
import { setToken } from '../../utils/auth'
import { getUserFromToken } from '../../utils/auth'
import { UserContext } from '../../contexts/UserContext'

// Styles
import styles from './Signin.module.css'

export default function Signin() {
    // Context
    // We need to pass the context into the useContext hook, which will give us any values set to it (in this case, user & setUser)
    const { user, setUser } = useContext(UserContext)
    const [allTeams, setAllTeams] = useState([])

    // State
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const handleNavigate = (existingTeam) => {
        user.favourite_team && existingTeam ? navigate('/selectteam') : user.favourite_team ? navigate('/fantasyteamname') : navigate('/favouriteteam')
    }

    useEffect(() => {
        teamIndex()
            .then(data => {
                setAllTeams(data)
            })
            .catch(err => console.log(err))
    }, [])

    

    //console.log(formData)
    // Events
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await signin(formData)
            setToken(data.token)
            setUser(getUserFromToken())
            const existingTeam = allTeams.find(team => team.user === user.id)
            handleNavigate(existingTeam)
        } catch (error) {
            setErrors(error.response.data)
            console.log('Error Object Detail', error.response.data)
        }
    }

    const handleChange = (e) => {
        //console.dir(e.target)
        setErrors({ ...errors, [e.target.name]: '' })
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <section className={styles.container}>
            <section className={styles.image}></section>
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter your username"
                        required
                        onChange={handleChange}
                    />
                </div>

                {/* Password */}
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        required
                        onChange={handleChange}
                    />
                    {errors.detail && <p className='error-block'>{errors.detail}</p>}

                </div>

                <button
                    disabled={!formData.password}
                    type="submit"
                    className="button"
                >
                    Submit
                </button>
            </form>
            <button onClick={() => navigate('/signup')} className={styles.button}>Don't have an account yet? Sign up here!</button>
        </section>
    )
}