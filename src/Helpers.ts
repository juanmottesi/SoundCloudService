export class IdGenerator {
  userId = 0
  songId = 0
  playlistId = 0
  artistId = 0
  tagId = 0

  getNextUserId() {
    return `user_${this.userId++}`
  }

  getNextSongId() {
    return `song_${this.songId++}`
  }

  getNextPlaylistId() {
    return `playlist_${this.playlistId++}`
  }

  getNextArtistId() {
    return `artist_${this.artistId++}`
  }

  getNextTagId() {
    return `tag_${this.tagId++}`
  }
}