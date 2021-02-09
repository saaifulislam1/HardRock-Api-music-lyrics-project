function Searchsongs(){
    const searchText=document.getElementById('searchField').value;
   
    const url= `https://api.lyrics.ovh/suggest/${searchText}`
    console.log(url);
    fetch(url)
    .then(res=>res.json())
    .then(data=>displaySongs(data.data))
}

const displaySongs = songs=>{
    
    const songContainer=document.getElementById('song-container');
    songContainer.innerHTML='';
    const lyricsDiv= document.getElementById('song_lyrics');
    lyricsDiv.innerText='';     
    songs.forEach(song =>{
        console.log(song);
        const songDiv= document.createElement('div');
        songDiv.className='single-result row align-items-center my-3 p-3';
        songDiv.innerHTML=`
     
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead"> <span>${song.artist.name}</span></p>
              <audio controls>
                    <source src="${song.preview}" type="audio/ogg">
                 
                   </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button  onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
                   
        
        `;
        songContainer.appendChild(songDiv);
       

    } );

}

const getLyrics =async  (artist,title)=>{
    console.log(artist,title);
    const url= `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try{
        const res=await fetch (url);
        const data=await res.json();
        displayLyrics(data.lyrics)
    }
    catch(error){
        errorMessage("Sorry, We couldn't find the lyrics for you.Try again later in a few minutes!");

    }
  


}

const displayLyrics = lyrics=>{
    const lyricsDiv= document.getElementById('song_lyrics');
    console.log(lyrics);
   
    lyricsDiv.innerText=lyrics;

}

const errorMessage= error=>{
    document.getElementById('errorField').innerText=error;

}