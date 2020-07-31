import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker, Polygon } from 'google-maps-react';


const mapStyles = {
    width: '95%',
    height: '80%',
    minHeight: '400px',

};

class ZoneMap extends Component {

    test = (e) => {
        console.log(e)
    }

    render() {

        const { google, isMapShown, isRouteShown, points, location } = this.props

        if (!isMapShown || !points || !location) {
            return <LoadingContainer />
        }

        return (

            <Map
                google={google}
                zoom={12}
                style={mapStyles}
                initialCenter={{ lat: 'lat' in location && location.lat != null ? parseFloat(location.lat) : 19.4324086, lng: 'lng' in location && location.lng != null ? parseFloat(location.lng) : -99.1337894 }}
                mapTypeControl={false}
                styles={[{
                    featureType: 'poi',
                    elementType: 'labels.icon',
                    stylers: [{ visibility: 'off' }] // hide poi (businesses) icons
                },
                {
                    featureType: 'poi',
                    elementType: 'geometry',
                    stylers: [{ color: '#e5e5e5' }] // poi geometry color
                },
                {
                    featureType: 'poi.park',
                    elementType: 'labels.text.stroke',
                    stylers: [{ color: '#ffffff' }] // hide local businesses labels
                },
                {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#676767' }] // hide local businesses labels
                },
                {
                    featureType: 'landscape',
                    elementType: 'geometry',
                    stylers: [{ color: '#f5f5f5' }] // buildings and so on
                },
                {
                    featureType: 'road.arterial',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }] // hide arterial roads labels
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry', // highway color
                    stylers: [{ color: '#dadada' }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'labels.text.stroke', // highway label text stroke (contorno)
                    stylers: [{ color: '#ffffff' }]
                },
                {
                    featureType: 'road',
                    elementType: 'labels.text.fill', // rad label text color (fill)
                    stylers: [{ color: '#676767' }]
                },
                {
                    featureType: 'road.local',
                    elementType: 'geometry',
                    stylers: [{ color: '#ffffff' }] // park roads color

                },
                {
                    featureType: 'transit',
                    elementType: 'labels.icon',
                    stylers: [{ visibility: 'off' }]
                },
                {
                    featureType: 'transit',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#676767' }]
                },
                {
                    featureType: 'transit',
                    elementType: 'labels.text.stroke',
                    stylers: [{ color: '#ffffff' }]
                },
                {
                    featureType: 'transit.station.bus',
                    elementType: 'labels.icon',
                    stylers: [{ visibility: 'off' }]
                }]}
            >

                {
                    points && isRouteShown
                        ?
                        <Polygon
                            paths={points.map(p => {
                                return { lat: parseFloat(p.lat), lng: parseFloat(p.lng) }
                            })}
                            strokeColor="#3880ff"
                            strokeOpacity={0.8}
                            strokeWeight={4}
                            fillColor="#0000FF"
                            geodesic={true}

                        />
                        :
                        null
                }
            </Map>
        );
    }
}
const LoadingContainer = (props) => (
    <div>Loading map...</div>
)
export default GoogleApiWrapper({
    apiKey: 'AIzaSyAY5scI2sYPDGoLn2INfct1gMw5gFLIHjs',
    LoadingContainer: LoadingContainer
})(ZoneMap);