import styles from './SelectTeam.module.css'

export default function PlayerInfo({ player }) {
    return (
        <div className={styles.playerInfoModal}>
            <div>
                <img src={player.upload_to} alt={player.name} className={styles.playerImage} />
            </div>
            <div>
                <p><strong>Position: </strong>{player.position}</p>
                <p><strong>Club: </strong>{player.club}</p>
                <p><strong>Price: </strong>{player.price}m</p>
                <p><strong>Points: </strong>{player.points}</p>
                <p><strong>Appearances: </strong>{player.appearances}</p>
                <p><strong>Goals: </strong>{player.goals}</p>
                <p><strong>Assists: </strong>{player.assists}</p>
                <p><strong>Clean Sheets: </strong>{player.cleansheets}</p>
            </div>
        </div>
    )
}