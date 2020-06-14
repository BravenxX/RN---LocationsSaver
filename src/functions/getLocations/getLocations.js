import Realm from 'realm';
import databaseConfigs from '../../realm/databaseConfigs';
import _ from 'lodash';
import R from 'ramda';

const getData = realm => realm.objects('LocationSaved');
const convertToArr = data => _.values(data);
const getDeepDataClone = data => JSON.parse(JSON.stringify(data));

const getLocations = async () => {
  const realm = await Realm.open(databaseConfigs);

  const locations = await R.pipe(
    getData,
    convertToArr,
    getDeepDataClone,
  )(realm);

  realm.close();

  return locations;
};

export {getLocations};
