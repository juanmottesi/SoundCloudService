import { ArtistDraft, PlaylistDraft, SongDraft, UserDraft } from "./Draft";
import { IdGenerator } from "./Helpers";
import { Playlist, Song, Tag, User } from "./Model";

export default class SoundCloudService {
  idGenerator = new IdGenerator();
  songs: Song[] = [];
  users: User[] = [];
  playlists: Playlist[] = [];
  tags: Tag[] = [];


  /*
    * Login a user
    * @param username - The username of the user
    * @param password - The password of the user
    * @returns The user
    * @throws Error if the username or password is invalid
  */
  login(username: string, password: string): User {
    const user = this.users.find(user => user.username === username && user.password === password);
    if (!user) {
      throw new Error("Invalid username or password");
    }
    return user;
  }

  /*
    * Create a user
    * @param userDraft - The user data
    * @returns The new user
    * @throws Error if the username already exists
    * @throws Error if the email already exists
  */
  createUser(userDraft: UserDraft): User {
    if (this.users.some(user => user.username === userDraft.username)) {
      throw new Error("Username already exists");
    }
    if (this.users.some(user => user.email === userDraft.email)) {
      throw new Error("Email already exists");
    }
    const user = new User(
      this.idGenerator.getNextUserId(),
      userDraft.username,
      userDraft.email,
      userDraft.password,
      userDraft.name,
      userDraft.image,
      userDraft.backgroundImage
    );
    this.users.push(user);
    return user;
  }

  /*
    * Create an Artist
    * @param userId - The id of the user creating the artist
    * @param artistDraft - The artist data
    * @returns The user with the new artist
    * @throws Error if the user is not found
    * @throws Error if the artist name already exists
    * @throws UserError if the user already has an artist
  */
  createArtist(userId: string, artistDraft: ArtistDraft): User {
    const user = this.users.find(user => user.id === userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (this.users.map(user => user.artist?.name).includes(artistDraft.name)) {
      throw new Error("Artist name already exists");
    }
    user.createArtist(
      this.idGenerator.getNextArtistId(),
      artistDraft.name,
      artistDraft.image,
      artistDraft.backgroundImage
    );
    return user;
  }

  /*
    * Create a playlist
    * @param userId - The id of the user creating the playlist
    * @param playlistDraft - The playlist data
    * @returns The user with the new playlist
    * @throws Error if the user is not found
    * @throws Error if the playlist name already exists
  */
  createPlaylist(userId: string, playlistDraft: PlaylistDraft): User {
    const user = this.users.find(user => user.id === userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.playlists.some(playlist => playlist.name === playlistDraft.name)) {
      throw new Error("Playlist name already exists");
    }

    const playlist = user.createPlaylist(
      this.idGenerator.getNextPlaylistId(),
      playlistDraft.name,
      playlistDraft.image,
      [],
    );

    this.playlists.push(playlist)
    return user;
  }

  /*
    * Add a song to a playlist
    * @param userId - The id of the user adding the song
    * @param playlistId - The id of the playlist
    * @param songId - The id of the song
    * @returns The user with the updated playlist
    * @throws Error if the user is not found
    * @throws Error if the playlist is not found
    * @throws Error if the song is not found
  */
 addSongToPlaylist(userId: string, playlistId: string, songId: string): User {
  const user = this.users.find(user => user.id === userId);
  if (!user) {
    throw new Error("User not found");
  }
  const playlist = user.playlists.find(playlist => playlist.id === playlistId);
  if (!playlist) {
    throw new Error("Playlist not found");
  }
  const song = this.songs.find(song => song.id === songId);
  if (!song) {
    throw new Error("Song not found");
  }
  user.addSongToPlaylist(playlistId, song);
  return user;
 }

  /*
    * Create a song
    * @param userId - The id of the user creating the song
    * @param songDraft - The song data
    * @returns The user with the new song
    * @throws Error if the user is not found
    * @throws Error if the song name already exists
    * @throws UserError if the user does not have an artist
  */
  createSong(userId: string, songDraft: SongDraft): User {
    const user = this.users.find(user => user.id === userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (this.songs.some(song => song.name === songDraft.name && song.artist === user.artist)) {
      throw new Error("Song name already exists");
    }
    const artist = user.artist;
    if (!artist) {
      throw new Error("User does not have an artist");
    }
    const tags = this.tags.filter(tag => songDraft.tagIds.includes(tag.id));
    const song = new Song(
      this.idGenerator.getNextSongId(),
      songDraft.name,
      songDraft.duration,
      artist,
      tags,
      songDraft.audio
    );
    this.songs.push(song);
    return user;
  }

  /*
    * Create a tag
    * @param name - The name of the tag
    * @returns The new tag
    * @throws Error if the tag name already exists
  */
  createTag(name: string): Tag {
    if (this.tags.some(tag => tag.name === name)) {
      throw new Error("Tag name already exists");
    }
    const tag = new Tag(this.idGenerator.getNextTagId(), name);
    this.tags.push(tag);
    return tag;
  }

}