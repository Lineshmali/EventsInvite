({
    showToast: function(cmp, evt, title, message) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message
        });
        toastEvent.fire();
        var dismissActionPanel = $A.get("e.force:closeQuickAction");
        dismissActionPanel.fire();
    },

    showSpinner: function(cmp,evt){
    	var spinner = cmp.find("_spinner");
    	$A.util.removeClass(spinner, "slds-hide");
    },

    hideSpinner: function(cmp,evt){
    	var spinner = cmp.find("_spinner");
    	$A.util.addClass(spinner, "slds-hide");
    }
})
