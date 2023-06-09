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

export type TDetailedLocation = {
  placeId: string;
  geoloc: google.maps.LatLngLiteral;
  geohash: string;
  longAddress: string;
  formattedAddress: string;
  county: string;
  constituency: string;
};

export type TPerson = {
  id?: string;
  fullname: string;
  age: number;
  complexion: string;
  found?: boolean;
  gender: string;
  images: string[];
  lastSeenDate: Date;
  lastSeenDescription: string;
  othername?: string;
  obNumber: string;
  secondaryContact: number;
  geoloc: {
    lat: number;
    lng: number;
  };
  policeStation: string;
  createdBy: string;
  lastSeenLocation: string;
  geohash: string;
  longAddress: string;
  formattedAddress: string;
  placeId: string;
  county: string;
  constituency: string;
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
