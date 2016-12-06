({
	doInit : function(cmp, evt, helper) {
		//Contact Lookup
		var lookupObjectAPI = new Array();
		var obj = {}
		obj.name = 'Contact';
        obj.fieldList = 'Id, Name, Email';
        obj.searchScope = 'NAME FIELDS';
        obj.svgPath = '/resource/OrgResources/lib/slds202/assets/icons/standard-sprite/svg/symbols.svg#contact';
        obj.svgClass = 'slds-icon slds-icon-standard-account slds-icon--medium';
        lookupObjectAPI.push(obj);

        //Lead Lookup
        obj = {}
        obj.name = 'Lead';
        obj.fieldList = 'Id, Name, Email';
        obj.searchScope = 'NAME FIELDS'
        obj.svgPath = '/resource/OrgResources/lib/slds202/assets/icons/standard-sprite/svg/symbols.svg#lead';
        obj.svgClass = 'slds-icon slds-icon-standard-opportunity slds-icon--medium';
        lookupObjectAPI.push(obj);

        //User Lookup
        var obj = {}
        obj.name = 'User';
        obj.fieldList = 'Id, Name, Email';
        obj.searchScope = 'NAME FIELDS';
        obj.svgPath = '/resource/OrgResources/lib/slds202/assets/icons/standard-sprite/svg/symbols.svg#user';
        obj.svgClass = 'slds-icon slds-icon-standard-user slds-icon--medium';
        lookupObjectAPI.push(obj);
        cmp.set('v.multiObjectMultiSelect',lookupObjectAPI);

        
	},

	handleLookupEvents: function(cmp,evt,helper){
		 helper.showSpinner(cmp,evt);
		 var selectedObjects = evt.getParam('selectedObject');
		 console.log('Selected Objects ', selectedObjects);
		 var relIds = new Array();
		 _.each(selectedObjects,function(record){
		 	relIds.push(record.id);
		 });
		 var relIdsJSON = JSON.stringify(relIds);
		 var apexMethod = cmp.get('c.addInvitees');
		 apexMethod.setParams({
		 						'evtId': cmp.get('v.recordId'),
		 						'relIdsJSON': relIdsJSON
		 					  });
		 apexMethod.setCallback(this, function(response) {
		 	helper.hideSpinner(cmp,evt);
            var state = response.getState();
            if (state == 'SUCCESS') {
                var ret = JSON.parse(response.getReturnValue());
                if (ret.success) {
                    helper.showToast(cmp,evt,'Success!',ret.message);
                } else {
                    helper.showToast(cmp,evt,'Error!', ret.message);
                }
            } else {
                helper.showToast(cmp,evt,'Error!','Error calling Apex class');
            }
        });
        $A.enqueueAction(apexMethod);
	}
})