import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyCb5BgAMn7jbvIQoo6sFw6sqH3zlXtJyQE',
  authDomain: 'bit-6ed4b.firebaseapp.com',
  databaseURL: 'https://bit-6ed4b.firebaseio.com',
  projectId: 'bit-6ed4b',
  storageBucket: 'https://bit-6ed4b.firebaseio.com',
  messagingSenderId: '452347167383',
};

const firebaseApp = firebase.initializeApp(config);

export const firebaseService = {
  locations: {
    create: (data) => {
      firebaseApp.database().ref(`locations/${data.id}`).set(data);
    },
    update: (data) => {
      const updates = {};
      updates[`locations/${data.id}`] = data;
      firebaseApp.database().ref().update(updates);
    },
    remove: (id) => {
      firebaseApp.database().ref(`locations/${id}`).remove();
    },
  },
};

export default firebaseApp;
