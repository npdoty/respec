
// Module core/utils
// As the name implies, this contains a ragtag gang of methods that just don't fit 
// anywhere else.

define(
    [],
    function () {
        var utils = {
            // --- SET UP
            run:    function (conf, doc, cb, msg) {
                msg.pub("start", "w3c/utils");
                msg.pub("end", "w3c/utils");
                cb();
            }
            
            // --- STYLE HELPERS ------------------------------------------------------------------------------
            // take a document and either a link or an array of links to CSS and appends a <link/> element
            // to the head pointing to each
        ,   linkCSS:  function (doc, styles) {
                if (!$.isArray(styles)) styles = [styles];
                $.each(styles, function (i, css) { 
                    $('head', doc).append($("<link/>").attr({ rel: 'stylesheet', href: css }));
                });
            }
        };
        return utils;
    }
);

// --- JQUERY EXTRAS ------------------------------------------------------------------------------
// Applies to any jQuery object containing elements, changes their name to the one give, and
// return a jQuery object containing the new elements
$.fn.renameElement = function (name) {
    var arr = [];
    this.each(function () {
        var $newEl = $(this.ownerDocument.createElement(name));
        // I forget why this didn't work, maybe try again
        // $newEl.attr($(this).attr());
        for (var i = 0, n = this.attributes.length; i < n; i++) {
            var at = this.attributes[i];
            $newEl[0].setAttributeNS(at.namespaceURI, at.name, at.value);
        }
        $(this).contents().appendTo($newEl);
        $(this).replaceWith($newEl);
        arr.push($newEl[0]);
    });
    return $(arr);
};
