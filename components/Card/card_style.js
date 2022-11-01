import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  card: {
    alignSelf: 'center',
    width: '85%',
    height: 400,
    marginVertical: '7.5%',
  },
  card_overlay: {
    paddingTop: '85%',
    height: '100%',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 30,
    paddingRight: '15%',
  },
  text: {
    flex: 2,
    height: '100%',
    paddingLeft: '5%',
    paddingTop: '2.5%',
    paddingBottom: '10%',
    fontSize: RFPercentage(3),
    color: 'white',
    flexDirection: 'column',
    numberOfLines: '3',
    alignSelf: 'flex-start',
    adjustsFontSizeToFitWidth: 'true',
    backgroundColor: 'rgba(255,255,255,0)',
    fontWeight: 'bold',
  },
  overlay: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  star: {
    flex: 1,
    height: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
  },
});
