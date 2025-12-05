import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router'
import { removeToken } from '../../utils/auth'

export default function Leagues() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    return (
        <>
            <h1>Leagues Component</h1>
        </>
    )
}