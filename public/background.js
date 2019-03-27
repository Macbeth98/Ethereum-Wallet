//console.log('from background js+++')

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  //sender
  // chrome.runtime.onConnect.addListener(function (port) {
  //     console.assert(port.name == "knockknock");
  //     port.postMessage({ question: "Who's there?" });
  //     //console.log('inside portt!!!!!')
  // })

  //console.log(message.data);
  // //console.log(sender)
  let win_id;
  let tempdata = {
    ...message.data,
    from1: "bck"
  };
  if (message.name !== "from_extension") {
    chrome.windows.create(
      {
        url: "index.html",
        type: "popup",
        top: 250,
        left: 250,
        width: 380,
        height: 650
      },
      x => {
        win_id = x.id;
        //console.log(x)

        chrome.tabs.query(
          {
            active: true,
            windowId: win_id
          },
          tabs => {
            //console.log(tabs)
            // chrome.tabs.sendMessage(tabs[0].id, { data: tempdata }, function (response) {
            //     //console.log(response.reply);
            // });
            // chrome.tabs.sendMessage(tabs[1].id, { data: tempdata }, function (response) {
            //     //console.log(response.reply);
            // });
            chrome.runtime.onMessage.addListener(gotMessage);
            function gotMessage(message, sender) {
              ////console.log(sender)
              if (message.name === "from_extension") {
                //let got_time = Date.now();
                //console.log(message.name + "%%%%%%%%%%%%%%%%")
                send_data_to_extension = () => {
                  chrome.tabs.sendMessage(
                    tabs[0].id,
                    { data: tempdata },
                    function(response) {
                      // if (response === undefined) {
                      //     setTimeout(send_data_to_extension, 2000)
                      // }
                      // else {
                      //console.log(response);
                      //}
                    }
                  );
                };

                setTimeout(send_data_to_extension, 15000);
              }
            }
          }
        );
      }
    );
    sendResponse({ reply: "got data" });
  }
}

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log("Listening...123!....");
//   console.log(message);
//   if (message.id === "2aeae6e6715b2ccc1996aa28cc19f062") {
//     console.log(message.data.data);
//     chrome.runtime.sendMessage({ data: message.data });
//   }
// });
