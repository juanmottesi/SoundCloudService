import { Artist } from "./Model"

export class UserDraft {
  username: string
  email: string
  password: string
  name: string
  image: string
  backgroundImage: string

  constructor(username: string, email: string, password: string, name: string, image: string, backgroundImage: string) {
    this.username = username
    this.email = email
    this.password = password
    this.name = name
    this.image = image
    this.backgroundImage = backgroundImage
  }
}

export class ArtistDraft {
  name: string
  image: string
  backgroundImage: string

  constructor(name: string, image: string, backgroundImage: string) {
    this.name = name
    this.image = image
    this.backgroundImage = backgroundImage
  }
}

export class PlaylistDraft {
  name: string
  image: string

  constructor(name: string, image: string) {
    this.name = name
    this.image = image
  }
}

export class SongDraft {
  name: string
  duration: number
  artist: Artist
  tagIds: string[]
  audio: string

  constructor(name: string, duration: number, artist: Artist, tagIds: string[], audio: string) {
    this.name = name
    this.duration = duration
    this.artist = artist
    this.tagIds = tagIds
    this.audio = audio
  }
}