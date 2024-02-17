export type MediaItem = {
    uuid: string;
    name: string;
    releaseYear: number;
    mediaType: string;
    contentType: string;
    rating: string;
    thumbnail: string;
    fallbackColor: string;
    contentPath: string;
    bookmarks: { media: { uuid: string; }, owner: { jwt_id: string; } }[]
}