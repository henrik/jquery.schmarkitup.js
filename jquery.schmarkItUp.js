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
  function replaceSelection(textarea, value) {
    var scrollPosition = textarea.scrollTop;
    if (document.selection) { //IE support
      textarea.focus();
      document.selection.createRange().text = value;
    } else if (textarea.selectionStart || textarea.selectionStart == '0') { //Mozilla/Firefox/Netscape 7+ support    
      var startPos = textarea.selectionStart;
      var endPos = textarea.selectionEnd;
      textarea.value = textarea.value.substring(0, startPos) + value +
                       textarea.value.substring(endPos, textarea.value.length);

      textarea.selectionStart = startPos;
      textarea.selectionEnd = startPos + value.length;
    }
    textarea.scrollTop = scrollPosition;
  }
  
  
	// From markItUp
	function getSelection(textarea) {
		textarea.focus();

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
