const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')


// loader
function laoding(){
  loader.hidden = false
  quoteContainer.hidden = true


}

function complete(){
  if(!loader.hidden){
    loader.hidden = true;
    quoteContainer.hidden = false;
  }

}

// Get Quote From API
async function getQuote() {
  laoding()
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;

    try {
        const response = await fetch(proxyUrl);
        const data = await response.json();
        // If Author is blank and Unknown
        if (JSON.parse(data.contents).quoteAuthor === '') {
            authorText.innerText = 'Unknown'
        } else {
            authorText.innerText = JSON.parse(data.contents).quoteAuthor;
        }
        // Reduce font size for long quotes
        if (quoteText.innerText.length > 150) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = JSON.parse(data.contents).quoteText;
        console.log(data)
        // Stop loader show Quote
        complete()
    } catch (error) {
      getQuote()       
    }
}





// Tweet_Quote
function tweetQuote() {
    const quote = quoteText.innerText
    const author = authorText.innerText

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, ' _blank')
}

// Event_Listener
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuote();




















































//   The error you were seeing was caused by the cors-anywhere proxy server blocking your request due to an invalid origin. To fix this, we used a different proxy server called api.allorigins.win, which allows us to bypass the CORS restrictions on the API.

// We updated the getQuote() function to use api.allorigins.win as the proxy server. To do this, we first removed the proxyUrl variable and replaced it with the apiUrl variable. We then created a new proxyUrl variable that uses api.allorigins.win to get the contents of the API.

// Once we got the response from api.allorigins.win, we extracted the JSON data from the response by accessing the .contents property of the data object. We then logged the JSON data to the console using console.log().