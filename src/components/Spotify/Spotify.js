const client_id = process.env.REACT_APP_API_KEY;
let redirect_uri = 'http://localhost:3000';

let accessToken;

const Spotify = {  
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = "", expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
            window.location = accessUrl;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        const resultList = fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: { Authorization: `Bearer ${accessToken}`}})
            .then((response) => {
                return response.json();
            })
            .then((jsonResponse) => {
                if (!jsonResponse.tracks) {
                    return [];
                } else {
                    return jsonResponse.tracks.items.map((track) => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }));
                }
            })
        return resultList;
    },

    async savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            return;
        }

        const key = await Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${key}`,
                         'Content-Type': 'application/json'};
        let user_id;

        return fetch('https://api.spotify.com/v1/me', {headers: {Authorization: `Bearer ${key}`}}
        ).then(response => response.json()
        ).then(jsonResponse => {
            user_id = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    name: name,
                    description: 'Web app generated playlist'
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to create playlist: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(playlist => {
                return fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        uris: trackUris
                    })
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Failed to add track to playlist: ${response.status} ${response.statusText}`);
                    }
                    console.log('Playlist saved successfully!');
                })
            })
            .catch(error => {
                console.error('Error saving playlist:', error);
            });
        });
        
    }
}

export default Spotify;