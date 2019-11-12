import gql from "graphql-tag";

import { pageInfoFragment, TypedQuery } from "../queries";
import {
  CategoryDetails,
  CategoryDetailsVariables
} from "./types/CategoryDetails";
import { RootCategories } from "./types/RootCategories";

export const categoryFragment = gql`
  fragment CategoryFragment on Category {
    id
    name
    children {
      totalCount
    }
    products {
      totalCount
    }
  }
`;
export const categoryDetailsFragment = gql`
  fragment CategoryDetailsFragment on Category {
    id
    backgroundImage {
      alt
      url
    }
    name
    descriptionJson
    seoDescription
    seoTitle
    parent {
      id
    }
  }
`;

export const rootCategories = gql`
  ${categoryFragment}
  ${pageInfoFragment}
  query RootCategories(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: CategoryFilterInput
  ) {
    categories(
      level: 0
      first: $first
      after: $after
      last: $last
      before: $before
      filter: $filter
    ) {
      edges {
        node {
          ...CategoryFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;
export const TypedRootCategoriesQuery = TypedQuery<RootCategories, {}>(
  rootCategories
);

export const categoryDetails = gql`
  ${categoryFragment}
  ${categoryDetailsFragment}
  ${pageInfoFragment}
  query CategoryDetails(
    $id: ID!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    category(id: $id) {
      ...CategoryDetailsFragment
      children(first: $first, after: $after, last: $last, before: $before) {
        edges {
          node {
            ...CategoryFragment
          }
        }
        pageInfo {
          ...PageInfoFragment
        }
      }
      products(first: $first, after: $after, last: $last, before: $before) {
        pageInfo {
          ...PageInfoFragment
        }
        edges {
          cursor
          node {
            id
            name
            basePrice {
              amount
              currency
            }
            isAvailable
            thumbnail {
              url
            }
            productType {
              id
              name
            }
          }
        }
      }
    }
  }
`;
export const TypedCategoryDetailsQuery = TypedQuery<
  CategoryDetails,
  CategoryDetailsVariables
>(categoryDetails);
