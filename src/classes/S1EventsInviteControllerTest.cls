@isTest
public class S1EventsInviteControllerTest {
	@TestVisible  class returnData{
        Boolean success {get;set;}
        String message {get;set;}
    }
    @isTest static void test_method_one() {
		// Implement test code
		List<Contact> contacts = new List<Contact>();
		List<Lead> leads = new List<Lead>();
		List<Id> relIds = new List<Id>();
		
		Contact con = new Contact();
		con.FirstName = 'Test';
		con.LastName = 'Contact 1';
		con.Email = 'test1@example.com';
		insert con;
		relIds.add(con.id);

		con = new Contact();
		con.FirstName = 'Test';
		con.LastName = ' Contact 2';
		con.Email = 'test2@example.com';
		insert con;
		relIds.add(con.id);

		Lead l = new Lead();
		l.FirstName = 'Test';
		l.LastName = 'Lead 1';
		l.Email = 'Lead1@example.com';
		l.company = 'Acme Inc';
		insert l;
		relIds.add(l.id);

		Event evt = new Event();
		evt.StartDateTime = Datetime.newInstance(2016, 2, 13);
		evt.EndDateTime = evt.StartDateTime.addDays(1);
		evt.Subject = 'Test Event';
		evt.whoid = con.id;
		insert evt;

		String relIdsJSON = JSON.serialize(relIds);

		String addResult = S1EventsInviteController.addInvitees(evt.Id, relIdsJSON);

	}
}