import { storiesOf } from "@storybook/react";
import React from "react";

import { address, countries } from "@saleor/fixtures";
import Decorator from "@saleor/storybook/Decorator";
import { formError } from "@saleor/storybook/misc";
import { warehouseList } from "../../fixtures";
import WarehouseDetailsPage, {
  WarehouseDetailsPageProps,
  WarehouseDetailsPageFormData
} from "./WarehouseDetailsPage";

const props: WarehouseDetailsPageProps = {
  countries: countries.map(c => ({
    __typename: "CountryDisplay",
    code: c.code,
    country: c.name
  })),
  disabled: false,
  errors: [],
  onBack: () => undefined,
  onDelete: () => undefined,
  onShippingZoneClick: () => undefined,
  onSubmit: () => undefined,
  saveButtonBarState: "default",
  warehouse: {
    ...warehouseList[0],
    address
  }
};
storiesOf("Views / Warehouses / Warehouse details", module)
  .addDecorator(Decorator)
  .add("default", () => <WarehouseDetailsPage {...props} />)
  .add("loading", () => (
    <WarehouseDetailsPage {...props} warehouse={undefined} disabled={true} />
  ))
  .add("form errors", () => (
    <WarehouseDetailsPage
      {...props}
      errors={([
        "name",
        "city",
        "cityArea",
        "companyName",
        "country",
        "countryArea",
        "phone",
        "postalCode",
        "streetAddress1",
        "streetAddress2"
      ] as Array<keyof WarehouseDetailsPageFormData>).map(field =>
        formError(field)
      )}
    />
  ));
