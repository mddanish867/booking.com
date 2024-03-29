export interface hotelModel {
  userId: number;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string; // e.g., resort, boutique, etc.
  adultCount: number;
  childCount: number;
  pricePerNight: number;
  starRating: number; // Can be a float like 3.5, 4.0, etc.
  lastUpdated: Date;
  hotelFacilities: string[]; // List of facilities available in the hotel
  imageUrls: string[]; // URLs of images associated with the hotel
}