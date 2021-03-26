import chance from '@tests/chance';

export const randomElement = (arr) => {
  const i = chance.integer({ min: 0, max: arr.length });
  return arr[i];
};

export const randomAvatar = ({ gender } = {}) => {
  const randomInt = chance.integer({ min: 1, max: 10 });

  if (!gender) {
    gender = randomElement(['men', 'women']);
  }

  return `https://randomuser.me/portraits/${gender}/${randomInt}.jpg`;
};

export const randomHeaderPhoto = () => {
  return '//placeimg.com/720/240/nature';
};

export const randomCompanyAvatar = ({ size } = {}) => {
  if (!size) size = 120;

  return `//placeimg.com/${size}/${size}/nature`;
};

export const randomDisplayStatus = () => {
  return randomElement([':desert_island:', 'offline', 'online']);
};

export const randomBio = () => {
  return chance.profession();
};
