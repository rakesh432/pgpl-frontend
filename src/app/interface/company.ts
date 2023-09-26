export interface Entity {
  id: number;
  name: string;
  type: CompanyType;
  //   company_media: Media[];
  address: string;
  gstNumber?: string;
  //   contact_user?: User;
  city: {
    id: number;
    name: string;
  };
  state: {
    id: number;
    name: string;
  };
  gatePasses?: {
    entry: {
      materialIn: number;
      materialOut: number;
      visitor: number;
      total: number;
    };
    exit: {
      materialIn: number;
      materialOut: number;
      visitor: number;
      total: number;
    };
  };
  postalCode: PostalCode;
  status: CompanyStatus;
  created_at: string;
  updated_at: string;
  contact_person: ContactPerson[];
  parent?: {
    id: number;
    name: string;
  };
  //   controllers: Controller[];
  isSelected?: boolean;
}

export interface SimilarEntityFilter {
  name: string;
}

export interface ContactPerson {
  id: number;
  company: string;
  contactNumber: string;
  email: string;
  name: string;
  note: string;
  type: ContactPersonType;
}

export interface City {
  id: number;
  name: string;
  status: string;
  state_id: number;
  district_id: number;
}

export interface PostalCode {
  id: number;
  state_id: number;
  district_id: number;
  pincode: string;
  place: string;
  state: {
    id: number;
    name: string;
    iso: string;
  };
  name?: string;
}

export type ContactPersonType = 'ADMIN';

export type CompanyType =
  | 'SUPPLIER'
  | 'CUSTOMER'
  | 'TRANSPORTER'
  | 'WAREHOUSE'
  | 'ENTITY'
  | 'GATE'
  | 'VISITOR_COMPANY'
  | 'UNKNOWN';

export type CompanyStatus = 'ACTIVE' | 'DEACTIVE' | 'DELETED';

export type CompanyContactPersonType = 'MANAGER' | 'SUPERVISOR';

export interface EntityWithStatsFilter {
  fromDate?: string;
  toDate?: string;
}

export interface KYC {
  id?: number;
  type: KYCDOCTYPE;
  number: string;
}

export type KYCDOCTYPE = 'GST' | 'PANCARD' | 'AADHAAR' | 'OTHER';
