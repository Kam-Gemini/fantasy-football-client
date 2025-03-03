import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { signin } from '../../services/userService'
import { setToken } from '../../utils/auth'
import { getUserFromToken } from '../../utils/auth'
import { UserContext } from '../../contexts/UserContext'

// Styles
import styles from './Signin.module.css'

export default function Signin() {
    // Context
    // We need to pass the context into the useContext hook, which will give us any values set to it (in this case, user & setUser)
    const { user, setUser } = useContext(UserContext)

    // State
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const handleNavigate = () => {
        user.favourite_team ? navigate('/fantasyteamname') : navigate('/favouriteteam')
    }

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
                        placeholder="Enter a password"
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