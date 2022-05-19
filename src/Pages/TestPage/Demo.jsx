import React from "react";
import { geolocated, geoPropTypes } from "react-geolocated";

const getDirection = (degrees, isLongitude) =>
    degrees > 0 ? (isLongitude ? "E" : "N") : isLongitude ? "W" : "S";

// adapted from http://stackoverflow.com/a/5786281/2546338
const formatDegrees = (degrees, isLongitude) =>
    `${0 | degrees}° ${
        0 | (((degrees < 0 ? (degrees = -degrees) : degrees) % 1) * 60)
    }' ${0 | (((degrees * 60) % 1) * 60)}" ${getDirection(
        degrees,
        isLongitude,
    )}`;

const DemoCore = (props) => (
    <div className="m-8 font-bold text-l">
        {!props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation.</div>
        ) : !props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled.</div>
        ) : props.coords ? (
            <div>
                You are at{" "}
                <span className="coordinate">
                    {formatDegrees(props.coords.latitude, false)}
                </span>
                ,{" "}
                <span className="coordinate">
                    {formatDegrees(props.coords.longitude, true)}
                </span>
                {props.coords.altitude ? (
                    <span>
                        , approximately {props.coords.altitude} meters above sea
                        level
                    </span>
                ) : null}
                .
            </div>
        ) : (
            <div>Getting the location data&hellip;</div>
        )}
        {!!props.positionError && (
            <div>
                <br />
                Last position error:
                <pre>{JSON.stringify(props.positionError)}</pre>
            </div>
        )}
    </div>
);

DemoCore.propTypes = { ...DemoCore.propTypes, ...geoPropTypes };

export const Demo = geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(DemoCore);