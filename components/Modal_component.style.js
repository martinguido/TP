import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    height: '56%',
    backgroundColor: 'rgba(0,0,0,0.9)',
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
    fontSize: 20,
    marginVertical: '2%',
    marginLeft: '10%',
    color: 'white',
  },
  title: {
    alignSelf: 'center',
    fontSize: 30,
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
});
