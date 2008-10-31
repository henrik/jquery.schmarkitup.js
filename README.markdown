# jQuery schmarkItUp

[jQuery](http://jquery.com/) (JavaScript) plugin for non-WYSIWYG textarea markup editing.

schmarkItUp is loosely based on [markItUp](http://markitup.jaysalvat.com/), but does less and is easier to hack. It provides a simple `<ul>` toolbar and nothing else, unlike markItUp:

![Lots of added markup](http://markitup.jaysalvat.com/_images/cssmap-after.png)

The toolbar can easily be put anywhere you want. The toolbar button callbacks are simple but powerful function calls, with no magic placeholders.


## Usage

See a [live example](http://henrik.nyh.se/examples/schmarkItUp/) (or try the provided `example.html` locally).


### Insertion

Insert before the textarea:

    $("#my_textarea").schmarkItUp(markupSet);

Control where the toolbar goes:

    $("#my_textarea").schmarkItUp(markupSet, function(textarea, toolbar) {
      toolbar.insertAfter(textarea);
    });
    

### markupSet

The `markupSet` should be an array. Use `null` for separators. For buttons, use object notation:

    [{ name: 'Bold', klass: 'my_bold', key: 'B',  click: myFunction }, null, ...]

The buttons must have a `name` (shown if CSS is disabled). For styling, the button `<li>` will be
given a class that is the lowercase name followed by "_button". Override with `klass`.

If you pass a `key`, that's set as the accesskey, so e.g. `Ctrl+B` triggers bold.

Assign a function to `key`. When the button is clicked, the function will be called and will be
passed the currently selected text (if any). You don't have to use that text. The text returned
by this function will be inserted at the caret, or replace the selected text. The output will
be selected so you can easily nest tags.
    
Example `markupSet`:

    var markupSet = [
      { name: 'Very Bold', klass: 'bold', key: 'B',  click: function(selection) {
        if (!selection) selection = prompt("Text:");
        if (selection) return '<'+tag+'>'+selection+'</'+tag+'>'
      }},
      null,
      { name: 'Picture', key: 'P', click: function() {
        var url = prompt("Enter URL for image:", "http://");
        if (url) return '<img src="'+url+'" alt="" />';
      }},
      {name: 'Link', key: 'L', click: function(selection) {
        var url = prompt("Enter URL for link:", "http://");
        if (url) return '<a href="'+url+'">'+selection+'</a>';
      }},
      null,
      {name: 'Cut', key: 'C', click: function(selection) {
        var text = prompt("Cut text:");
        if (text != null)
          return (text ? '<cut text="'+text+'">'+selection+'</cut>' : '<cut>'+selection+'</cut>');
      }}
    ];

You can, of course, reuse logic in the `click` methods. In this example, an anonymous function closure is used not to pollute the global namespace:

    var markupSet;
    
    (function() {
      
      markupSet = [
        { name: 'Bold',   key: 'B',  click: wrapperMarkup('strong') },
        { name: 'Italic', key: 'I',  click: wrapperMarkup('em') },
        null,
        { name: 'Header', key: 'H',  click: wrapperMarkup('h4', 'Header:') }
      ];
    
      function wrapperMarkup(tag, prompt_text) {
        return function(selection) {
          if (!selection) selection = prompt(prompt_text || "Text:");
          if (selection) return '<'+tag+'>'+selection+'</'+tag+'>'
        }
      }
      
    })();


## Credits and license

Uses some code from [markItUp](http://markitup.jaysalvat.com/) by Jay Salvat and from [textile_toolbar](http://github.com/pelargir/textile_toolbar/) by Matthew Bass.

The example images are [Silk](http://www.famfamfam.com/lab/icons/silk/) by Mark James.

By [Henrik Nyh](http://henrik.nyh.se/) under the MIT license:

>  Copyright (c) 2008 Henrik Nyh
>
>  Permission is hereby granted, free of charge, to any person obtaining a copy
>  of this software and associated documentation files (the "Software"), to deal
>  in the Software without restriction, including without limitation the rights
>  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
>  copies of the Software, and to permit persons to whom the Software is
>  furnished to do so, subject to the following conditions:
>
>  The above copyright notice and this permission notice shall be included in
>  all copies or substantial portions of the Software.
>
>  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
>  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
>  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
>  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
>  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
>  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
>  THE SOFTWARE.
