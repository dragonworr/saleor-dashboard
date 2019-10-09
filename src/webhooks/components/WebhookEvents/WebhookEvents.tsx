import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/styles/makeStyles";
import CardTitle from "@saleor/components/CardTitle";
import ControlledCheckbox from "@saleor/components/ControlledCheckbox";
import { FormErrors } from "@saleor/types";
import { ConfigurationTypeFieldEnum } from "@saleor/types/globalTypes";
import React from "react";
import { useIntl } from "react-intl";

import { FormData } from "../WebhookDetailsPage";

interface WebhookEventsProps {
  data: FormData;
  errors: FormErrors<"name" | "configuration">;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
  fields: Array<{
    name: string;
    type: ConfigurationTypeFieldEnum | null;
    value: string;
    helpText: string | null;
    label: string | null;
  }>;
}

const useStyles = makeStyles(() => ({
  item: {
    paddingBottom: 10,
    paddingTop: 10
  }
}));

const WebhookEvents: React.StatelessComponent<WebhookEventsProps> = ({
  data,
  disabled,
  errors,
  onChange,
  fields
}) => {
  const classes = useStyles({});
  const intl = useIntl();
  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Events",
          description: "section header"
        })}
      />
      <CardContent></CardContent>
    </Card>
  );
};
WebhookEvents.displayName = "WebhookEvents";
export default WebhookEvents;
