import React from 'react'

export default function UserSuggestMarker() {
  return (
    <div className='user-suggest-marker-placer'>
        <div className='user-suggest-marker-container'>
        <label for="cars">Choose a car:</label>
        <select name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
        </select>
            <button>Submit</button>
        </div>
        <svg className='user-suggest-marker-triangle'  xmlns="http://www.w3.org/2000/svg" width="80" height="69" viewBox="0 0 80 69" fill="none">
            <path d="M40 69L0.162833 -7.50412e-06L79.8372 -5.38772e-07L40 69Z" fill="#61B4D7"/>
        </svg>
    </div>
  )
}
