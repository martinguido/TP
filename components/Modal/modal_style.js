import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  modalCard: {
    width: '80%',
    //height: '60%',
    //backgroundColor: 'blue',
    backgroundColor: 'rgba(0,0,0,0.9)',
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
    //height: '40%',
    width: '100%',
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    //backgroundColor: 'green',
   // backgroundColor: 'green',
  },
  footer2: {
    height: '30%',
    width: '100%',
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
   // backgroundColor: 'green',
  },
  icono2: {
    flex: 1,
  },
  icono: {
    flex: 1,
  },
  modalComment: {
    width: '70%',
    height: '35%',
    //marginTop: '50%',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 30,
    //backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlignVertical: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
    //backgroundColor: 'green',
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
  footerComment: {
    flex: 3,
    height: '10%',
    width: '100%',
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: '5%',
    paddingBottom: '20%',
    
  },
  add: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
   
  },
  icono2Comment: {
    flex: 1,
  },
  iconoComment: {
   flex: 1,
  },
  pepa: {
    flex: 1,
    
    
  },
  icono3: {
    //flex: 3, 
    alignSelf: 'center',
  },
  
  pepa3: {
    backgroundColor: 'green',
   // flex: 1,
    height: '50%',

  },
  footer3: {
    height: '30%',
     //height: '40%',
     width: '100%',
     marginTop: '20%',
      flex: 1,
    // flexDirection: 'row',
     justifyContent: 'space-around',
   ///  backgroundColor: 'green',

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
