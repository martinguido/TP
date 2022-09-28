import {StyleSheet} from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
    marginBottom: '3%',
    width: '80%',
    height: '5%',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    color: 'white',
    width: '60%',
    height: '80%',
    fontSize: 14,
    marginTop: '5%',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'grey',
    marginRight: '6%',
    marginLeft: '2%',
    paddingLeft: '6%',

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
  container2: {
    marginTop: '12%',
    margin: '5%',
    alignItems: 'center',
    flexDirection: 'column',
    width: '90%',
    backgroundColor: 'rgba(0, 0, 0, 0.93)',
    borderRadius: 15,
    height: '73%',
    borderWidth: 3,
    borderColor: 'white',
  },
  status: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    marginTop: '3%',
  
  },
  gender: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    width: '90%',
    backgroundColor: '#d9dbda',
  },
  apply: {
    fontSize: 15,
    padding: 10,
    borderRadius: 15,
    marginTop: '7%',
    fontWeight: 'bold',
    borderColor: 'white',
    color: 'white',
    borderWidth: 3,
    alignSelf: 'center',
    
  },
  filter: {
    marginTop: '12%',
    borderColor: 'black',
    //alignSelf: 'flex-end',
    width: '10%',
    justifyContent: 'flex-end',
    marginRight: '10%',
    marginLeft: '10%',
  },
  filterText: {
    alignSelf: 'center',
    fontSize: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  text2: {
    padding: 5,
    marginTop: '5%',
    fontSize: 17,
    width: '20%',
    fontWeight: 'bold',
    color: 'white',
  },

  text3: {
    alignSelf: 'flex-start',
    padding: 2,
    marginLeft: '2%',
    fontSize: 17,
    marginTop: '5%',
    fontWeight: 'bold',
    color: 'white',
    width: '30%',
  },
  box: {
    borderColor: 'grey',
    borderWidth: 3,
    width: '26%',
    marginHorizontal: '1%',
    padding: 5,
    borderRadius: 15,
    alignItems: 'center',
  },
  status2: {
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'center',
    marginTop: '3%',

  },
  box2: {
    borderColor: 'grey',
    borderWidth: 3,
    width: '31%',
    marginHorizontal: '1%',
    padding: 5,
    borderRadius: 15,
    alignItems: 'center',
  },
 
  searchName: {
    width: '73%',
    height: '50%',
    marginTop: '13%',
    marginLeft: '10%',
    flexDirection: 'row',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    justifyContent: 'flex-start'
  },
  filtersContainer: {
    flexDirection: 'row',
    color: 'grey',
    marginHorizontal: '8%',
    backgroundColor: 'black',
    padding: 7,
    width: '90%'
  
  },
  options:
  {
    marginVertical: '5%',
    marginTop: '5%',
    marginBottom: '10%',
  },  
  separator2: {
    width: '75%',
    height: '1%',
    backgroundColor: 'white',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: '14%',
  },
  buttons: {
    color: 'white',
  }
  

});
