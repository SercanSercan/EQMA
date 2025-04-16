import './TopFive.scss';
import { IEarthQuakeLog, ITopFive } from "../../utilities/interfaces.ts";
import { compare } from "../../utilities/helpers.ts";
import LogRow from "../LogRow/LogRow.tsx";

const TopFive: React.FC<ITopFive> = ({ allEarthquakes }) => {

    const sorted = allEarthquakes
        .sort((a, b) => compare(a.Magnitude, b.Magnitude));

    return (
        <div className="topFive">
            <h2>Top 5</h2>
            {sorted.slice(0, 5).map((earthquake: IEarthQuakeLog, idx) => (
                <LogRow earthquakeLog={earthquake} key={idx} />
            ))}
        </div>
    )
}

export default TopFive;