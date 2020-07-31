import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
    width: '95%',
    height: '80%',
    minHeight: '400px',

};

class GlobalMap extends Component {










    render() {

        const {
            google, isMapShown, users, drivers, mapOptions, onMarkerClick, onMapClicked, activeMarker,
            showInfoWindow, infoWindowData, activeRides, completedRides, markerType
        } = this.props


        if (!isMapShown) {
            return <LoadingContainer />
        }

        return (

            <Map
                google={google}
                zoom={6}
                style={mapStyles}
                initialCenter={{ lat: 25.2766949, lng: -103.6066676 }}
                mapTypeControl={false}
                onClick={onMapClicked}
                gestureHandling='greedy'
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
                    mapOptions === 'ALL' || mapOptions === 'USERS'
                        ?
                        users.map((user, i) => (
                            <Marker
                                key={user.id}
                                position={{ lat: parseFloat(user.lastLat), lng: parseFloat(user.lastLng) }}
                                onClick={onMarkerClick}
                                icon={{
                                    url: `${process.env.SERVER_HOST}/assets/images/userIcon.png`,
                                    anchor: new google.maps.Point(32, 32),
                                    scaledSize: new google.maps.Size(42, 48)
                                }}
                                data={user}
                                markerType="USER"
                            >
                            </Marker>
                        ))
                        : null
                }

                {
                    mapOptions === 'ALL' || mapOptions === 'DRIVERS'
                        ?
                        drivers.map((user, i) => (
                            <Marker
                                key={user.id}
                                position={{ lat: parseFloat(user.lastLat), lng: parseFloat(user.lastLng) }}
                                onClick={onMarkerClick}
                                icon={{
                                    url: `${process.env.SERVER_HOST}/assets/images/driverIcon.png`,
                                    anchor: new google.maps.Point(32, 32),
                                    scaledSize: new google.maps.Size(42, 48)
                                }}
                                data={user}
                                markerType="USER"
                            >
                            </Marker>
                        ))
                        : null
                }

                {
                    mapOptions === 'ALL' || mapOptions === 'ACTIVE_RIDES'
                        ?
                        activeRides.map((r, i) => (
                            <Marker
                                key={r.id}
                                position={{ lat: parseFloat(r.startLat), lng: parseFloat(r.startLng) }}
                                onClick={onMarkerClick}
                                icon={{
                                    url: `${process.env.SERVER_HOST}/assets/images/carIcon.png`,
                                    anchor: new google.maps.Point(32, 32),
                                    scaledSize: new google.maps.Size(42, 48)
                                }}
                                data={r}
                                markerType="RIDE"
                            >
                            </Marker>
                        ))
                        : null
                }

                {
                    mapOptions === 'ALL' || mapOptions === 'COMPLETED_RIDES'
                        ?
                        completedRides.map((r, i) => (
                            <Marker
                                key={r.id}
                                position={{ lat: parseFloat(r.endLat), lng: parseFloat(r.endLng) }}
                                onClick={onMarkerClick}
                                icon={{
                                    url: `${process.env.SERVER_HOST}/assets/images/carIconBlack.png`,
                                    anchor: new google.maps.Point(32, 32),
                                    scaledSize: new google.maps.Size(42, 48)
                                }}
                                data={r}
                                markerType="RIDE"
                            >
                            </Marker>
                        ))
                        : null
                }

                {
                    showInfoWindow ?
                        <InfoWindow
                            marker={activeMarker}
                            visible={showInfoWindow}

                        >
                            {markerType === 'USER'
                                ?
                                <div className="row" style={{ width: '100%' }}>
                                    <div className="col-6">
                                        <img style={{ height: '70px', width: '70px', borderRadius: '50%' }} src={`${process.env.API_HOST}/picture/${infoWindowData.pictureId}`} />
                                    </div>
                                    <div className="col-6">
                                        <p style={{ fontWeight: 'bold' }}>{infoWindowData.name}</p>
                                        <a href={process.env.ADMIN_PANEL_HOST + '/admin/driver/' + infoWindowData.id + '/edit'}>Ver Perfil</a>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="row" style={{ width: '100%' }}>
                                        <div className="col-6">
                                            <img style={{ height: '70px', width: '70px', borderRadius: '50%' }} src={`${process.env.API_HOST}/picture/${infoWindowData.user.pictureId}`} />
                                        </div>
                                        <div className="col-6">
                                            <p style={{ fontWeight: 'bold' }}>{infoWindowData.user.name}</p>
                                            <p>Usuario</p>
                                            <a href={process.env.ADMIN_PANEL_HOST + '/admin/driver/' + infoWindowData.user.id + '/edit'}>Ver Perfil</a>
                                        </div>
                                    </div>
                                    <div className="row mt-4" style={{ width: '100%' }}>
                                        <div className="col-6">
                                            <img style={{ height: '70px', width: '70px', borderRadius: '50%' }} src={`${process.env.API_HOST}/picture/${infoWindowData.driver.pictureId}`} />
                                        </div>
                                        <div className="col-6">
                                            <p style={{ fontWeight: 'bold' }}>{infoWindowData.driver.name}</p>
                                            <p>Conductor</p>
                                            <a href={process.env.ADMIN_PANEL_HOST + '/admin/driver/' + infoWindowData.driver.id + '/edit'}>Ver Perfil</a>
                                        </div>
                                    </div>
                                    <div className="row mt-4" style={{ width: '100%' }}>
                                        <div className="col-12" style={{ paddingLeft: '15px' }}>
                                            <div><span style={{ fontWeight: 'bold' }}>Desde:</span> {infoWindowData.startAddress}</div>
                                            <div><span style={{ fontWeight: 'bold' }}>Hasta:</span> {infoWindowData.endAddress}</div>
                                            <div><span style={{ fontWeight: 'bold' }}>Estado:</span> {infoWindowData.status}</div>
                                            <div style={{textAlign:'center', marginTop:'10px'}}><a href={process.env.ADMIN_PANEL_HOST + '/admin/ride/' + infoWindowData.id}>Ver Detalles</a></div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </InfoWindow>


                        : null
                }

            </Map >
        );
    }
}
const LoadingContainer = (props) => (
    <div>Loading map...</div>
)
export default GoogleApiWrapper({
    apiKey: 'AIzaSyAY5scI2sYPDGoLn2INfct1gMw5gFLIHjs',
    LoadingContainer: LoadingContainer
})(GlobalMap);