
document.addEventListener("DOMContentLoaded", function () {
    var tweets = document.querySelectorAll(
        'blockquote.TwitterQuote, p.TwitterQuote');
    var tweetUrl = '';
    var clickToTweetBtn = null;
    var handle = '';
    var currentPageUrl = window.location.href;

    for (var i = 0; i < tweets.length; i++) {


        //get twitter handle name 
        for (var j = 0; j < tweets[i].children.length; j++) {
            if (tweets[i].children[j].attributes['class'] != null && tweets[i].children[j].attributes['class'].value == "twitterViaHTMLSnippet") {
                handle = tweets[i].children[j].innerText
            }
        }
        tweetUrl = generateTweetableUrl(
            tweets[i].innerText, currentPageUrl, handle
        );
        // Create a 'click to tweet' button with appropriate attributes
        clickToTweetBtn = document.createElement('a');
        clickToTweetBtn.setAttribute('class', 'icon-twitter');
        clickToTweetBtn.setAttribute('style', 'cursor: pointer;color:#3979A6;');
        clickToTweetBtn.setAttribute('href', tweetUrl);
        //clickToTweetBtn.innerHTML = "Click to tweet";
        clickToTweetBtn.onclick = onClickToTweet;
        tweets[i].appendChild(clickToTweetBtn);

    };

});

// Create a tweetable url
function generateTweetableUrl(text, url, handleName) {

    var tweetableText = "https://twitter.com/intent/tweet?url=" + url + "&via=" + handleName + "&text=" +
        encodeURIComponent(
            text);


    return tweetableText;
}

function onClickToTweet(e) {
    e.preventDefault();

    window.open(
        e.target.getAttribute('href'),
        "twitterwindow",
        "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0"
    );
}