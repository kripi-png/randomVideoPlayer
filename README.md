Selects a random video from a .json and plays it. Can handle multiple instances on the same site.

<h2>How to use</h2>

1. Clone / download the repository and put the player.js in the /scripts/ folder somewhere on your website
2. add this to your page's html file
```html
<script type="text/javascript">
  import('path/to/player.js')
    .then(m => {
    });
</script>
```
3. For each video, create an iframe element. If you want to enable autoplay, add `allow='autoplay'` to the iframe.
```html
<iframe id="video" width="800" height="600"></iframe>
```

4. For each video / iframe, add following to the script tags you created earlier
```js
const name = new m.VideoPlayer( id, 'path/to/.json/' )
```

5. Now your html file should look like this
```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Random Video Player</title>
    <script type="text/javascript">
      import('./scripts/player.js')
      .then(m => {
        const videoplayer1 = new m.VideoPlayer( '#video1', './videos.json' );
      });
    </script>
  </head>
  <body>
    <div class="videoHolder">
      <iframe id="video1" width="800" height="600" allow='autoplay'></iframe>
    </div>
  </body>
</html>
```

6. If you use the default videos.json file, you should be ready to go; just add your videos to the json.
    -   **Note that the video links must have either /watch?v= or /embed/ in them**.
    
        e.g. If your link looks like this, it won't work: https://youtu.be/dQw4w9WgXcQ
        
    -   **Also note that you must not have ?autoplay=1 (?autoplay=0) in your links; add "autoplay": true to your json objects instead (check the default json file for an example)**
        
        
7. If you want to use your own json file, make sure it looks like either of following examples:

    a) simple json list with links
    ```json
    [
      { "url": "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "autoplay": true }
    ]
    ```

    b) json object with a link list
    ```json
    [{
      "videos": [
        { "url": "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "autoplay": true }
      ]
    }]
    ```

8. If you decided to go with the b) example, **add 'videos' to the VideoPlayer constructor (step 4)**
    
    It should look like this:
    ```js
    const name = new m.VideoPlayer( id, 'path/to/.json/', 'videos' )
    ```
