export type Session = {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    cover_image: string;
    date: string;
    from: string;
    till: string;
    speakers: Speaker[];
    moderators: Moderator[];
    venue: Venue;
}

export type Venue = {
    id: string;
    name: string;
    description: string;
    image: string;
}

export type Speaker = {
    id: string;
    name: string;
    description: string;
    image: string;
}

export type Moderator = {
    id: string;
    name: string;
    image: string;
    description: string;
}

