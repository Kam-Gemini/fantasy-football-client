import styles from './SelectTeam.module.css'

export default function VacantPlayer({ position }) {

    return (
        <section className={styles.vacantCard}>
            <img src="/assets/default.jpg" alt="player" className={styles.playerImage} />
                <section className={styles.vacantPlayerInfo}>
                    <p><strong>{position}</strong></p>
                </section>
        </section>
              
    )
}