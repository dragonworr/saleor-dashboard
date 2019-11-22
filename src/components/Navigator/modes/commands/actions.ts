import { score } from "fuzzaldrin";
import { IntlShape } from "react-intl";

import { categoryAddUrl } from "@saleor/categories/urls";
import { collectionAddUrl } from "@saleor/collections/urls";
import { customerAddUrl } from "@saleor/customers/urls";
import { voucherAddUrl } from "@saleor/discounts/urls";
import { UseNavigatorResult } from "@saleor/hooks/useNavigator";
import { OrderDraftCreate } from "@saleor/orders/types/OrderDraftCreate";
import { productAddUrl } from "@saleor/products/urls";
import { MutationFunction } from "react-apollo";
import { QuickSearchAction } from "../../types";
import messages from "../messages";

const threshold = 0.05;
const maxActions = 5;

interface Command {
  label: string;
  onClick: () => void;
}
export function searchInCommands(
  search: string,
  intl: IntlShape,
  navigate: UseNavigatorResult,
  createOrder: MutationFunction<OrderDraftCreate, {}>
): QuickSearchAction[] {
  const actions: Command[] = [
    {
      label: intl.formatMessage(messages.addCategory),
      onClick: () => navigate(categoryAddUrl())
    },
    {
      label: intl.formatMessage(messages.addCollection),
      onClick: () => navigate(collectionAddUrl)
    },
    {
      label: intl.formatMessage(messages.addProduct),
      onClick: () => navigate(productAddUrl)
    },
    {
      label: intl.formatMessage(messages.addCustomer),
      onClick: () => navigate(customerAddUrl)
    },
    {
      label: intl.formatMessage(messages.addVoucher),
      onClick: () => navigate(voucherAddUrl)
    },
    {
      label: intl.formatMessage(messages.createOrder),
      onClick: createOrder
    }
  ];

  return actions.map(action => ({
    label: action.label,
    onClick: action.onClick,
    score: score(action.label, search),
    type: "action"
  }));
}

function getCommandModeActions(
  query: string,
  intl: IntlShape,
  navigate: UseNavigatorResult,
  createOrder: MutationFunction<OrderDraftCreate, {}>
): QuickSearchAction[] {
  return [...searchInCommands(query, intl, navigate, createOrder)]
    .filter(action => action.score >= threshold)
    .sort((a, b) => (a.score <= b.score ? 1 : -1))
    .slice(0, maxActions);
}

export default getCommandModeActions;
