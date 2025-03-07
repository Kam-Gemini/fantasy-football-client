import styles from './SelectTeam.module.css'

export default function VacantPlayer({ position }) {

    return (
        <button className={styles.playerButton}>
            <section className={styles.vacantCard}>
                <img src="/assets/default.png" alt="player" className={styles.playerImage} />
                    <section className={styles.vacantPlayerInfo}>
                        <p><strong>{position}</strong></p>
                    </section>
            </section>
        </button>     
    )
}