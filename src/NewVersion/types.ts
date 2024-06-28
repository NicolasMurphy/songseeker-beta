export interface Artist {
  name: string;
}

export interface Track {
  name: string;
  preview_url: string;
  artists: Artist[];
}

export interface Description {
  description: string;
  country: string;
  link: string;
}
