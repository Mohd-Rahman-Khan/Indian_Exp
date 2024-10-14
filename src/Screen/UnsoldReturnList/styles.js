import {StyleSheet, Dimensions} from 'react-native';
import COLORS from '../../GlobalConstants/COLORS';
export default StyleSheet.create({
  container: {flex: 1, marginHorizontal: 20},
  bottomView: {
    width: '100%',
    //height: 50,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  addIconContainer: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.lightGreyBorder,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  plusIcon: {
    height: 20,
    width: 20,
  },
  emptyListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 50,
  },
  emptyListText: {fontSize: 24, fontWeight: '700', color: COLORS.black},
  listItemContainer: {
    //flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    //height: 70,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    //alignItems: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },
  listItemText: {
    color: COLORS.black,
    fontWeight: '500',
    paddingTop: 4,
    textTransform: 'capitalize',
  },
  listItemBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemStatusText: {fontSize: 12, fontWeight: '700', color: COLORS.black},
});
