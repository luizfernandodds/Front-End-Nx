var AtlasController = {};

/**
 * To update Growl on Parent MenuBar
 * 
 * @param xhr
 * @param status
 * @param args
 */
function updateMenuBarGrowl(xhr, status, args) {
  if (typeof args.Growl === "undefined") {
    return;
  }
  var obj = eval('(' + args.Growl + ')');
  parent.updateGrowlMenuBar(obj);
}

/**
 * To Primefaces Drag&Drop
 * 
 * @param event
 * @param ui
 */
function handleDrop(event, ui) {
  var draggable = ui.draggable, helper = ui.helper, position = ui.position, offset = ui.offset;
}

/**
 * To get Windows Height
 * 
 * @returns
 */
function getDocHeight() {
  var D = document;
  return Math.max(
      Math.max(D.body.scrollHeight, D.documentElement.scrollHeight), Math.max(
          D.body.offsetHeight, D.documentElement.offsetHeight), Math.max(
          D.body.clientHeight, D.documentElement.clientHeight));
}

/**
 * Change title of all input text
 */
AtlasController.inputTitleHelp = function() {
  $('input[type="text"]').each(function() {
    if ($(this).attr('title') !== undefined) {
      this.value = $(this).attr('title');
      $(this).addClass('text-label');
      AtlasController.inputTitleHelpOnFocus(this);
      AtlasController.inputTitleHelpOnBlur(this);
    }
  });
};

AtlasController.inputTitleHelpOnFocus = function(el) {
  $(el).focus(function() {
    if (el.value == $(el).attr('title')) {
      el.value = '';
      $(el).removeClass('text-label');
    }
  });
};

AtlasController.inputTitleHelpOnBlur = function(el) {
  $(el).blur(function() {
    if (el.value == '') {
      el.value = $(el).attr('title');
      $(el).addClass('text-label');
    }
  });
};
