import type { NextApiRequest, NextApiResponse } from 'next';
import api from '@/api';
import states from '@/shared/assets/us-state-info-by-iso.json';
import { SECOND_PHONE_SUPPORTED_COUNTRIES } from '@/shared/constants';
import { Cacheable } from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await Promise.all([
    Cacheable(api.secondPhone.listSecondPhoneCountries)(),
    ...Object.keys(states).map((state) => Cacheable(api.secondPhone.getAvailableNumbersByStateISO)(state)),
    ...SECOND_PHONE_SUPPORTED_COUNTRIES.map((country) => Cacheable(api.secondPhone.getPhonesByCountry)(country)),
    Cacheable(api.profiles.listRegions)(),
    Cacheable(api.profiles.listCountries)(),
  ]);

  res.status(200).json({});
}
