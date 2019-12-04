import { Omit } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import React from "react";

import { permissions } from "@saleor/fixtures";
import StaffDetailsPage, {
  StaffDetailsPageProps
} from "../../../staff/components/StaffDetailsPage";
import { staffMember } from "../../../staff/fixtures";
import Decorator from "../../Decorator";

const props: Omit<StaffDetailsPageProps, "classes"> = {
  canEditAvatar: false,
  canEditPreferences: false,
  canEditStatus: true,
  canRemove: true,
  disabled: false,
  onBack: () => undefined,
  onChangePassword: () => undefined,
  onDelete: () => undefined,
  onImageDelete: () => undefined,
  onImageUpload: () => undefined,
  onSubmit: () => undefined,
  permissions,
  saveButtonBarState: "default",
  staffMember
};

storiesOf("Views / Staff / Staff member details", module)
  .addDecorator(Decorator)
  .add("default", () => <StaffDetailsPage {...props} />)
  .add("loading", () => (
    <StaffDetailsPage {...props} disabled={true} staffMember={undefined} />
  ))
  .add("not admin", () => (
    <StaffDetailsPage
      {...props}
      staffMember={{
        ...staffMember,
        permissions: staffMember.permissions.slice(1)
      }}
    />
  ))
  .add("himself", () => (
    <StaffDetailsPage
      {...props}
      canEditStatus={false}
      canRemove={false}
      canEditAvatar={true}
      canEditPreferences={true}
    />
  ));
