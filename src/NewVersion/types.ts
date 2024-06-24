export interface Artist {
  name: string;
}

export interface Track {
  name: string;
  preview_url: string;
  artists: Artist[];
}
