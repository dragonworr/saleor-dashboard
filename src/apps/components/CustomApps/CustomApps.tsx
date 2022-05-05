import {
  Card,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import { AppsListQuery } from "@saleor/graphql";
import { commonMessages } from "@saleor/intl";
import {
  Button,
  DeleteIcon,
  IconButton,
  ResponsiveTable
} from "@saleor/macaw-ui";
import { renderCollection, stopPropagation } from "@saleor/misc";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { useStyles } from "../../styles";
import AppsSkeleton from "../AppsSkeleton";
import DeactivatedText from "../DeactivatedText";

export interface CustomAppsProps {
  appsList: AppsListQuery["apps"]["edges"];
  navigateToCustomApp: (id: string) => () => void;
  navigateToCustomAppCreate?: () => void;
  onRemove: (id: string) => void;
}

const CustomApps: React.FC<CustomAppsProps> = ({
  appsList,
  navigateToCustomAppCreate,
  onRemove,
  navigateToCustomApp
}) => {
  const intl = useIntl();
  const classes = useStyles({});

  return (
    <Card className={classes.customApps}>
      <CardTitle
        toolbar={
          !!navigateToCustomAppCreate && (
            <Button
              variant="secondary"
              onClick={navigateToCustomAppCreate}
              data-test-id="create-app"
            >
              <FormattedMessage
                id="XB2Jj9"
                defaultMessage="Create App"
                description="create app button"
              />
            </Button>
          )
        }
        title={intl.formatMessage(commonMessages.customApps)}
      />
      <ResponsiveTable>
        <TableBody>
          {renderCollection(
            appsList,
            (app, index) =>
              app ? (
                <TableRow
                  key={app.node.id}
                  className={classes.tableRow}
                  onClick={navigateToCustomApp(app.node.id)}
                >
                  <TableCell className={classes.colName}>
                    <span data-tc="name" className={classes.appName}>
                      {app.node.name}
                    </span>
                    {!app.node.isActive && (
                      <div className={classes.statusWrapper}>
                        <DeactivatedText />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className={classes.colAction}>
                    <IconButton
                      variant="secondary"
                      color="primary"
                      onClick={stopPropagation(() => onRemove(app.node.id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ) : (
                <AppsSkeleton key={index} />
              ),
            () => (
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.colName}>
                  <Typography className={classes.text} variant="body2">
                    <FormattedMessage
                      id="voRaz3"
                      defaultMessage="Your custom-created apps will be shown here."
                      description="custom apps content"
                    />
                  </Typography>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};

CustomApps.displayName = "CustomApps";
export default CustomApps;
