export type TLocation = {
  lng: number;
  lat: number;
  address: string;
  geohash: string;
};

export type TGeoLoc = {
  lng: number;
  lat: number;
};

export type TPerson = {
  id: string;
  fullname: string;
  age: number;
  complexion: string;
  found?: boolean;
  gender: string;
  image: string;
  lastSeenDate: string;
  lastSeenWearing: string;
  nickname?: string;
  obNumber: string;
  phoneContact1: number;
  phoneContact2: number;
  policeStationName: string;
  relationToReported: string;
  reporterID?: string;
  lastSeenLocation: TLocation;
};

export type TNotification = {
  title: string;
  body: string;
  icon: string;
  click_action: string;
};
export type TNotificationInput = {
  center: number[];
  radius?: number;
  notification: TNotification;
};
export type TUserDevice = {
  token: string;
  userId: string;
};
