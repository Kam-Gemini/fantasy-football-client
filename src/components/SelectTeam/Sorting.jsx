import React from 'react'
import styles from './SelectTeam.module.css'

const Sorting = ({ sortBy, setSortBy }) => {
    return (
        <div className={styles.sortDropdown}>
            <label htmlFor="sort"></label>
            <select 
                id="sort" 
                value={sortBy} 
                onChange={(event) => {
                    const value = event.target.value
                    setSortBy(value)
                }}
            >
                <option value>Sort By...</option>
                <option value="totalPoints">Total Points</option>
                <option value="price">Price</option>
            </select>
        </div>
    )
}

export default Sorting