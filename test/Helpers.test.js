import { describe, expect, test } from "bun:test";
import { IdGenerator } from "../src/Helpers";

describe("IdGenerator", () => {
  test("should generate a unique user id", () => {
    const idGenerator = new IdGenerator();
    expect(idGenerator.getNextUserId()).toBe('user_0');
    expect(idGenerator.getNextUserId()).toBe('user_1');
  });

  test("should generate a unique song id", () => {
    const idGenerator = new IdGenerator();
    expect(idGenerator.getNextSongId()).toBe('song_0');
    expect(idGenerator.getNextSongId()).toBe('song_1');
  });

  test("should generate a unique playlist id", () => {
    const idGenerator = new IdGenerator();
    expect(idGenerator.getNextPlaylistId()).toBe('playlist_0');
    expect(idGenerator.getNextPlaylistId()).toBe('playlist_1');
  });

  test("should generate a unique artist id", () => {
    const idGenerator = new IdGenerator();
    expect(idGenerator.getNextArtistId()).toBe('artist_0');
    expect(idGenerator.getNextArtistId()).toBe('artist_1');
  });

  test("should generate a unique tag id", () => {
    const idGenerator = new IdGenerator();
    expect(idGenerator.getNextTagId()).toBe('tag_0');
    expect(idGenerator.getNextTagId()).toBe('tag_1');
  });
});