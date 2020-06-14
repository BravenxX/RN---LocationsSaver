import Realm from 'realm';
import databaseConfigs from '../../realm/databaseConfigs';

const removeLocation = async ({name, latitude, longitude}) => {
  const realm = await Realm.open(databaseConfigs);

  realm.write(() => {
    const location = realm
      .objects('LocationSaved')
      .filtered(
        'name = $0 and latitude = $1 and longitude = $2',
        name,
        latitude,
        longitude,
      );

    realm.delete(location);
  });

  realm.close();
};

export {removeLocation};
