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
    height: '65 %',
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
    width: '100%',
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footer2: {
    height: '12%',
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
  modalComment: {
    width: '70%',
    height: '35%',
    marginTop: '50%',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlignVertical: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
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
    width: '80%',
    flex: 1,
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
    paddingBottom: '10%',
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
});
