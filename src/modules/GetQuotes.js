
export async function getQuotes(url){
    try{
        const response = await fetch(url, {cache: 'no-cache'});
        if (response.ok){
            const jsonResponse = await response.json();
            return(jsonResponse);
        }
    }
    catch(error){
        console.log("Could not get quotes");
    }
  }