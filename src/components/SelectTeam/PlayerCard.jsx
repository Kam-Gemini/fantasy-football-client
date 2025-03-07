import styles from './SelectTeam.module.css'

export default function PlayerCard({ player }) {
    if (!player) {
        return null; // or return a placeholder component
    }

    return (
        <section className={styles.card}>
            <img src={player.upload_to} alt={player.name} className={styles.playerImage} />
            <section className={styles.playerInfo}>
                <p><strong>{player.name}</strong></p>
                <p>{player.position}</p>
                <p>{player.price}m</p>
            </section>
        </section>
    )
}