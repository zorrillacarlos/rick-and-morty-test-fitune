import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useFavoritesStore } from "../app/stores/favorites";
import type { CharacterData } from "../app/types/characters";

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  writable: true,
});

const mockCharacter = (id: string): CharacterData => ({
  id,
  name: `Character ${id}`,
  species: "Human",
  status: "Alive",
  image: `https://example.com/${id}.jpg`,
  origin: { name: "Earth" },
});

describe("useFavoritesStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockClear();
  });

  it("initializes with an empty favorites list", () => {
    const store = useFavoritesStore();
    expect(store.favorites).toHaveLength(0);
  });

  it("adds a character when toggled", () => {
    const store = useFavoritesStore();
    store.toggle(mockCharacter("1"));
    expect(store.isFavorite("1")).toBe(true);
    expect(store.favorites).toHaveLength(1);
  });

  it("removes a character when toggled a second time", () => {
    const store = useFavoritesStore();
    store.toggle(mockCharacter("1"));
    store.toggle(mockCharacter("1"));
    expect(store.isFavorite("1")).toBe(false);
    expect(store.favorites).toHaveLength(0);
  });

  it("handles multiple characters independently", () => {
    const store = useFavoritesStore();
    store.toggle(mockCharacter("1"));
    store.toggle(mockCharacter("2"));
    store.toggle(mockCharacter("3"));
    expect(store.favorites).toHaveLength(3);
    expect(store.isFavorite("1")).toBe(true);
    expect(store.isFavorite("2")).toBe(true);
    expect(store.isFavorite("3")).toBe(true);
  });

  it("returns false for a character that was never added", () => {
    const store = useFavoritesStore();
    expect(store.isFavorite("99")).toBe(false);
  });

  it("removes only the toggled character, leaving others intact", () => {
    const store = useFavoritesStore();
    store.toggle(mockCharacter("1"));
    store.toggle(mockCharacter("2"));
    store.toggle(mockCharacter("1"));
    expect(store.isFavorite("1")).toBe(false);
    expect(store.isFavorite("2")).toBe(true);
    expect(store.favorites).toHaveLength(1);
  });

  it("persists favorites to localStorage on toggle", () => {
    const store = useFavoritesStore();
    const char = mockCharacter("1");
    store.toggle(char);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "rm-favorites",
      JSON.stringify([char])
    );
  });

  it("loads favorites from localStorage", () => {
    const chars = [mockCharacter("5"), mockCharacter("10")];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(chars));
    const store = useFavoritesStore();
    store.load();
    expect(store.favorites).toHaveLength(2);
    expect(store.isFavorite("5")).toBe(true);
    expect(store.isFavorite("10")).toBe(true);
  });
});
