import {StyleSheet, PixelRatio} from 'react-native';

const fontScale = PixelRatio.getFontScale();
const defaultFontSize = 20;
const iconSize = defaultFontSize * fontScale;

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
    borderWidth: 5,
    width: '85%',
    height: '100%',
    position: 'absolute',
    paddingLeft: '5%',
    paddingBottom: '10%',
    //minimunFontScale: '24%',
    allowFontScaling: 'true',
    numberOfLines: '5',
    fontSize: 25,
    adjustsFontSizeToFit: 'true',
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0)',
    fontWeight: 'bold',
  },
  overlay: {
    height: '100%',
    //paddingRight: '5%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    height: '100%',
    //backgroundColor: 'rgba(0,0,0,0.4)',
    //justifyContent: 'center',
    //alignSelf: 'flex-end',
    //borderRadius: 100,
    //alignItems: 'center',
  },
});
