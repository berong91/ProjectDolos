(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
     /* button  Log In */
    $(document).on("click", ".uib_w_2", function(evt)
    {
         activate_subpage("#uib_page_1"); 
    });
    
        /* button  Back */
    $(document).on("click", ".uib_w_11", function(evt)
    {
         activate_subpage("#uib_page_2"); 
    });
    
        /* button  .uib_w_21 */
    
    
        /* button  .uib_w_15 */
    
    
        /* button  .uib_w_15 */
    
    
        /* button  .uib_w_16 */
    
    
        /* button  .uib_w_15 */
    
    
        /* button  .uib_w_22 */
    $(document).on("click", ".uib_w_22", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals 
            */
        
         $(".uib_w_17").modal("toggle");  
    });
    
        /* button  .uib_w_15 */
    
    
        /* button  .uib_w_16 */
    $(document).on("click", ".uib_w_16", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals 
            */
        
         $(".uib_w_17").modal("toggle");  
    });
    
        /* button  .uib_w_15 */
    $(document).on("click", ".uib_w_15", function(evt)
    {
         activate_page("#mainpage"); 
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
