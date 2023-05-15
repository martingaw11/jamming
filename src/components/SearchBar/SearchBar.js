import React from 'react';
import './SearchBar.css';

function SearchBar(props) {
    const search = () => {
        const term = document.getElementById('for-search').value;
        props.onSearch(term);
    }

    return (
        <div className='SearchBar'>
            <input 
                id='for-search' 
                type='text' 
                placeholder='Search for songs here...' 
                required
            />
            <a href='#playlist-lab'>
                <button type='submit' onClick={search}>Search</button>
            </a>
        </div>
    );
}

export default SearchBar;