/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ServiceList
// ====================================================

export interface ServiceList_serviceAccounts_edges_node {
  __typename: "ServiceAccount";
  id: string;
  name: string | null;
  isActive: boolean | null;
}

export interface ServiceList_serviceAccounts_edges {
  __typename: "ServiceAccountCountableEdge";
  node: ServiceList_serviceAccounts_edges_node;
}

export interface ServiceList_serviceAccounts_pageInfo {
  __typename: "PageInfo";
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface ServiceList_serviceAccounts {
  __typename: "ServiceAccountCountableConnection";
  edges: ServiceList_serviceAccounts_edges[];
  pageInfo: ServiceList_serviceAccounts_pageInfo;
}

export interface ServiceList {
  serviceAccounts: ServiceList_serviceAccounts | null;
}

export interface ServiceListVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
