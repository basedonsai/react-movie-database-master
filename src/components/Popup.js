import React from 'react'

function Popup({ selected, closePopup }) {
	return (
		<section className="popup" style={{zoom:'50px'}}>
			<div className="content" style={{maxWidth:'550px',minHeight:'60vh'}}>
				<h2>{ selected.Title } <span>({ selected.Year })</span></h2>
				<p className="rating">Rating: {selected.imdbRating}</p>
				<div className="plot">
					<img src={selected.Poster} />
					<p>{selected.Plot}</p>
				</div>
				<button className="close" onClick={closePopup}>Close</button>
			</div>
		</section>
	)
}

export default Popup
