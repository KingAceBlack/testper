/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { pinata } from 'frog/hubs'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
   hub: pinata(),
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'





let expirationTimeRem = new Date(Date.now() + 60000);



let progressMarker = {
  previousFrame: '/intro',
  expTime: expirationTimeRem.setHours(expirationTimeRem.getHours() + 2),
  
 
};





console.log('Time remaining is from table is :',progressMarker.expTime);
const timeDifference = expirationTimeRem.getTime() - Date.now();
console.log('Time unfiltered :',timeDifference);

const hoursRemaining = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutesRemaining = Math.floor((timeDifference / 1000 / 60) % 60);
    const secondsRemaining = Math.floor((timeDifference / 1000) % 60);

// Format the remaining time as a string
const expirationTimeString = `${hoursRemaining.toString().padStart(2, '0')}:${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;


//console.log('Time refined :',expirationTimeString);
type FarcasterID = string;
type CurrentFrame = string;







let farcasterid: FarcasterID = 'oexcess';
let currentframe: CurrentFrame = 'level4';

interface DataItem {
  fid: string;
  lastknownframe: string;
  health: number; // Assuming 'health' is a number, adjust type if necessary
  // Add other properties if there are any
}

async function addData(farcasterid: FarcasterID, currentframe: CurrentFrame) {
  const url = 'https://gpzytjchmkcglwzkxcrc.supabase.co/rest/v1/warpcastertest'; // Ensure this is the correct endpoint

  const data = {
    fid: farcasterid,
    lastknownframe: currentframe,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwenl0amNobWtjZ2x3emt4Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NDEyNzMsImV4cCI6MjAyMzUxNzI3M30.pX9wyf_-ctCHCk0cz-gpsEg9HP-mer9A3_1m-DjSOvA', // Replace 'your_api_key_here' with your actual API key
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwenl0amNobWtjZ2x3emt4Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NDEyNzMsImV4cCI6MjAyMzUxNzI3M30.pX9wyf_-ctCHCk0cz-gpsEg9HP-mer9A3_1m-DjSOvA' // Replace 'your_token_here' with your actual token
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update data');
    }

    const responseText = await response.text();
    const responseData = responseText ? JSON.parse(responseText) : null;

    console.log('Data updated successfully:', responseData);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error updating data:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Function to fetch data
async function fetchData(): Promise<DataItem[]> {
  const url = 'https://gpzytjchmkcglwzkxcrc.supabase.co/rest/v1/warpcastertest'; // Ensure this is the correct endpoint

  const response = await fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwenl0amNobWtjZ2x3emt4Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NDEyNzMsImV4cCI6MjAyMzUxNzI3M30.pX9wyf_-ctCHCk0cz-gpsEg9HP-mer9A3_1m-DjSOvA', // Replace 'your_api_key_here' with your actual API key
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwenl0amNobWtjZ2x3emt4Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NDEyNzMsImV4cCI6MjAyMzUxNzI3M30.pX9wyf_-ctCHCk0cz-gpsEg9HP-mer9A3_1m-DjSOvA' // Replace 'your_token_here' with your actual token
      },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return await response.json();
}




/*fetchData()
  .then((data: DataItem[]) => {
    const firstItem = data[0];
    console.log('First item:', firstItem);

    const item = data.find((item: DataItem) => item.fid === farcasterid);

    if (item) {
      // Update Health with the score of the found item
      let Health = item.health;
      console.log('Farcaster health:', Health);

      let lastFrame = item.lastknownframe;
      progressMarker = { ...progressMarker, previousFrame: lastFrame };
    } else {
      console.log('Item not found for the specified farcasterid');
      addData(farcasterid, currentframe)
        .then(() => {
          console.log('Data added successfully');
        })
        .catch((error) => {
          if (error instanceof Error) {
            console.error('Error adding data:', error.message);
          } else {
            console.error('Unexpected error:', error);
          }
        });
    }
  })
  .catch((error) => {
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  });*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




async function updateData(farcasterid: FarcasterID, currentframe: CurrentFrame) {
  // Construct the URL using template literals
  const url = `https://gpzytjchmkcglwzkxcrc.supabase.co/rest/v1/warpcastertest?fid=eq.${farcasterid}`;
   console.log(url);
  const data = {
    //fid : farcasterid,
    lastknownframe: currentframe,
  };

  try {
    const response = await fetch(url, {
      method: 'PATCH', // Use PATCH method for updating
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwenl0amNobWtjZ2x3emt4Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NDEyNzMsImV4cCI6MjAyMzUxNzI3M30.pX9wyf_-ctCHCk0cz-gpsEg9HP-mer9A3_1m-DjSOvA', // Replace with your actual API key
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwenl0amNobWtjZ2x3emt4Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NDEyNzMsImV4cCI6MjAyMzUxNzI3M30.pX9wyf_-ctCHCk0cz-gpsEg9HP-mer9A3_1m-DjSOvA' // Replace with your actual token
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to update data');
    }

    // Check if the response body is empty before attempting to parse it as JSON
    const responseText = await response.text();
    const responseData = responseText ? JSON.parse(responseText) : null;

    console.log('Data updated successfully:', responseData);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error updating data:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}



//const farcasterid = 'fxctth';
//const currentframe = 'level3';

/*updateData(farcasterid, currentframe)
  .then(() => {
    console.log('Data updated successfully');
  })
  .catch((error) => {
    console.error('Error updating data:', error.message);
  });*/
























////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//let farcasterid: FarcasterID = 'oexcess';

app.frame('/', async (c) => {
  const { buttonValue, inputText, status, frameData, verified } = c;

  //console.log('Context (c):', c);
  console.log('is Verified:', verified);
  console.log('is FrameData:', frameData);

  
  return c.res({
    image: 'https://gateway.pinata.cloud/ipfs/QmbqkRCSckEqBCbmhmnciaV6TMkWs5FGpcHhy8vdGbGuaC',
    intents: [
      //<Button action={enemy1.name}>Continue</Button>, // example of how to pass a variable to the button
      <Button action="/next">Continue</Button>,
    ],
  });
});








app.frame('/next',async (c) => {
    const { buttonValue, inputText, status, frameData, verified } = c;

  console.log('Context (c):', c);
  console.log('Verified:', verified);
  console.log('FrameData:', frameData);

  const { fid } = frameData || {};
  farcasterid = fid !== undefined ? String(fid) : farcasterid;// Use existing farcasterid if fid is undefined
  console.log('real id is:', farcasterid);

  try {
    const data: DataItem[] = await fetchData();
    const firstItem = data[0];
    

    const item = data.find((item: DataItem) => item.fid === farcasterid);

    if (item) {
      // Update Health with the score of the found item
      let Health = item.health;
      console.log('Farcaster health:', Health);

      let lastFrame = item.lastknownframe;
      progressMarker = { ...progressMarker, previousFrame: lastFrame };
    } else {
      console.log('Item not found for the specified farcasterid');
      await addData(farcasterid, currentframe);
      console.log('Data added successfully');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }

    return c.res({
        image: 'https://gateway.pinata.cloud/ipfs/QmYxRrdLyBmkb6w7ehzQnGBCCKfAFVDYUuXUyWqE1VpGHJ',
        intents: [
            
            <Button action="/loading">Load Info</Button>,
        ],
    });
});


app.frame('/loading', async (c) => {


  
  return c.res({
    image: 'https://gateway.pinata.cloud/ipfs/Qmd854TcxRNNoRFxSLAkHhgwS2asVqBwYcjGwpT1APEnJv',
    intents: [
      //<Button action={enemy1.name}>Continue</Button>, // example of how to pass a variable to the button
      <Button action="/intro">Continue</Button>,
    ],
  });
});


app.frame('/intro', (c) => {

  let image;
  let intents;



  if (progressMarker.previousFrame === '/intro') {
    //fail
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Your profile is not on the server`} </p>
              
            </div>
        );

        intents = [
            <Button action="/level1">Continue</Button>
        ];
    
  } else {
    //victory
   
   image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`User data pulled from the server`} </p>
              
            </div>
        );

        intents = [
            <Button action={`/${progressMarker.previousFrame}`}>Continue</Button>

        ];

  }

  return c.res({
    image: image,
    intents: intents
  });

});






app.frame('/level1', (c) => {

  let image;
  let intents;

    progressMarker = { ...progressMarker, previousFrame: '/level1' };
    currentframe = "level1";

    updateData(farcasterid, currentframe)
    .then(() => {
      console.log('Data updated successfully');
    })
    .catch((error) => {
    if (error instanceof Error) {
      console.error('Error updating data:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  });

    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`You are in Level 1`} </p>
              
            </div>
        );

        intents = [
            <Button action="/level2">Continue</Button>
        ];
    


  return c.res({
    image: image,
    intents: intents
  });

});


app.frame('/level2', (c) => {

  let image;
  let intents;

    progressMarker = { ...progressMarker, previousFrame: '/level2' };
    currentframe = "level2";

    updateData(farcasterid, currentframe)
    .then(() => {
      console.log('Data updated successfully');
    })
    .catch((error) => {
      console.error('Error updating data:', error.message);
    });


    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`You are in Level 2`} </p>
              
            </div>
        );

        intents = [
            <Button action="/level3">Continue</Button>
        ];
    


  return c.res({
    image: image,
    intents: intents
  });

});


app.frame('/level3', (c) => {

  let image;
  let intents;

    progressMarker = { ...progressMarker, previousFrame: '/level3' };
    currentframe = "level3";

    updateData(farcasterid, currentframe)
    .then(() => {
      console.log('Data updated successfully');
    })
    .catch((error) => {
      console.error('Error updating data:', error.message);
    });


    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`You are in Level 3`} </p>
              
            </div>
        );

        intents = [
            <Button action="/level4">Continue</Button>
        ];
    


  return c.res({
    image: image,
    intents: intents
  });

});



app.frame('/level4', (c) => {

  let image;
  let intents;

    progressMarker = { ...progressMarker, previousFrame: '/level4' };
    currentframe = "level4";

    updateData(farcasterid, currentframe)
    .then(() => {
      console.log('Data updated successfully');
    })
    .catch((error) => {
      console.error('Error updating data:', error.message);
    });


    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`You are in Level 4`} </p>
              
            </div>
        );

        intents = [
            <Button action="/level5">Continue</Button>
        ];
    


  return c.res({
    image: image,
    intents: intents
  });

});



app.frame('/level5', (c) => {

  let image;
  let intents;

    progressMarker = { ...progressMarker, previousFrame: '/level5' };
    currentframe = "level5";

    updateData(farcasterid, currentframe)
    .then(() => {
      console.log('Data updated successfully');
    })
    .catch((error) => {
      console.error('Error updating data:', error.message);
    });


    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`You are in Level 5`} </p>
              
            </div>
        );

        intents = [
            <Button action="/level6">Continue</Button>
        ];
    


  return c.res({
    image: image,
    intents: intents
  });

});




app.frame('/level6', (c) => {

  let image;
  let intents;

    progressMarker = { ...progressMarker, previousFrame: '/level6' };
    currentframe = "level6";

    updateData(farcasterid, currentframe)
    .then(() => {
      console.log('Data updated successfully');
    })
    .catch((error) => {
      console.error('Error updating data:', error.message);
    });


    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`You are in Level 6`} </p>
              
            </div>
        );

        intents = [
            <Button action="/level7">Continue</Button>
        ];
    


  return c.res({
    image: image,
    intents: intents
  });

});


app.frame('/level7', (c) => {

  let image;
  let intents;

    progressMarker = { ...progressMarker, previousFrame: '/level7' };
    currentframe = "level7";

    updateData(farcasterid, currentframe)
    .then(() => {
      console.log('Data updated successfully');
    })
    .catch((error) => {
      console.error('Error updating data:', error.message);
    });


    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`You are in Level 7`} </p>
              
            </div>
        );

        intents = [
            <Button action="/">Continue</Button>
        ];
    


  return c.res({
    image: image,
    intents: intents
  });

});











app.frame('/fight', (c) => {

  let image;
  let intents;

    progressMarker = { ...progressMarker, previousFrame: '/fight' };
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/Qmeh4wiW53885vpLds3znH6W5sXs8c6E9KEDbGJBmrKRC8)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`You are in fight Level `} </p>
              
            </div>
        );

        intents = [
            <Button action="/">Continue</Button>
        ];
    


  return c.res({
    image: image,
    intents: intents
  });

});







devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
