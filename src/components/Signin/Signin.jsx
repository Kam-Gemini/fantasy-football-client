import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { signin } from '../../services/userService'
import { setToken } from '../../utils/auth'
import { getUserFromToken } from '../../utils/auth'
// import { Button } from 'react-bootstrap'
import { UserContext } from '../../contexts/UserContext'

import { NavHistoryContext } from '../../contexts/NavHistoryContext'

// Styles
import styles from './Signin.module.css'

export default function Signin() {
    // Context
    // We need to pass the context into the useContext hook, which will give us any values set to it (in this case, user & setUser)
    const { setUser } = useContext(UserContext)

    // State
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})

    // Location variables

    // const location = useLocation();
    // const fromPage = location.state?.from || "unknown"

    const { history } = useContext(NavHistoryContext);
    const navigate = useNavigate();

    const handleNavigate = () => {
        console.log("HANDLE NAVIGATE")
        const targetIndex = history.length - 2
        if (history[targetIndex] === '/') {
            console.log('IF')
            navigate('/')
            // navigate('/')
        }
        else {
            console.log('ELSE')
            navigate(-2)
        }
    }

    //console.log(formData)
    // Events
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await signin(formData)
            setToken(data.token)
            // Set the global user context/state
            setUser(getUserFromToken())
            // Navigate to posts page
            // navigate(fromPage !== "unknown" ? fromPage : "/")
            //  navigate(-2)
            console.log(`HISTORY ${history}`)
            handleNavigate()
        } catch (error) {
            //   setErrors(error.response.data.errors)
            setErrors(error.message)
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
                    {errors.identifier && <p className='error-message'>{errors.identifier}</p>}
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
                    {errors.password && <p className='error-message'>{errors.password}</p>}
                </div>


                {/* <button disabled={formData.password === ''  */}
                {/* //</form>|| formData.password !== formData.confirmPassword
            // } type="submit" className='button'>Submit</button> */}

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