import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const allAlarms = [...Array(48)].map((_, index) => ({
  id: faker.datatype.uuid(),
  serialNumber:faker.datatype.uuid(),
//   triggerTime:  faker.datatype.datetime(),
  triggerTime: new Date(faker.date.past(10)).toString().slice(0,24),
  machine: faker.name.findName(),
  resetTime: new Date(faker.date.recent(10)).toString().slice(0,24),
  duration: sample([
    '1h 20m',
    '2h 10m',
    '1h 40m',
    '2h 30m'
  ]),
  status: sample(['Onboarded', 'Unassigned']),
 
}));

export default allAlarms;
