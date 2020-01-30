import React from "react";
import { useIntl, FormattedMessage } from "react-intl";

import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import { UserError } from "@saleor/types";
import Grid from "@saleor/components/Grid";
import CardSpacer from "@saleor/components/CardSpacer";
import CompanyAddressInput from "@saleor/components/CompanyAddressInput";
import { AddressTypeInput } from "@saleor/customers/types";
import createSingleAutocompleteSelectHandler from "@saleor/utils/handlers/singleAutocompleteSelectChangeHandler";
import { mapCountriesToChoices } from "@saleor/utils/maps";
import useAddressValidation from "@saleor/hooks/useAddressValidation";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
import { maybe, findValueInEnum } from "@saleor/misc";
import { ShopInfo_shop } from "@saleor/components/Shop/types/ShopInfo";
import AppHeader from "@saleor/components/AppHeader";
import PageHeader from "@saleor/components/PageHeader";
import { sectionNames } from "@saleor/intl";
import { CountryCode } from "@saleor/types/globalTypes";
import WarehouseInfo from "../WarehouseInfo";
import WarehouseZones from "../WarehouseZones";
import { WarehouseDetails_warehouse } from "../../types/WarehouseDetails";

export interface WarehouseDetailsPageFormData extends AddressTypeInput {
  name: string;
}
export interface WarehouseDetailsPageProps {
  disabled: boolean;
  errors: UserError[];
  saveButtonBarState: ConfirmButtonTransitionState;
  shop: ShopInfo_shop;
  warehouse: WarehouseDetails_warehouse;
  onBack: () => void;
  onShippingZoneClick: (id: string) => void;
  onSubmit: (data: WarehouseDetailsPageFormData) => void;
}

const WarehouseDetailsPage: React.FC<WarehouseDetailsPageProps> = ({
  disabled,
  errors: apiErrors,
  saveButtonBarState,
  shop,
  warehouse,
  onBack,
  onShippingZoneClick,
  onSubmit
}) => {
  const intl = useIntl();
  const [displayCountry, setDisplayCountry] = useStateFromProps("");

  const {
    errors: validationErrors,
    submit: handleSubmit
  } = useAddressValidation<WarehouseDetailsPageFormData>(onSubmit);

  const initialForm: WarehouseDetailsPageFormData = {
    city: maybe(() => warehouse.address.city, ""),
    companyName: maybe(() => warehouse.address.companyName, ""),
    country: maybe(() =>
      findValueInEnum(warehouse.address.country.code, CountryCode)
    ),
    countryArea: maybe(() => warehouse.address.countryArea, ""),
    name: maybe(() => warehouse.name, ""),
    phone: maybe(() => warehouse.address.phone, ""),
    postalCode: maybe(() => warehouse.address.postalCode, ""),
    streetAddress1: maybe(() => warehouse.address.streetAddress1, ""),
    streetAddress2: maybe(() => warehouse.address.streetAddress2, "")
  };

  return (
    <Form
      initial={initialForm}
      errors={[...apiErrors, ...validationErrors]}
      onSubmit={handleSubmit}
    >
      {({ change, data, errors, submit }) => {
        const countryChoices = mapCountriesToChoices(
          maybe(() => shop.countries, [])
        );
        const handleCountryChange = createSingleAutocompleteSelectHandler(
          change,
          setDisplayCountry,
          countryChoices
        );

        return (
          <Container>
            <AppHeader onBack={onBack}>
              <FormattedMessage {...sectionNames.warehouses} />
            </AppHeader>
            <PageHeader title={maybe(() => warehouse.name)} />
            <Grid>
              <div>
                <WarehouseInfo
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                />
                <CardSpacer />
                <CompanyAddressInput
                  countries={countryChoices}
                  data={data}
                  disabled={disabled}
                  displayCountry={displayCountry}
                  errors={errors}
                  header={intl.formatMessage({
                    defaultMessage: "Address Information",
                    description: "warehouse"
                  })}
                  onChange={change}
                  onCountryChange={handleCountryChange}
                />
              </div>
              <div>
                <WarehouseZones
                  zones={maybe(() =>
                    warehouse.shippingZones.edges.map(edge => edge.node)
                  )}
                  onShippingZoneClick={onShippingZoneClick}
                />
              </div>
            </Grid>
            <SaveButtonBar
              disabled={disabled}
              onCancel={onBack}
              onSave={submit}
              state={saveButtonBarState}
            />
          </Container>
        );
      }}
    </Form>
  );
};

WarehouseDetailsPage.displayName = "WarehouseDetailsPage";
export default WarehouseDetailsPage;
