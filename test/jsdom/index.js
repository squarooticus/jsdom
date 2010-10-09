var sys = require("sys");
exports.tests = {

  build_window : function() {
    var window = jsdom.jsdom().createWindow();
    assertNotNull("window must be a new object!", window);
    assertNotNull(window.document);
  },

  jsdom_takes_html : function() {
    var document = jsdom.jsdom('<a href="#test">');
    assertEquals("Passing html into jsdom() should populate the resulting doc",
                 document.documentElement.getAttribute("href"),
                 "#test");
  },

  jsdom_method_creates_default_document : function() { 
    var doc = jsdom.jsdom();
    assertEquals("Calling jsdom.jsdom() should automatically populate the doc",
                 doc.documentElement.nodeName,
                 "HTML");
  },

  jquerify : function() {
    var tmpWindow = jsdom.jsdom().createWindow(),
        jQueryFile = __dirname + "/../../example/jquery/jquery.js",
        caught = false,
        res = null;

    jsdom.jQueryify(tmpWindow, jQueryFile , function(window, jQuery) {
      assertNotNull("jQuery should be attached to the window", window.jQuery.find);
      assertNotNull("jQuery should be attached to the window", jQuery.find);
      jQuery("body").html('<p id="para"><a class="link">click <em class="emph">ME</em></a></p>');
      try {
        res = jQuery("#para .emph", window.document.body);
      } catch (e) {
        caught = true;
      }
      assertEqual("selector should work as expected", "ME", res.text());
      assertFalse("compareDocumentPosition should not fail", caught);
    });
  },
  plain_window_document : function() {
    var window = (jsdom.createWindow());
    assertTrue("jsdom.createWindow() should create a documentless window",
               typeof window.document === 'undefined');
  },
  
};
