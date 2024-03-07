import { SongError, UserError } from "./Exceptions"

export class User {
  id: string
  username: string
  email: string
  password: string
  name: string
  image: string
  backgroundImage: string
  playlists: Playlist[]
  artist: Artist | null 

  constructor(id: string, username: string, email: string, password: string, name: string, image: string, backgroundImage: string) {
    this.id = id
    this.username = username
    this.email = email
    this.password = password
    this.name = name
    this.image = image
    this.backgroundImage = backgroundImage
    this.playlists = []
    this.artist = null
  }

  createArtist(artistId: string, name: string, image: string, backgroundImage: string) {
    if (this.artist) {
      throw new UserError('Already has an artist.')
    }
    this.artist = new Artist(artistId, name, image, backgroundImage)
  }

  createPlaylist(playlistId: string, name: string, image: string, songs: Song[]): Playlist {
    if (this.playlists.some((currentPlaylist) => currentPlaylist.name === name)) {
      throw new UserError('Name is repeated.')
    }
    const playlist = new Playlist(playlistId, name, image, songs)
    this.playlists.push(playlist)
    return playlist
  }

  addSongToPlaylist(playlistId: string, song: Song) {
    const playlist = this.playlists.find((currentPlaylist) => currentPlaylist.id === playlistId)
    if (!playlist) {
      throw new UserError('Playlist not found.')
    }
    playlist.songs.push(song)
  }
}

export class Playlist {
  id: string
  name: string
  image: string
  songs: Song[]

  constructor(id: string, name: string, image: string, songs: Song[]) {
    this.id = id
    this.name = name
    this.image = image
    this.songs = songs
  }
}

export class Tag {
  id: string
  name: string

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}

export class Song {
  id: string
  name: string
  duration: number
  artist: Artist
  tags: Tag[]
  audio: string

  constructor(id: string, name: string, duration: number, artist: Artist, tags: Tag[], audio: string) {
    this.id = id
    this.name = name
    this.duration = duration
    this.artist = artist
    this.tags = tags
    this.audio = audio
  }
}

export class Artist {
  id: string
  name: string
  image: string
  backgroundImage: string
  followers: User[]
  songs: Song[]

  constructor(id: string, name: string, image: string, backgroundImage: string) {
    this.id = id
    this.name = name
    this.image = image
    this.backgroundImage = backgroundImage
    this.followers = []
    this.songs = []
  }

  addSong(song: Song) {
    if (song.artist.id !== this.id) {
      throw new SongError('It does not belong to the same artist.')
    }
    if (this.songs.some((currentSong) => currentSong.name === song.name)) {
      throw new SongError('Name is repeated.')
    }
    this.songs.push(song)
  }

  addOrRemoveFollower(user: User) {
    if (this.followers.some((currentUser) => currentUser.id === user.id)) {
      this.followers = this.followers.filter((currentUser) => currentUser.id !== user.id)
    } else {
      this.followers.push(user)
    }
  }
}

