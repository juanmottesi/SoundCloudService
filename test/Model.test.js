import { describe, expect, test } from "bun:test";
import { Artist, Tag, User, Song } from "../src/Model";

describe("User", () => {

  test("should create a new user", () => {
    const user = new User('u_1', 'username', 'email', 'password', 'name', 'image', 'backgroundImage');
    expect(user.id).toBe('u_1');
    expect(user.username).toBe('username');
    expect(user.email).toBe('email');
    expect(user.password).toBe('password');
    expect(user.name).toBe('name');
    expect(user.image).toBe('image');
    expect(user.backgroundImage).toBe('backgroundImage');
  });

  test("create artist without artist", () => {
    const user = new User('u_1', 'username', 'email', 'password', 'name', 'image', 'backgroundImage');
    expect(user.artist).toBe(null);
    user.createArtist('a_1', 'name', 'image', 'backgroundImage');
    expect(user.artist.id).toBe('a_1');
    expect(user.artist.name).toBe('name');
    expect(user.artist.image).toBe('image');
    expect(user.artist.backgroundImage).toBe('backgroundImage');
  });

  test("create artist with artist", () => {
    const user = new User('u_1', 'username', 'email', 'password', 'name', 'image', 'backgroundImage');
    user.createArtist('a_1', 'name', 'image', 'backgroundImage');
    expect(() => user.createArtist('a_2', 'name', 'image', 'backgroundImage')).toThrow('Already has an artist.');
  });

  test("create playlist", () => {
    const user = new User('u_1', 'username', 'email', 'password', 'name', 'image', 'backgroundImage');
    expect(user.playlists.length).toBe(0);
    user.createPlaylist('p_1', 'name', 'image');
    expect(user.playlists[0].id).toBe('p_1');
    expect(user.playlists[0].name).toBe('name');
    expect(user.playlists[0].image).toBe('image');
    expect(user.playlists.length).toBe(1);
  });

  test("create playlist with same name", () => {
    const user = new User('u_1', 'username', 'email', 'password', 'name', 'image', 'backgroundImage');
    expect(user.playlists.length).toBe(0);
    user.createPlaylist('p_1', 'name', 'image');
    expect(user.playlists.length).toBe(1);
    expect(() => user.createPlaylist('p_2', 'name', 'image')).toThrow('Name is repeated');
  });

  test("Add song to playlist", () => {
    const user = new User('u_1', 'username', 'email', 'password', 'name', 'image', 'backgroundImage');
    expect(user.playlists.length).toBe(0);
    user.createPlaylist('p_1', 'name', 'image', []);
    expect(user.playlists.length).toBe(1);
    const song = new Song('s_1', 'name', 120, new Artist('a_1', 'name', 'image', 'backgroundImage'), [new Tag('t_1', 'name')], 'audio')
    user.addSongToPlaylist('p_1', song);
    expect(user.playlists[0].songs.length).toBe(1);
    expect(user.playlists[0].songs[0].id).toBe('s_1');
    expect(user.playlists[0].songs[0].name).toBe('name');
    expect(user.playlists[0].songs[0].duration).toBe(120);
    expect(user.playlists[0].songs[0].audio).toBe('audio');
  });
});