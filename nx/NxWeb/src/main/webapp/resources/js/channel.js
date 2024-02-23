function getClassName(json) {
  return json.split('"')[1];
}

function updateOnlineTargetMenuBar(obj) {
  $('.online_target').html(obj.OnlineTarget.amount);
  if ($('#panelOnlineChartId').attr('class').indexOf('ui-overlay-visible') >= 0) {
    // ui-overlay-visible / ui-overlay-hidden
    $('#updateOnlineChart').trigger('click');
  }
}

function updateMessageChat(obj) {
  var chatContent = $(PrimeFaces.escapeClientId('chat_form:public'));
  var date = new Date();

  chatContent.append("<b>("
      + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":"
      + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
      + ":"
      + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())
      + ")</b> " + obj.MessageChat.message + '<br />');
  chatContent.scrollTop(chatContent[0].scrollHeight - chatContent.height());

  if ($('#panelChatId').attr('class').indexOf('ui-overlay-hidden') >= 0) {
    if (obj.MessageChat.growl === "undefined"
        || (obj.MessageChat.growl !== "undefined" && obj.MessageChat.growl.detail === "undefined"))
      return;
    updateGrowlMenuBar(obj.MessageChat.growl);
    notificationSound(21);
  }
}

function updateOnlineLogin(obj) {
  var msg = new Object();
  msg.MessageChat = new Object();
  msg.MessageChat.message = obj.OnlineLogin.welcome;
  updateMessageChat(msg);

  if ($('#panelChatId').attr('class').indexOf('ui-overlay-visible') >= 0) {
    refreshOnlineUsersList(); // metodo dentro da pg included do chat
    // panel_chat.xhtml
  }
}

function updateGrowlMenuBar(obj) {
  // http://code.google.com/p/primefaces/source/browse/primefaces/trunk/src/main/resources/META-INF/resources/primefaces/growl/growl.js
  if (obj.MessageGrowl.life == null || obj.MessageGrowl.life == 0) {
	  PF('growlMessages').cfg.sticky = true;
  }

  if (obj.MessageGrowl.escape == false) {
	  PF('growlMessages').cfg.escape = false;
  }
  
  PF('growlMessages').renderMessage({
    // summary : obj.MessageGrowl.summary,
    summary : i18nMessageGrowl(obj.MessageGrowl.summary),
    // detail : obj.MessageGrowl.detail,
    detail : i18nMessageGrowl(obj.MessageGrowl.detail),
    severity : obj.MessageGrowl.severity
  });

}

function handleMenuWebChannel(json) {
  var className = getClassName(json);
  var obj = eval('(' + json + ')');

  //widgetWebChannel.connection.response.request.requestCount = 0;

  if (className == 'OnlineTarget') {
//    updateOnlineTargetMenuBar(obj);
  } else if (className == 'MessageGrowl') {
    updateGrowlMenuBar(obj);
    notificationSound(1);
  } else if (className == 'MessageChat') {
    updateMessageChat(obj);
  } else if (className == 'OnlineLogin') {
    updateOnlineLogin(obj);
  } else {
    console.log("OBJ: " + className + "handleMenuWebChannel(" + json + ")");
  }
}

function i18nMessageGrowl(detail) {
  var index1 = detail.indexOf("{");
  var index2 = detail.indexOf("}");
  var message = index1 >= 0 && index2 > 0 ? detail.substring(0, index1)
      : detail;
  while (index1 >= 0 && index2 > 0) {
    try {
      message += eval(detail.substring(index1 + 1, index2));
    } catch (e) {
      // TODO: Verificar data e aplicar timeZone
      message += dateTimeZone(detail.substring(index1, index2 + 1));
    }
    index1 = detail.indexOf("{", index1 + 1);
    message += detail.substring(index2 + 1, index1 >= 0 ? index1
        : detail.length);
    index2 = detail.indexOf("}", index1);
  }

  return message;
}

function dateTimeZone(date) {
  dateString = date.substring(1, date.length - 1);
  try {
    var dateTime = dateString.split(" ");
    var cal = dateTime[0].split("/");
    var time = dateTime[1].split(":");
    var d = Date.parse(cal[2] + "-" + cal[1] + "-" + cal[0] + "T" + time[0]
        + ":" + time[1] + ":" + time[2] + "Z")
        + (new Date().getTimezoneOffset() * 60000);
    d = new Date(d + user_timezone_minutes * 60000);

    return ("0" + d.getDate()).slice(-2) + "/"
        + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear() + " "
        + ("0" + (d.getHours())).slice(-2) + ":"
        + ("0" + (d.getMinutes())).slice(-2) + ":"
        + ("0" + (d.getSeconds())).slice(-2);
  } catch (e) {
    console.log("nao eh data");
    return date;
  }
}

function notificationSound(type) {
  var soundFile;
  var time;

  switch (type) {
  case 1:
    time = 1000;
    soundFile = "/resources/sound/event_alert_01.wav";
    break;

  case 21:
    time = 1000;
    soundFile = "/resources/sound/chat_alert_01.wav";
    break;

  default:
    time = 1000;
    soundFile = "/resources/sound/event_alert_01.wav";
  }

  var soundId = "SOUND" + (new Date()).getTime();
  var $sound = $(
      "<embed src=\"" + soundFile
          + "\" hidden=\"true\" autostart=\"true\"loop=\"false\" />").appendTo(
      "body");
  $sound.attr("id", soundId);

  setTimeout(function() {
    $("#" + soundId).remove();
  }, (time + 100));
}
