trigger PickupTrigger on Pickup__c (after insert) {

	List<Truck__c> truckList = [SELECT Id,Driver_Email__c,Location__Latitude__s,Location__Longitude__s FROM Truck__c];
	Map<Id,Truck__c> truckMap = new Map<Id,Truck__c>(truckList);
	Map<Id,Id> pickUpTruckMap = new Map<Id,Id>();
	List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();

	for(Pickup__c pickUpObj: trigger.new){
		Double dist = 10000.0;

		for(Truck__c truckObj: truckList){

			Location srcLocation = Location.newInstance(pickUpObj.Location__Latitude__s,pickUpObj.Location__Longitude__s);
			Location trgLocation = Location.newInstance(truckObj.Location__Latitude__s,truckObj.Location__Longitude__s);
			Double tempDist = Location.getDistance(srcLocation, trgLocation, 'mi');
			if(dist>tempDist){
				dist = tempDist;
				pickUpTruckMap.put(pickUpObj.Id,truckObj.Id);
			}
		}

		if(pickUpTruckMap.containsKey(pickUpObj.Id)){
			Messaging.SingleEmailMessage mail =  new Messaging.SingleEmailMessage();
			List<String> sendTo = new List<String>();
      		sendTo.add(truckMap.get(pickUpTruckMap.get(pickUpObj.Id)).Driver_Email__c);
      		mail.setToAddresses(sendTo);
      		mail.setSubject('Found donation for pickup');
      		String body = 'Here is the donation for pickUp: ' + String.valueOf(pickUpObj.Id);
      		mail.setPlainTextBody(body);
      		mails.add(mail);
		}
	}

	if(mails.size()>0){
		Messaging.sendEmail(mails);
	}

}