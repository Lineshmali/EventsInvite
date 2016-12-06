public with sharing class S1EventsInviteController {
	public S1EventsInviteController() {
		
	}

	@AuraEnabled
	public static String addInvitees(Id evtId, String relIdsJSON){
		returnData ret = new returnData();
    	ret.success = true;
    	ret.message = 'Invitees Successfully added';

    	List<String> relIds = (List<String>) JSON.deserialize(relIdsJSON, List<String>.class);
    	Set<String> sids = new Set<String>();
    	sids.addAll(relIds);
        System.debug('IDs to add before ' + sids);
    	try{
    		List<EventRelation> es = [SELECT Id,EventId,RelationId FROM EventRelation WHERE EventId = :evtId AND RelationId IN :sids AND isInvitee=true];
    		System.debug('Event Relations ' + es);
            for(EventRelation e:es){
    			String relId = e.RelationId;
    			sids.remove(relId);
    		}
            System.debug('IDs to add after ' + sids);
    		if(sids.size()>0){
    			List<EventRelation> erlist = new List<EventRelation>();
    			for(String s:sids){
    				EventRelation er = new EventRelation();
    				er.EventId = evtId;
    				er.isInvitee = true;
    				er.RelationId = s;
    				erlist.add(er);
    			}
                System.debug('Relations to add ' + erlist);
    			Database.DMLOptions dlo = new Database.DMLOptions();
				dlo.EmailHeader.triggerUserEmail = true; // used if InviteeId is a userId
				dlo.EmailHeader.triggerOtherEmail = true; // used if InviteeId is lead or contact
				Database.insert(erlist,dlo);
    		}

    	}catch(Exception e){
    		ret.success = false;
			ret.message = 'Error in getting recently viewed records ' + e.getMessage() + ' at line number: ' + e.getLineNumber();
    	}
    	return JSON.serialize(ret);
	}

	private class returnData{
        Boolean success {get;set;}
        String message {get;set;}
    }
}