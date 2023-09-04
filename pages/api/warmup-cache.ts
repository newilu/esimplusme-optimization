import type { NextApiRequest, NextApiResponse } from "next";
import api from "@/api";
import states from "@/shared/assets/us-state-info-by-iso.json";
import { SECOND_PHONE_SUPPORTED_COUNTRIES } from "@/shared/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await Promise.all([
    api.secondPhone.listSecondPhoneCountries(),
    ...Object.keys(states).map((state) =>
      api.secondPhone.getAvailableNumbersByStateISO(state)
    ),
    ...SECOND_PHONE_SUPPORTED_COUNTRIES.map((country) =>
      api.secondPhone.getPhonesByCountry(country)
    ),
    api.profiles.listRegions(),
    api.profiles.listCountries(),
  ]);

  res.status(200).json({});
}
