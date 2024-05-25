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


console.log('Time refined :',expirationTimeString);

let farcasterid = 'oexcess';
let currentframe = 'level4';



async function addData(farcasterid, currentframe) {
  const url = 'https://gpzytjchmkcglwzkxcrc.supabase.co/rest/v1/warpcastertest'; // Replace with your server's endpoint

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
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to update data');
    }

    const responseData = await response.json();
    console.log('Data updated successfully:', responseData);
  } catch (error) {
    console.error('Error updating data:', error.message);
    throw error;
  }
}






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Define a function to fetch data from the specified URL
async function fetchData() {
  try {
    // Make a fetch request to fetch data from the URL
    const response = await fetch('https://gpzytjchmkcglwzkxcrc.supabase.co/rest/v1/warpcastertest', {
      method: 'GET',
      headers: {
    'Content-Type': 'application/json',
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwenl0amNobWtjZ2x3emt4Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NDEyNzMsImV4cCI6MjAyMzUxNzI3M30.pX9wyf_-ctCHCk0cz-gpsEg9HP-mer9A3_1m-DjSOvA', // Replace 'your_api_key_here' with your actual API key
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwenl0amNobWtjZ2x3emt4Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NDEyNzMsImV4cCI6MjAyMzUxNzI3M30.pX9wyf_-ctCHCk0cz-gpsEg9HP-mer9A3_1m-DjSOvA' // Replace 'your_token_here' with your actual token
},
    });

    // Check if the fetch request was successful
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    // Parse the response JSON
    const data = await response.json();

    // Process the data as needed
   // console.log('Fetched data:', data);

    // Return the fetched data
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}



// Call the fetchData function to fetch data
fetchData()
  .then((data) => {
    // Handle the fetched data
    // For example, pass the first item into a variable
    const firstItem = data[0];
    //console.log('First item:', firstItem);

    //const fid = firstItem.fid;
    //console.log('Farcaster ID:', fid);

    const item = data.find(item => item.fid === farcasterid);

    if (item) {
      // Update Health with the score of the found item
      let Health = item.health;
      console.log('Farcaster health:', Health);

      let lastFrame = item.lastknownframe;
      progressMarker = { ...progressMarker, previousFrame: lastFrame };

    } else {

      console.log('Item not found for the specified wallet_id');
          addData(farcasterid, currentframe)
          .then(() => {
            console.log('Data updated successfully');
          })
          .catch((error) => {
            console.error('Error updating data:', error.message);
          }); 
    }
    
    // Now you can use the 'firstItem' variable to access the first item's data
  })

  .catch((error) => {
    // Handle errors
  });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




async function updateData(farcasterid, currentframe) {
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
    console.error('Error updating data:', error.message);
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



app.frame('/', (c) => {
    const {frameData, verified} = c

    console.log('verified', verified)
    console.log('frameData', frameData)

    const {fid} = frameData || {}
    
    console.log('farcasterid', fid)
    return c.res({
        image: 'https://gateway.pinata.cloud/ipfs/QmWa1pMBg9xMTxT4MvSGNPqYFvX3Zw3umBE6DYmDtX1fEq',
        intents: [
            //<Button action={enemy1.name}>Continue</Button>, // example of how to pass a variable to the button
            <Button action="/next">Continue</Button>,
        ],
    });
});


app.frame('/next', (c) => {


    return c.res({
        image: 'https://gateway.pinata.cloud/ipfs/Qmeh4wiW53885vpLds3znH6W5sXs8c6E9KEDbGJBmrKRC8',
        intents: [
            
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
      console.error('Error updating data:', error.message);
    });

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