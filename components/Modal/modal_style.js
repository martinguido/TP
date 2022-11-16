import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  modalCard: {
    width: '85%',
    backgroundColor: 'rgba(0,0,0,0.9)',
    height: '65%',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    
  },
  close: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    
  },
  info: {
    fontSize: RFPercentage(2.5),
    marginVertical: '2%',
    marginLeft: '10%',
    color: 'white',

  },
  title: {
    alignSelf: 'center',
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
    color: 'white',
    marginVertical: '5%',
  },
  separator: {
    width: '75%',
    height: 3,
    backgroundColor: 'white',
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: '2.5%',
   
  },
  footer: {
   height: '30%',
    width: '100%',
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
 
  },
  footer2: {
    height: '30%',
    width: '100%',
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
   
  },
  icono2: {
    flex: 1,
  },
  icono: {
    flex: 1,
  },
  


  text: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: '10%',
    color: 'white',
    flex: 3,
  },
  commentInput: {
    borderRadius: 30,
    width: '70%',
    height: '30%',
    //flex: 1,
    alignSelf: 'center',
    marginTop: '10%',
    marginBottom: '10%',
    color: 'white',
    borderWidth: 3,
    borderColor: 'grey',
    shadowColor: 'white',
    shadowOpacity: '100%',
    textAlign: 'center',
  
  },
  separator2: {
    width: '75%',
    height: 3,
    backgroundColor: 'white',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: '2.5%',
    marginBottom: '5%',

  },

  pepa: {
    flex: 1,
  },
 
  comments: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    //backgroundColor: 'yellow',
  },
  add: {
    //flex: 1,
    borderWidth: 1,
    borderColor: 'green',
    alignItems: 'center',
    borderRadius: 15,
    width: '40%',
    
    
  },
  close2: {
    //flex: 1,
    borderWidth: 1,
    borderColor: 'red',
    alignItems: 'center',
    borderRadius: 15,
    width: '40%',
    
    
  },
  hola: {
  
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    
    
  },
  text2: {
    color: 'white',
    padding: 5,
  },
  

});
