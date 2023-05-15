import React, {useCallback} from 'react';
import Tracklist from '../Tracklist/Tracklist';  
import './Playlist.css' 

function Playlist(props) {
    const updateName = useCallback((event) => {
        props.onChange(event.target.value);
    }, [props]);
    
    return (
        <div className='Playlist'>
            <input 
                id='typeName'
                type='text' 
                placeholder='Rad New Playlist' 
                onChange={updateName} 
                required
            />
            <Tracklist 
                className='Tracklist'
                list={props.playlist} 
                isRemoval={true} 
                onRemove={props.onRemove}
            />
            <button 
                className='save'
                type='submit' 
                onClick={props.onSubmit} >Save Playlist</button>
        </div>
    )
}

export default Playlist;