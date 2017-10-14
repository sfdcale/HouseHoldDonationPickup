public with sharing class TruckController {

    @AuraEnabled
    public static List<Truck__c> findAll() {
    return [SELECT id, Name, Location__Latitude__s, Location__Longitude__s
            FROM Truck__c
            WHERE Location__Latitude__s != NULL AND Location__Longitude__s != NULL
            LIMIT 50];
    }

}