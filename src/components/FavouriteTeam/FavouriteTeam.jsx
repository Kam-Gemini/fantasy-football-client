// Styles
import styles from './FavouriteTeam.module.css'


export default function FavouriteTeam() {
    return (
        <>
            <section className={styles.teams}>
                <h1 className={styles.heading}>Select Your Favourite Team!</h1>
                <div className={styles.crestContainer}>
                    <button id="Arsenal">
                        <img src="/assets/Arsenal.png" alt="Arsenal" />
                    </button>
                    <button id="AstonVilla">
                        <img src="/assets/AstonVilla.png" alt="Aston Villa" />
                    </button>
                    <button id="Bournemouth">
                        <img src="/assets/Bournemouth.png" alt="Bournemouth" />
                    </button>
                    <button id="Brentford">
                        <img src="/assets/Brentford.png" alt="Brentford" />
                    </button>
                    <button id="Brighton">
                        <img src="/assets/Brighton.png" alt="Brighton & Hove Albion" />
                    </button>
                    <button id="Chelsea">
                        <img src="/assets/Chelsea.png" alt="Chelsea" />
                    </button>
                    <button id="CrystalPalace">
                        <img src="/assets/CrystalPalace.png" alt="Crystal Palace" />
                    </button>
                    <button id="Everton">
                        <img src="/assets/Everton.png" alt="Everton" />
                    </button>
                    <button id="Forest">
                        <img src="/assets/Forest.png" alt="Nottingham Forest" />
                    </button>
                    <button id="Fulham">
                        <img src="/assets/Fulham.png" alt="Fulham" />
                    </button>
                    <button id="Ipswich">
                        <img src="/assets/Ipswich.png" alt="Ipswich Town" />
                    </button>
                    <button id="Leicester">
                        <img src="/assets/Leicester.png" alt="Leicester" />
                    </button>
                    <button id="Liverpool">
                        <img src="/assets/Liverpool.png" alt="Liverpool" />
                    </button>
                    <button id="ManCity">
                        <img src="/assets/ManCity.png" alt="Man City" />
                    </button>
                    <button id="ManUtd">
                        <img src="/assets/ManUtd.png" alt="Man United" />
                    </button>
                    <button id="Newcastle">
                        <img src="/assets/Newcastle.png" alt="Newcastle" />
                    </button>
                    <button id="Southampton">
                        <img src="/assets/Saints.png" alt="Southampton" />
                    </button>
                    <button id="Spurs">
                        <img src="/assets/Spurs.png" alt="Spurs" />
                    </button>
                    <button id="WestHam">
                        <img src="/assets/WestHam.png" alt="West Ham" />
                    </button>
                    <button id="Wolves">
                        <img src="/assets/Wolves.png" alt="Wolves" />
                    </button>
                </div>
            </section>
        </>
    )
}