import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import './SearchResults.css';

function SearchResults(props) {
    return (
        <div className='SearchResults'>
            <h1 className='res'>Results</h1>
            <Tracklist
                className='searchTracks'
                list={props.trackResults} 
                isRemoval={false} 
                onAdd={props.onAdd} 
            />
        </div>
    )
}

export default SearchResults;