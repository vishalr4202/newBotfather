import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const params = [...Array(20)].map((_, index) => ({
    id: faker.datatype.uuid(),
    machineName: faker.name.findName()
}));

export default params;
