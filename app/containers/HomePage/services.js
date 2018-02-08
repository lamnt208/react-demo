// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
import { GOOGLE_MAP_API_KEY } from './constants';

const googleService = {
    getByAddress: (address) => fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAP_API_KEY}`),
};

export default googleService;
