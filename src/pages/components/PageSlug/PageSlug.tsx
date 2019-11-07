import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useIntl } from "react-intl";
import slugify from "slugify";

import CardTitle from "@saleor/components/CardTitle";
import { FormData } from "../PageDetailsPage";

export interface PageSlugProps {
  data: FormData;
  disabled: boolean;
  errors: Partial<Record<"slug", string>>;
  onChange: (event: React.ChangeEvent<any>) => void;
}

const PageSlug: React.FC<PageSlugProps> = ({
  data,
  disabled,
  errors,
  onChange
}) => {
  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "URL"
        })}
      />
      <CardContent>
        <TextField
          name={"slug" as keyof FormData}
          disabled={disabled}
          error={!!errors.slug}
          label={intl.formatMessage({
            defaultMessage: "Slug",
            description: "page internal name"
          })}
          helperText={
            errors.slug ||
            intl.formatMessage({
              defaultMessage:
                "If empty, URL will be autogenerated from Page Name"
            })
          }
          placeholder={slugify(data.title)}
          value={data.slug}
          onChange={onChange}
          fullWidth
        />
      </CardContent>
    </Card>
  );
};
PageSlug.displayName = "PageSlug";
export default PageSlug;
