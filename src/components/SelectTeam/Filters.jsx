export default function ({ filterBy, setFilterBy, listAllClubs }) {
    return (
        <section id="filters">
            <select 
                name="filterBy" 
                value={filterBy} 
                onChange={(event) => {
                    const value = event.target.value
                    setFilterBy(value)
                }}
            >
                <option value="All">All Players</option>
                <option disabled>--By Position--</option>
                <option value="Goalkeepers">Goalkeepers</option>
                <option value="Defenders">Defenders</option>
                <option value="Midfielders">Midfielders</option>
                <option value="Forwards">Forwards</option>
                <option disabled>--By Club--</option>
                {listAllClubs.map((club) => (
                    <option key={club} value={club}>{club}</option>
                ))}
            </select>
        </section>
    )
}