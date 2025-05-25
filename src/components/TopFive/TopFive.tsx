import './TopFive.scss';
import { IEarthQuakeLog, ITopFive } from "../../utilities/interfaces.ts";
import { compare, parseToDate } from "../../utilities/helpers.ts";
import LogRow from "../LogRow/LogRow.tsx";

const TopFive: React.FC<ITopFive> = ({ allEarthquakes }) => {

    const allLogsSortedByMagnitude = allEarthquakes
        .sort((a, b) => compare(a.Magnitude, b.Magnitude));

    const topFiveLogs = allLogsSortedByMagnitude.slice(0, 5);

    const topFiveSortedByDate = topFiveLogs.sort((a, b) => compare(parseToDate(a.Timestamp), parseToDate(b.Timestamp)));

    return (
        <div className="topFive">
            <h2>Top 5</h2>
            {topFiveSortedByDate.map((earthquake: IEarthQuakeLog, idx) => (
                <LogRow earthquakeLog={earthquake} key={idx} />
            ))}
        </div>
    )
}

export default TopFive;