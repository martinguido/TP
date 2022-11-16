import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  separator: {
    width: '90%',
    height: 3,
    backgroundColor: 'white',
    borderRadius: 30,
    alignSelf: 'center',
  },
  loader: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,1)',
    height: '25%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderactivity: {
    flex: 1,
  },
  
  filter: {
    marginTop: '12%',
    borderColor: 'black',
    width: '10%',
    justifyContent: 'flex-end',
    marginRight: '10%',
    marginLeft: '10%',
  },
  searchName: {
    width: '73%',
    height: '50%',
    marginTop: '13%',
    marginLeft: '10%',
    flexDirection: 'row',
    color: 'white',
    borderRadius: 20,
    justifyContent: 'flex-start',
    paddingLeft: '2%',
    backgroundColor: '#292A2B',
    borderColor: 'white',
    borderWidth: 2,
  },
  filtersContainer: {
    flexDirection: 'row',
    color: 'grey',
    marginHorizontal: '8%',
    backgroundColor: 'black',
    padding: 7,
    width: '90%',
  },

});
