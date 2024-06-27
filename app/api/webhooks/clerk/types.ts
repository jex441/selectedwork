
  // Flexible type for unknown structures
  export type UnknownRecord = Record<string, any>;

  export interface EmailAddress {
    // Example properties
    id: string;
    email_address: string;
    verified: boolean;
  }
  
  export interface ExternalAccount {
    // Example properties
    id: string;
    provider: string;
    accountId: string;
  }
  
  export interface Metadata {
    [key: string]: any;
  }
  
  export interface User {
    birthday: string;
    created_at: number;
    email_addresses: EmailAddress[];
    external_accounts: ExternalAccount[];
    external_id: string;
    first_name: string;
    gender: string;
    id: string;
    image_url: string;
    last_name: string;
    last_sign_in_at: number;
    object: string;
    password_enabled: boolean;
    phone_numbers: string[];
    primary_email_address_id: string;
    primary_phone_number_id: string | null;
    primary_web3_wallet_id: string | null;
    private_metadata: Metadata;
    profile_image_url: string;
    public_metadata: Metadata;
    two_factor_enabled: boolean;
    unsafe_metadata: UnknownRecord; // Flexible type for unknown structure
    updated_at: number;
    username: string | null;
    web3_wallets: string[];
  }
  
  export interface Event {
    data: User;
    object: string;
    type: string;
  }