import { ILocationLink } from "../../utilities/interfaces.ts";


const LocationLink: React.FC<ILocationLink> = ({ location, lat, lon }) => {

    const getGoogleMapsURL = (zoom = 8) => {
        return `https://www.google.com/maps/place/${lat},${lon}/@${lat},${lon},${zoom}z`;
    }

    const formatLocation = () => {
        const leftParenthesis = location.indexOf("(");
        if (leftParenthesis > -1) {
            const rightParenthesis = location.indexOf(")");
            const leftSideStr = location.substring(0, leftParenthesis).trim();
            const city = location.substring(leftParenthesis + 1, rightParenthesis).trim();
            return (
                <>
                    <strong>{city}</strong>, {leftSideStr}
                </>
            )
        } else {
            return (
                <>
                    <strong>{location}</strong>
                </>
            )
        }

    }

    return (
        <a href={getGoogleMapsURL()} target="_blank">
            {formatLocation()}
        </a>
    );
}

export default LocationLink;