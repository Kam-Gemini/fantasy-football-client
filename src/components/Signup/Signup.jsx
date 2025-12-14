import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { signup, signin } from '../../services/userService'
import { setToken } from '../../utils/auth'
import { getUserFromToken } from '../../utils/auth'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'

import '../../App.css'

// Styles
import styles from '../Signin/Signin.module.css'

export default function Signup() {
    // Context
    const { user, setUser } = useContext(UserContext)
    console.log(user)

    // State
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [errors, setErrors] = useState({})

    // Location variables
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/favouriteteam')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signup(formData)
            const data = await signin({username: formData.username, password: formData.password})
            setToken(data.token)
            // Set the global user context/state
            setUser(getUserFromToken())
            handleNavigate()
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const handleChange = (e) => {
        setErrors({ ...errors, [e.target.name]: '' })
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <section className={styles.container}>
            <div className={styles.signinform}>
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

                    {/* Password Confirmation */}
                    <div className="form-control">
                    <label htmlFor="password_confirmation">Confirm password</label>
                    <input 
                        type="password"
                        name="password_confirmation" 
                        id="password_confirmation"
                        placeholder="Re-type the password"
                        required
                        onChange={handleChange}
                    />
                    {(formData.password.length > 0 && formData.password_confirmation > 0 || formData.password !== formData.password_confirmation) &&
                        <p className='error-block'>Passwords do not match</p>
                    }
                    </div>

                    <button disabled={formData.password === '' || formData.password !== formData.password_confirmation} type="submit" className={styles.button}>Submit</button>
                </form>
            </div>
        </section>
    )
}