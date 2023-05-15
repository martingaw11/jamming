import React, {useCallback} from 'react';
import './Track.css';

function Track(props) {
    const addTrack = useCallback((event) => {
        props.onAdd(props.track);
    }, [props])

    const removeTrack = useCallback((event) => {
        props.onRemove(props.track);
    }, [props])

    function render() {
        if (props.isRemoval) {
            return <button onClick={removeTrack}>-</button>
        } else {
            return <button onClick={addTrack}>+</button>
        }
    }

    return (
        <div className='Track'>
            <div className='info'>
                <h2>{props.track.name}</h2>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            <div className='button'>
                {render()}
            </div>
            
        </div>
    )
}

export default Track;