import React,{useState} from "react";

const TrackBooking=({patients,pending,currentToken,goBack})=>{

const [mobile,setMobile]=useState("");
const [result,setResult]=useState(null);

const search=()=>{

const p=patients.find(x=>x.mobile===mobile);
const pen=pending.find(x=>x.mobile===mobile);

setResult(p || pen);

};


return (
	<div className="track-wrapper">
		<div className="card">

			<h2>Track Booking</h2>

			<input
				placeholder="Enter Mobile"
				onChange={(e) => setMobile(e.target.value)}
			/>

			<button onClick={search}>
				Search
			</button>

			{result && (

				<div>

					<p>Token : {result.token}</p>
					<p>Status : {result.status}</p>
					<p>Current Token : {currentToken}</p>

				</div>

			)}

			<button onClick={goBack}>
				Back
			</button>

		</div>
	</div>
)

};

export default TrackBooking;