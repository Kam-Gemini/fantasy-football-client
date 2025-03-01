import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { signup } from '../../services/userService'
import { setToken } from '../../utils/auth'
import { getUserFromToken } from '../../utils/auth'

import { UserContext } from '../../contexts/UserContext'

import { NavHistoryContext } from '../../contexts/NavHistoryContext'
import '../../App.css'

// Styles
import styles from './Signup.module.css'
//import styled from 'styled-components'

export default function Signup() {
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

    const { history } = useContext(NavHistoryContext);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/favouriteteam')
    }

    //console.log(formData)
    // Events
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await signup(formData)
            setToken(data.token)
            // Set the global user context/state
            setUser(getUserFromToken())
            // Navigate to posts page
            console.log(`HISTORY ${history}`)
            handleNavigate()

        } catch (error) {
            setErrors(error.response.data.errors)
        }
    }

    const handleChange = (e) => {
        console.dir(e.target)
        setErrors({ ...errors, [e.target.name]: '' })
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <section className={styles.container}>
            <section className={styles.image}></section>
            <h1>Sign up</h1>

            <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter a username"
                        required
                        onChange={handleChange}
                    />
                    {errors.username && <p className='error-message'>{errors.username}</p>}
                </div>

                {/* Email */}
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter an email address"
                        required
                        onChange={handleChange}
                    />
                    {errors.email && <p className='error-message'>{errors.email}</p>}
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
                <button disabled={formData.password === ''
                    //</form>|| formData.password !== formData.confirmPassword
                } type="submit" className='button'>Submit</button>
            </form>
        </section>
    )
}