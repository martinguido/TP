import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    alignSelf: 'center',
    width: '85%',
    height: 400,
    marginVertical: '7.5%',
    marginHorizontal: '2.5%',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 30,
  },
  text: {
    position: 'absolute',
    marginBottom: '25%',
    marginHorizontal: '7%',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0)',
    fontWeight: 'bold',
  },
  overlay: {
    height: '25%',
    width: '100%',
    marginTop: '87%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
  },
  button: {
    marginRight: '2%',
    width: '15%',
    height: '75%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 100,
    alignItems: 'center',
  },
});
