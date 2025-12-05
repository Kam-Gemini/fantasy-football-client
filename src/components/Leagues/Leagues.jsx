import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

import styles from '../SelectTeam/SelectTeam.module.css'

const Leagues = () => {
    const { user } = useContext(UserContext)

    return (
        <section className={styles.savedTeam}>
            <h1>Leagues Component</h1>
            <h3>Join a League</h3>
            <h4>Create new League</h4>
        </section>
    )
}

export default Leagues