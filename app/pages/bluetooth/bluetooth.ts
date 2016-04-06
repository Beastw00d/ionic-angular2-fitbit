import { Page } from 'ionic-angular';
import { BLE } from 'ionic-native';


@Page({
    templateUrl: 'build/pages/bluetooth/bluetooth.html'
})
export class BluetoothPage{
    public foundDevices : any[] = [];
    public text = 'not scanning';
    public lat = 0;
    public long = 0;
    public log = '';
    constructor() { 
       navigator.geolocation.getCurrentPosition(
             (position) => {
                 this.lat = position.coords.latitude;
                 this.long = position.coords.longitude
             }); 
    }
    
    startSearching() {
        this.text = 'scanning';
        BLE.startScan([])
        .subscribe(
            service => { 
                this.checkIfFlex(service);
            },
            err => { this.log = JSON.stringify(err); }
        );
    }
    
    checkIfFlex(service) {
        if(service.name.toLowerCase().indexOf('flex') > -1) {
            navigator.geolocation.getCurrentPosition(
             (position) => {
                 this.lat = position.coords.latitude;
                 this.long = position.coords.longitude
             }); 
            this.foundDevices.push(service.name + ' lat: ' + this.lat + 'long: ' + this.long);
        }
    }
    
    stopSearching() {
        BLE.stopScan();
        this.text = 'not scanning';
    }
    
    
    
    // loadMap() {
    //     let options = {timeout: 10000, enableHighAccuracy: true};
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             let latLng = new google.maps.LatLng(position.coords.latitude,
    //                                                 position.coords.longitude);
    //             let mapOptions = {
    //                 center: latLng,
    //                 zoom: 15,
    //                 mapTypeId: google.maps.MapTypeId.ROADMAP
    //             } 
                
    //             this.map = new google.maps.Map(document.getElementById("map"), mapOptions);                             
    //         },
    //         (error) => {
    //             console.log(error)
    //         }, options
    //     );
    // }
}