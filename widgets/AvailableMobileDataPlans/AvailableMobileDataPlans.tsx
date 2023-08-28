import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { SectionIDS } from "utils/constants";
import RegionalEsim from "features/RegionalEsim";
import LocalEsim from "features/LocalEsim";
import GlobalEsim from "features/GlobalEsim";
import SwitchButtons from "entities/SwitchButtons";
import { Country, Region, RegionById } from "@/utils/types";
import { Title, Wrapper } from "./styled";

enum Regions {
  Local = "local_esim",
  Regional = "regional_esim",
  Global = "global_esim",
}

function AvailableMobileDataPlans({
  countries,
  regions,
  worldwideRegion,
}: {
  countries: Country[];
  regions: Region[];
  worldwideRegion?: RegionById;
}) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [selectedRegion, setSelectedRegion] = React.useState(Regions.Local);

  React.useEffect(
    function preselectedRegionFromQueryParams() {
      const { region, ...routerQuery } = router.query;
      if (region) {
        if (region === "worldwide") {
          setSelectedRegion(Regions.Global);
          return;
        }
        // search for regional plan
        const existingRegion = regions.find(
          ({ name }) => name.toLowerCase() === region
        );

        if (existingRegion) {
          // switch buttons depending on plan type
          setSelectedRegion(Regions.Regional);
        } else {
          // lookup country if neither regional nor global plan found
          const existingCountry = countries.find(
            ({ isoName2 }) => isoName2.toLowerCase() === region
          );

          // clear router query if there are no matches
          if (!existingCountry) {
            router.replace({ query: routerQuery }, undefined, {
              shallow: true,
              scroll: false,
            });
          }
          setSelectedRegion(Regions.Local);
        }
      }
    },
    [countries, i18n.language, regions, router]
  );

  return (
    <Wrapper id={SectionIDS.SearchYourDestination}>
      <Title>
        <div>
          <h2>{t("available_plans")}</h2>
        </div>
        <SwitchButtons
          styledAsDropdown
          value={{ label: t(selectedRegion), value: selectedRegion }}
          onChange={({ value }) => {
            setSelectedRegion(value);
            const { region, ...routerQuery } = router.query;
            router.replace({ query: routerQuery }, undefined, {
              shallow: true,
            });
          }}
          options={Object.values(Regions).map((val) => ({
            label: t(val),
            value: val,
          }))}
        />
      </Title>
      {selectedRegion === Regions.Local && <LocalEsim countries={countries} />}
      {selectedRegion === Regions.Regional && (
        <RegionalEsim regions={regions} countries={countries} />
      )}
      {selectedRegion === Regions.Global && (
        <GlobalEsim worldwideRegion={worldwideRegion} />
      )}
    </Wrapper>
  );
}

export { AvailableMobileDataPlans };
