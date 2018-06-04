

Firebase description
-

```
{
    /artists/{artistId} : {
        id: string;
        name: string;
        releaseIds: {
            [releaseId]: string;
        };
    }
  
    /releases/{releaseId} : {
        id: string;
        name: string;
        artistIds: {
            [artistId]: string;
        };
        tracks: {
            [trackId]: {
                id: string;
                artistIds: {
                    [artistId]: string;
                };
            };
        }
    }
}
```