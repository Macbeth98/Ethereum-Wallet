//console.log("apple 9999");

window.addEventListener("message", function(event) {
  //console.log('receinggg message!!!')

  //console.log(event.data);

  if (
    event.data.id ==
    "CE1F5E1D97A072573BD3106C00DC2D4669A9E35A546A894101645A9BF22D70DF"
  ) {
    //console.log('Yayyyyy')
    chrome.runtime.sendMessage({ data: event.data.payload }, function(
      response
    ) {
      //console.log(response.reply);
    });

    //reciver
    // var port = chrome.runtime.connect({ name: "knockknock" });
    // port.onMessage.addListener(function (msg) {
    //     //console.log(msg);
    // })
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // console.log("Listening...123!....");
  // console.log(message);
  if (message.id === "2aeae6e6715b2ccc1996aa28cc19f062") {
    //console.log(message.data);
    window.postMessage(
      {
        id: "2aeae6e6715b2ccc1996aa28cc19f062",
        data: message.data
      },
      "*"
    );
  }
});
