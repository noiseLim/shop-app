import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyC0c47e1qbiMIgCG8Ri2uUVepVUA1C7qoM',
  authDomain: 'authorisation-react.firebaseapp.com',
  projectId: 'authorisation-react',
  storageBucket: 'authorisation-react.appspot.com',
  messagingSenderId: '358802366690',
  appId: '1:358802366690:web:b38e977a84b6bda692bebb',
  measurementId: 'G-K05P80F9YR',
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
