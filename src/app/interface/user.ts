import { Entity } from './company';
// import { Media } from './Media';

export interface User {
  id: number;
  name: string;
  userName: string;
  contactNumber: string;
  contact_number?: string;
  roles: UserRole[];
  email: string;
  created_at: string;
  updated_at: string;
  status: {
    code: UserStatusCode;
  };
  //   user_media: Media[];
  user_notification_subscriptions: NotificationSubscription[];
  user_company_user: {
    id: number;
    company: Entity;
    status: 'ACTIVE' | 'DELETED';
  }[];
  permissions: UserPermissions[];
}

export type UserPermissions =
  | 'APPROVE_GATEPASS'
  | 'ADD_REEL'
  | 'ISSUE_GATEPASS'
  | 'GATEPASS_REPORT'
  | 'RESET_PSWD'
  | 'MANAGE_SETTINGS'
  | 'MANAGE_COMPANY'
  | 'OVERRIDE_REAL'
  | 'VIEW_REPORT'
  | 'VIEW_LIVE_CAMERA'
  | 'VIEW_STOCK'
  | 'VIEW_STATS'
  | 'MANAGE_PRE_APPROVED'
  | 'FULL_UNKNOWN_VEHICLE_LIST'
  | 'CREATE_TRANSPORT_REQUEST'
  | 'TRANSPORT_BID_ACCEPT'
  | 'VIEW_TRANSPORT_REQUEST'
  | 'VIEW_PENDING_TRANSPORT_REQUEST'
  | 'MANAGE_USER';

export type UserStatusCode = 'ACTIVE' | 'PENDING' | 'DELETED';

export interface NotificationSubscription {
  created_at: string;
  id: number;
  notification_type_id: number;
  notificationType: {
    code: NotificationType;
  };
  status: {
    code: string;
  };
  status_id: number;
  updated_at: string;
  user_id: number;
  user_status: {
    code: string;
    created_at: string;
    id: number;
    name: string;
    updated_at: string;
  };
}

export type NotificationType =
  | 'M_IN_ENTRY'
  | 'M_IN_EXIT'
  | 'V_IN'
  | 'M_OUT_ENTRY'
  | 'M_OUT_EXIT'
  | string;

export type mediaCode = 'IMAGE';

export type UserRole =
  | 'ROLE_USER'
  | 'ROLE_ADMIN'
  | 'ROLE_GUARD'
  | 'ROLE_MANAGER'
  | 'ROLE_SUPERVISOR'
  | 'ROLE_SUPERADMIN'
  | 'ROLE_TRANSPORTER';

export interface NotificationTypes {
  code: string;
  content: string;
  id: number;
  name: string;
}

export interface UserPermission {
  id: number;
  name: string;
  code: string;
  description: string;
}

export interface UserPermissionSubscription {
  id: number;
  permission: UserPermission;
  permission_id: number;
}
