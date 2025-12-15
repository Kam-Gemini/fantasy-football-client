import { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import PlayerInfo from './PlayerInfo.jsx'
import styles from './SelectTeam.module.css'

export default function PlayerCard({ player, onInfoToggle }) {
    const [showPlayerInfo, setShowPlayerInfo] = useState(false);
    if (!player) {
        return null; // or return a placeholder component
    }

    const handlePlayerInfo = (e) => {
        // Prevent the parent button (slot) from receiving the click
        if (e && e.stopPropagation) e.stopPropagation()
        const newState = !showPlayerInfo
        setShowPlayerInfo(newState);
        if (onInfoToggle) onInfoToggle(newState);
    }

    return (
        <section className={styles.card}>
            <div className={styles.infoButton} onClick={(e) => handlePlayerInfo(e)}>i</div>
            <Modal show={showPlayerInfo} onHide={() => {setShowPlayerInfo(false); if (onInfoToggle) onInfoToggle(false);}} centered>
                <Modal.Header closeButton className={styles.infoCustomModalHeader}>
                    <Modal.Title><strong>{player.name}</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.infoCustomModalBody}>
                    <PlayerInfo player={player} />
                </Modal.Body>
            </Modal>
            <img src={player.upload_to} alt={player.name} className={styles.playerImage} />
            <section className={styles.playerInfo}>
                <p><strong>{player.name}</strong></p>
                <p>{player.position}</p>
                <p>{player.price}m</p>
            </section>
        </section>
    )
}