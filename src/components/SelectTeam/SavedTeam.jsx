import styles from './SelectTeam.module.css'

export default function SavedTeam({ savedTeam }) {
    if (!savedTeam) {
        return null; // or return a placeholder component
    }

    return (
        <section className={styles.savedTeam}>
            <h1>{savedTeam.team_name}</h1>
            <p>Total Cost: <strong>{savedTeam.total_cost}</strong></p>
            <p>Total Points: <strong>{savedTeam.total_points}</strong></p>
        </section>
    )
}