import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const models = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name:faker.name.findName(),
  avatarUrl: mockImgAvatar(index),
  parameters:  faker.datatype.number({min: 100, max: 400, precision: 1}),
  machines: faker.datatype.number({min: 1, max: 40, precision: 1}),
}));

export default models;