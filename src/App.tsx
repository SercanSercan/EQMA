import './App.scss'
import { useEffect, useState } from "react";
import { IEarthQuakeLog } from "./utilities/interfaces.ts";
import { getEqLogs } from "./utilities/api.ts";
import { ErrorMessage, Loader } from "@fremtind/jokul";
import LatestEarthquakes from "./components/LatestEarthquakes/LatestEarthquakes.tsx";
import TopFive from "./components/TopFive/TopFive.tsx";

function App() {
    const [allEarthquakes, setAllEarthquakes] = useState<IEarthQuakeLog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                const logs = await getEqLogs();
                setAllEarthquakes(logs);
            } catch(err) {
                setIsError(true);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

  return (
    <div className="app">
        <header>
            <h1>Earthquake Monitoring App (EQMA)</h1>
        </header>
        <main>
            {loading && (
                <Loader
                    textDescription={"Fetching EQMA logs"}
                    variant={"large"}
                />
            )}
            {!loading && !isError && (
                <div className="app__cards">
                    <LatestEarthquakes allEarthquakes={allEarthquakes} />
                    <TopFive allEarthquakes={allEarthquakes} />
                </div>
            )}
            {isError && (
                <ErrorMessage fullWidth={false} dismissed={false}>
                    Our service is down 😥
                </ErrorMessage>
            )}
        </main>
        <footer>
            The Earthquake logs on this website are collected from <a href="http://www.koeri.boun.edu.tr/scripts/lst9.asp">Kandilli Observatory</a> for non-commercial purposes.
        </footer>
    </div>
  )
}

export default App
