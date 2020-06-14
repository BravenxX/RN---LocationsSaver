import Realm from 'realm';
import databaseConfigs from '../../realm/databaseConfigs';

const saveLocation = async ({name, latitude, longitude}) => {
  const realm = await Realm.open(databaseConfigs);

  realm.write(() => {
    realm.create('LocationSaved', {
      name,
      latitude,
      longitude,
    });
  });

  realm.close();
};

export {saveLocation};
