(function(){
  "use strict";
  
  function make_fake_console(csole, textarea_arr)
  {
    if(csole.fake){ return csole; } //don't double advise

    var fake_console = {fake:true};
    var keys = [];
    for(var k in console.constructor.prototype){ keys.push(k); }
    
    //pass through
    keys.forEach(function(method_name){
      fake_console[method_name] = function(){ csole[method_name].apply(csole, arguments); };
    });
    fake_console.log   = function()
                         { 
                            csole.log.apply(csole, arguments);
                            var args = arguments;
                            Array.prototype.forEach.call(textarea_arr, function(ta){ ta.value = ta.value + Array.prototype.join.call(args, " ") + "\n"; });
                         };
    fake_console.clear = function()
                         {
                            csole.log.apply(csole, arguments);
                            Array.prototype.forEach.call(textarea_arr, function(ta){ ta.value = ""; });
                         };
    
    
    return fake_console;
  }
  
  function init_console_widget()
  {
    //pipe console to text area
    var textarea_arr = document.querySelectorAll("[data-uib='widgets/console'] textarea");
    window.console   = make_fake_console(window.console, textarea_arr);
    
    //hook up eval button
    var eval_button_arr = document.querySelectorAll("[data-uib='widgets/console'] button");
    var click_f = function(evt)
                  {
                    var input = evt.target.previousElementSibling;
                    var ta = input.previousElementSibling;
                    try
                    {
                      var val = window.eval.call(window, input.value);
                      ta.value = ta.value + input.value + "\n" +  val + "\n";
                      input.value = "";
                    }
                    catch(e){ ta.value = ta.value + e.toString() + "\n"; }
                  };
    Array.prototype.forEach.call(eval_button_arr, function(eval_button){ eval_button.addEventListener("click", click_f); });
      
  }
  
  document.addEventListener("app.Ready", init_console_widget, false);
 
})();