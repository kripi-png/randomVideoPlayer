export class VideoPlayer {
  constructor ( iframe, jsonFile, jsonArray=null ) {
    // making sure function has everything it needs
    if ( !iframe || !iframe.startsWith('#') ) throw new Error(`Invalid iframe: ${iframe}. Use an ID (e.g. #iframe)`);
    if ( !jsonFile || !jsonFile.endsWith('.json') ) throw new Error(`Invalid json file: ${jsonFile}`);

    fetch( jsonFile, {} )
      .then( response => response.json())
      .then( data => {
        // selecting random url
        if ( jsonArray !== null ) data = data[0][jsonArray];
        const n = this.rand( 0, data.length - 1 || 0 );
        let url = data[n].url.replace( 'watch?v=', 'embed/' );
        if ( data[n].autoplay ) { url += '?autoplay=1' }
        if ( !url ) throw new Error( `Video URL properties must be named "url" in the json file (e.g. {"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ")}` );

        // selecting the player element
        const player = document.querySelector(iframe);
        if ( player.tagName !== "IFRAME" ) throw new Error( `Element provided is not an iframe; ${player.tagName.toLowerCase()} does not work.`  )
        // play the video
        player.setAttribute('src', url);
      })
      .then( ready => console.info("New player instace created.") )
      .catch( err => {
        console.error(err)
        console.error("If you are seeing this error you might want to make sure that you have named things correctly and that your .json file is valid. You can use a linter like https://jsonlint.com/");
      });
  }

  rand ( a, b ) {
    if ( a === 0 ) b += 1;
    return Math.floor( Math.random() * b ) + a;
  }
}
