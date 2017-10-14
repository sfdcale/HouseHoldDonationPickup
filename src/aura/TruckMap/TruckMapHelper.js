({
    navigateToDetailsView : function(truckId) {
        var event = $A.get("e.force:navigateToSObject");
        debugger;
        event.setParams({
            "recordId": truckId
        });
        event.fire();
    },
    trucksLoaded: function(component, event, helper,trucks) {

        // Add markers
        var map = component.get('v.map');
        var trucks = component.get('v.trucks');
        for (var i=0; i<trucks.length; i++) {
            var truck = trucks[i];
            // var latLng = [truck.Location__Latitude__s, truck.Location__Longitude__s];
            var latLng = [37.785143, -122.403405];
            L.marker(latLng, {truck: truck}).addTo(map).on('click', function(event) {
    			// helper.navigateToDetailsView(event.target.options.truck.Id);
    			console.log('Clicked');
			});

        }  
    }
})