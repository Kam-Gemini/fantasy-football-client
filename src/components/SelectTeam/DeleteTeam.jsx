import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import styles from './SelectTeam.module.css'

const DeleteTeam = ({ show, onHide, onConfirm }) => {
    return (
        <Modal show={show} onHide={onHide} centered className={styles.customModal}>
            <Modal.Header closeButton className={styles.customModalHeader}>
                <Modal.Title className={styles.customModalHeader}>Delete Team</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.customModalBody}>
                Are you sure you want to delete this team?
            </Modal.Body>
            <Modal.Footer className={styles.customModalFooter}>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteTeam