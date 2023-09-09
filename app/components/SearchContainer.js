import { useState, useEffect } from 'react'
import React from 'react'
 
export default function SearchContainer() {

    let [searchBoxClasses, setSearchBoxClasses] = 'search-box';
    function handleFocus(){
        setSearchBoxClasses('search-box up');
        console.log('up');
    }

    function handleBlur(){
        setSearchBoxClasses('search-box down');
        console.log('down');
    }

    return (
        <div className='search-container-placer'>
            <div className='search-container'>
                <div className='search-icon'></div>
                <div>
                    Destinations
                </div>
                <div>
                Nearest Bathroom
                Your mom's house
                Kilgo
                Bella Union
                </div>
                <input onFocus={handleFocus} onBlur={handleBlur} type="text" placeholder='Search' className='search-box'/>
                {/*<div className='search-box'>Search</div>*/}
            </div>
        </div>
      
    )
    }