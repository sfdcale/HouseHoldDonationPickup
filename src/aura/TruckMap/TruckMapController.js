({
    jsLoaded: function(component, event, helper) {
        var action = component.get("c.findAll");
        action.setCallback(this, function(a) {
        	console.log('From init function callback');
            component.set("v.trucks", a.getReturnValue());
            var map = component.get('v.map');
	        var trucks = component.get('v.trucks');
	        var map = L.map('myMap', {zoomControl: false}).setView([trucks[0].Location__Latitude__s, trucks[0].Location__Longitude__s], 14);
        	L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
            {
                attribution: 'Tiles © Esri'
            }).addTo(map);
	        for (var i=0; i<trucks.length; i++) {
	            var truck = trucks[i];
	            var latLng = [truck.Location__Latitude__s, truck.Location__Longitude__s];
	            L.marker(latLng, {truck: truck}).addTo(map).on('click', function(event) {
	    			helper.navigateToDetailsView(event.target.options.truck.Id);
				});
	        }
	        component.set("v.map", map);
        });
    	$A.enqueueAction(action);
        console.log('jsLoaded finished');
    },

    truckSelected : function(component,event,helper){
    	// Center the map on the account selected in the list
	    var map = component.get('v.map');
	    debugger;
	    map.panTo([event.target.dataset.lat, event.target.dataset.long]);
    }

})