import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const machines = [...Array(240)].map((_, index) => ({
  id: faker.datatype.uuid(),
  serialNumber:faker.datatype.uuid(),
  machineFamily:  sample([
    'Granular',
    'Non Granular',
  ]),
  machineName: faker.name.findName(),
  client: faker.company.companyName(),
  model: sample([
    'BQS',
    'AQS',
  ]),
  status: sample(['Onboarded', 'Unassigned']),
 
}));

export default machines;
