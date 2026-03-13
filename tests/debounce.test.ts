import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { debounce } from "../app/utils/debounce";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not call the function immediately", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);
    debounced();
    expect(fn).not.toHaveBeenCalled();
  });

  it("calls the function once after the delay", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);
    debounced();
    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledOnce();
  });

  it("only calls the function once for multiple rapid calls", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);
    debounced();
    debounced();
    debounced();
    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledOnce();
  });

  it("calls the function with the last set of arguments", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);
    debounced("first");
    debounced("second");
    debounced("last");
    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledWith("last");
  });

  it("resets the timer on each call", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);
    debounced();
    vi.advanceTimersByTime(200);
    debounced();
    vi.advanceTimersByTime(200);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledOnce();
  });

  it("allows the function to be called again after the delay expires", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);
    debounced();
    vi.advanceTimersByTime(300);
    debounced();
    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
