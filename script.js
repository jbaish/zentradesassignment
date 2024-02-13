let map;
let locations = [];
let locationStack = [];
let currentPoint = 0;
let selectedLocations = [];
let technicianLocation; // Variable to store technician's location

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 2,
    });
}

function addAddress() {
    
    const addressInput = document.getElementById("addressInput");
    const address = addressInput.value.trim();
    if (address !== "") {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK") {
                const location = results[0].geometry.location;
                const marker = new google.maps.Marker({
                    position: location,
                    map: map,
                    title: address,
                });
                locations.push(location);
                selectedLocations.push({ title: address, location: location });
                map.panTo(location);
                map.setZoom(12);
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
        addressInput.value = "";
    }
}
// Add event listener for both button click and Enter key press
document.getElementById("add-location-button").addEventListener("click", addAddress);
document.getElementById("addressInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addAddress();
    }
});
function nextPoint() {
    if (locations.length > 0) {
        map.panTo(locations[currentPoint]);
        map.setZoom(9);
        currentPoint++;
        if (currentPoint >= locations.length) {
            currentPoint = 0;
        }
    } else {
        alert("No locations available.");
    }
}

function deselectAssistant() {
    if (locations.length > 0) {
        const removedLocation = locations.pop();
        const stackIndex = locationStack.indexOf(removedLocation);
        if (stackIndex > -1) {
            locationStack.splice(stackIndex, 1);
        }
        planRoute(locations);
    } else {
        alert("No more locations to remove");
    }
}

function planRoute() {
    if (locations.length < 2) {
        alert("Please add at least two locations.");
        return;
    }

    const technicianAddress = prompt("Enter Your Address: ( Technician's default starting point):");
    if (technicianAddress === null || technicianAddress.trim() === "") {
        alert("Technician's address is required.");
        return;
    }

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: technicianAddress }, (results, status) => {
        if (status === "OK") {
            technicianLocation = results[0].geometry.location;
            locations.unshift(technicianLocation);
            const technicianMarker = new google.maps.Marker({
                position: technicianLocation,
                map: map,
                title: technicianAddress,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });

            selectedLocations.push({ title: technicianAddress, location: technicianLocation });

            const directionsDiv = document.getElementById("directions");
            directionsDiv.innerHTML = ""; // Clear previous directions

            for (let i = 1; i < locations.length; i++) {
                const request = {
                    origin: technicianLocation,
                    destination: locations[i],
                    travelMode: google.maps.TravelMode.DRIVING
                };

                const directionsService = new google.maps.DirectionsService();

                directionsService.route(request, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {

                        // Create a DirectionsRenderer object to display the route
                        const directionsRenderer = new google.maps.DirectionsRenderer({
                            map: map,
                            directions: response,
                            suppressMarkers: true, // Suppress default markers
                            polylineOptions: {
                                strokeColor: "#FF0000", // Red color for the route
                                strokeOpacity: 1.0,
                                strokeWeight: 4
                            }
                        });

                        // Set options for the DirectionsRenderer
                        directionsRenderer.setOptions({ suppressMarkers: true }); // Suppress default markers
                        directionsRenderer.setOptions({ preserveViewport: true }); // Preserve viewport when displaying multiple routes
                        directionsRenderer.setPanel(directionsDiv); // Set the panel to display directions

                    } else {
                        alert("Error: " + status);
                    }
                });
            }

        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }

    });
}

function markLocationAsDone() {
    if (selectedLocations.length === 0) {
        alert("No locations available.");
        return;
    }

    let locationName = prompt("Enter the location you want to mark as Done:");
    if (!locationName || locationName.trim() === "") {
        alert("Please enter a valid location name.");
        return;
    }
    locationName = locationName.toLowerCase();

    const locationObject = selectedLocations.find(location => location.title === locationName);
    if (locationObject) {
        markLocationOnMap(locationObject);

        // Draw a blue line representing the route with animated arrows
        if (selectedLocations.length > 1) {
            const routeCoordinates = selectedLocations.map(location => location.location);
            const route = new google.maps.Polyline({
                path: routeCoordinates,
                geodesic: true,
                strokeColor: "#0000FF", // Blue color for the line
                strokeOpacity: 0, // Set opacity to 0 to hide the line
                icons: [{
                    icon: {
                        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                        scale: 4,
                        strokeColor: '#0000FF' // Blue color for the arrows
                    },
                    offset: '100%',
                    repeat: '35px' // Distance between arrows
                }]
            });
            route.setMap(map);
        }

    } else {
        alert("This location was not previously selected by you.");
    }
}



function markLocationOnMap(locationObject) {
    const marker = new google.maps.Marker({
        position: locationObject.location,
        map: map,
        title: locationObject.title,
        icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            scaledSize: new google.maps.Size(55, 55)
        }
    });
}

const deselectAssistantButton = document.getElementById("deselect-assistant-button");
deselectAssistantButton.addEventListener("click", markLocationAsDone);

const planRouteButton = document.getElementById("plan-route-button");
planRouteButton.addEventListener("click", planRoute);

const nextPointButton = document.getElementById("next-point-button");
nextPointButton.addEventListener("click", nextPoint);

const addLocationButton = document.getElementById("add-location-button");
addLocationButton.addEventListener("click", addAddress);
