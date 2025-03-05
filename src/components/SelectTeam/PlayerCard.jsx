import styles from './SelectTeam.module.css'
import { Link } from 'react-router'

const Image_URL = import.meta.env.VITE_API_URL

export default function PlayerCard({ player }) {
    if (!player) {
        return null; // or return a placeholder component
    }

    return (
        <section className={styles.card}>
            <img src={Image_URL + player.upload_to} alt={player.name} className={styles.playerImage} />
            <section className={styles.playerInfo}>
                <p><strong>{player.name}</strong></p>
                <p>{player.position}</p>
                <p>{player.price}m</p>
            </section>
        </section>
    )
}