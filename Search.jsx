import React from "react";
export default (props)=>{
    return(
        <div className="Search">
            <form
             onSubmit={props.onsubmit}
             autoComplete="off"
             >
                <input
                type="text"
                className="input"
                placeholder="Search For any IP Address i.e 8.8.8.8"
                onChange={props.onchange}
                value={props.valueip}
                />
                <button type="submit" className="submit" >
                    <img src="icon-arrow.svg"  />
                </button>
          </form>

        </div>
    )   
}