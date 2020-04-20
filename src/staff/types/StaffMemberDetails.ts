/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: StaffMemberDetails
// ====================================================

export interface StaffMemberDetails_user_avatar {
  __typename: "Image";
  url: string;
}

export interface StaffMemberDetails_user_permissions {
  __typename: "Permission";
  code: PermissionEnum;
  name: string;
}

export interface StaffMemberDetails_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  isActive: boolean;
  lastName: string;
  avatar: StaffMemberDetails_user_avatar | null;
  permissions: (StaffMemberDetails_user_permissions | null)[] | null;
}

export interface StaffMemberDetails {
  user: StaffMemberDetails_user | null;
}

export interface StaffMemberDetailsVariables {
  id: string;
}
