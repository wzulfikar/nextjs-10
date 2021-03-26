import chance from '@tests/chance';

import {
  randomAvatar,
  randomBio,
  randomHeaderPhoto,
  randomDisplayStatus,
} from './utils';

const buildUser = ({
  id = '2340748764685272297',
  created_at = new Date(),
} = {}) => {
  const name = chance.name();
  const username = name.replace(/\s/g, '_');

  return {
    id,
    email: chance.email(),
    username: username,
    bio: randomBio(),
    official_name: name,
    display_name: name,
    display_picture: randomAvatar(),
    display_status: randomDisplayStatus(),
    location: chance.country({ full: true }),
    header_photo: randomHeaderPhoto(),
    website: chance.domain(),
    role: 'user',
    created_at,
  };
};

export { buildUser };

export default buildUser;
