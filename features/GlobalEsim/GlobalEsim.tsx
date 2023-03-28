import React from "react";
import { Bundle, RegionById } from "utils/types";
import MobileDataBundleCard from "entities/MobileDataBundleCard";
import GetPlanButton from "entities/GetPlanButton";
import CoverageCountriesOpenModalButton from "entities/CoverageCountriesOpenModalButton";
import { useModalControls } from "shared/hooks";
import { BundlesWrapper } from "../LocalEsim/styled";
import CoverageCountriesModal from "@/entities/CoverageCountriesModal";

function GlobalEsim({ worldwideRegion }: { worldwideRegion?: RegionById }) {
  const [coverageCountries, setCoverageCountries] = React.useState<
    Bundle["countries"]
  >([]);
  const {
    isOpen: isCoverageCountriesModalOpen,
    closeModal: closeCoverageCountriesModal,
    openModal: openCoverageCountriesModal,
  } = useModalControls(false);

  return (
    <>
      <CoverageCountriesModal
        closeModal={closeCoverageCountriesModal}
        isOpen={isCoverageCountriesModalOpen}
        supportedCountries={coverageCountries}
      />
      <BundlesWrapper>
        {worldwideRegion &&
          Object.values(worldwideRegion.bundles)
            .flat()
            .map(
              ({
                price,
                duration,
                image,
                worldwide,
                countries,
                dataAmount,
                providerType,
                isoName2,
                currency,
              }) => (
                <MobileDataBundleCard
                  key={price}
                  title="Worldwide"
                  price={price}
                  duration={duration}
                  img={image}
                  worldwide={worldwide}
                  supportedCountries={countries}
                  style={{ flex: "1 1 350px" }}
                  embeddedHeader={
                    <CoverageCountriesOpenModalButton
                      onClick={() => {
                        setCoverageCountries(countries);
                        openCoverageCountriesModal();
                      }}
                    />
                  }
                  embeddedFooter={
                    <GetPlanButton
                      dataAmount={dataAmount}
                      providerType={providerType}
                      price={price}
                      isoName2={isoName2}
                      currency={currency}
                    />
                  }
                />
              )
            )}
      </BundlesWrapper>
    </>
  );
}

export { GlobalEsim };
