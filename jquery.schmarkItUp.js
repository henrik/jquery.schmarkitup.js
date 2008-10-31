// jquery.schmarkItUp
// http://github.com/henrik/jquery.schmarkitup.js/
// Copyright (c) 2008 Henrik Nyh. MIT license: http://www.opensource.org/licenses/mit-license.php


(function($) {

	$.fn.schmarkItUp = function(markupSet, callback) {
    if (!markupSet.length) return this;

	  return this.each(function() {
	    var field = this, $li, name, title, key;
      var $ul = $('<ul class="schmarkItUp"></ul>');

      $.each(markupSet, function(i, button) {

    		if (!button) {
    			$li = $('<li class="separator"></li>');
    		} else {
    		  name = button.name;
    		  klass = (button.klass ? button.klass : name+'_button').toLowerCase();
      		title = name + (button.key ? ' [Ctrl+'+button.key+']' : '');
      		key = button.key ? ' accesskey="'+button.key+'"' : '';

          $li = $('<li class="'+klass+'"><a href=""'+key+' title="'+title+'">'+name+'</a></li>').click(function() {
            var text = button.click(getSelection(field));
            if (text != null) replaceSelection(field, text);
          	return false;
          });
    		}

        $ul.append($li);
      });
      
      callback ? callback($(field), $ul) : $(field).before($ul);
	  });
  }
	  

  // Mostly from textile_toolbar
  function replaceSelection(text_area, value) {
    if (document.selection) { //IE support
      text_area.focus();
      document.selection.createRange().text = value;
    } else if (text_area.selectionStart || text_area.selectionStart == '0') { //Mozilla/Firefox/Netscape 7+ support    
      var startPos = text_area.selectionStart;
      var endPos = text_area.selectionEnd;
      text_area.value = text_area.value.substring(0, startPos) + value +
                       text_area.value.substring(endPos, text_area.value.length);

      text_area.selectionStart = startPos;
      text_area.selectionEnd = startPos + value.length;
    }  
  }
  
  
	// From markItUp
	function getSelection(textarea) {
		textarea.focus();

		scrollPosition = textarea.scrollTop;
		if (document.selection) {
			selection = document.selection.createRange().text;
			if ($.browser.msie) { // ie
				var range = document.selection.createRange(), rangeCopy = range.duplicate();
				rangeCopy.moveToElementText(textarea);
				caretPosition = -1;
				while(rangeCopy.inRange(range)) { // fix most of the ie bugs with linefeeds...
					rangeCopy.moveStart('character');
					caretPosition ++;
				}
			} else { // opera
				caretPosition = textarea.selectionStart;
			}
		} else { // gecko
			caretPosition = textarea.selectionStart;
			selection = $(textarea).val().substring(caretPosition, textarea.selectionEnd);
		} 
		return selection;
	}

})(jQuery);
