// Only load the buttons if the user option is true. Defaults to true.
if (navigator.userAgent.indexOf("Chrome") != -1) {
  chrome.storage.sync.get("chat_emoji", handleOptions);
}

// Check that they want the prev and next vids, and use their API key if valid.
function handleOptions(item) {
  if (items.chat_emoji === undefined || items.chat_emoji) {
    createEmojiMenu();
  }
}

function createEmojiMenu() {
  // html for the Emojis tab
  let hardcore = chrome.extension.getURL("img/emojis/hardcore.png"),
      tab_html = [
        "<a id='qol_show_emoji' class='chat-tabs__wrapper' href='#' rel='nofollow'>",
        "<span class='chat-tabs__label'>",
        "<img id='qol_emoji_icon' class='icon' src='" + hardcore + "'/>",
        "Emojis</span></a>"
      ].join("");

  let li = document.createElement("li");
  li.className = "qol-chat-tabs__emoji";
  li.innerHTML = tab_html;

  let parentElement = $("#chatTabs")[0];
  parentElement.appendChild(li);

  // parse the emojis.json to create html for the emojis list
  $.getJSON(chrome.extension.getURL("emojis.json"), function(data) {
    let emojis_html = [];

    data.emojis.forEach(function(emoji) {
      let src  = chrome.extension.getURL(emoji.img),
          name = emoji.name;

      emojis_html.push("<button class='qol-emoji' value='" + name + " '>");
      emojis_html.push("<img src='" + src + "' title='" + name + "'/></button>");
    });

    emojis_html = emojis_html.join("");

    let div = document.createElement("div");
    div.id = "qol_conversation_emoji";
    div.className = "chat-panel";
    div.innerHTML = emojis_html;

    let parentElement = $("#chat-canvas")[0];
    parentElement.appendChild(div);
  });
}

// toggle classes to display emoji and show button as active
$("#qol_show_emoji").click(function() {
  $(this).toggleClass("qol-red-background");
  $("#conversation-main").toggleClass("qol-height-60");
  $("#qol_conversation_emoji").toggleClass("qol-show");
  return false;
});

// populate the chat input with the emoji key
$(".qol-emoji").click(function() {
  $("#f_ChatInput").val($("#f_ChatInput").val() + this.value);
  $("#f_ChatInput").focus();
});
