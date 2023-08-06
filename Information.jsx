import React from "react";
export default (props)=>{
    return(

        <div className="information">
            <div className="ip-address">
                <h3>IP Address</h3>
                <p>{props.IP}</p>
            </div>
            <div className="isp">
                <h3>Type</h3>
                <p>{props.InternetType}</p>
            </div>
            <div className="location">
                <h3>Location</h3>
                <p>{props.Locationcity},{props.Locationcountry}</p>
            </div>
            <div className="timezone">
                <h3>Local-Time</h3>
                <p>{props.TimeZone}</p>
            </div>
        </div>
    )
}