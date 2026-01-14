"use client";

import NextLink from "next/link";
import {
  FocusEventHandler,
  Fragment,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  Transition,
} from "@headlessui/react";
import cn from "clsx";
import { Search, X } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

import { useSearch } from "@/lib/search";
import type { SearchResult } from "@/lib/search";
import { groupResults } from "@/lib/search";

const INPUTS = new Set(["INPUT", "SELECT", "BUTTON", "TEXTAREA"]);

export default function SearchBar() {
  const { state, inputRef, handleSelect, handleFocus, handleChange } =
    useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null!);

  const isMac =
    typeof navigator !== "undefined"
      ? navigator.userAgent.includes("Mac")
      : false;

  useHotkeys(
    isMac ? "meta+k" : "ctrl+k",
    (e) => {
      e.preventDefault();
      setIsOpen(true);
    },
    { enableOnFormTags: true }
  );

  useHotkeys(
    "/",
    (e) => {
      const el = document.activeElement;
      if (
        !el ||
        INPUTS.has(el.tagName) ||
        (el as HTMLElement).isContentEditable
      ) {
        return;
      }
      e.preventDefault();
      setIsOpen(true);
    },
    { enableOnFormTags: true }
  );

  useEffect(() => {
    if (isOpen) requestAnimationFrame(() => searchInputRef.current?.select());
  }, [isOpen]);

  const handleFocusInput: FocusEventHandler = (event) => handleFocus(event);
  const handleQueryChange = (event: SyntheticEvent<HTMLInputElement>) =>
    handleChange(event);

  return (
    <>
      <button
        type="button"
        aria-label="Open search"
        onClick={() => setIsOpen(true)}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-[--radius]",
          "text-[--muted]",
          "transition-colors",
          "hover:bg-[--selection-background] hover:text-[--fg]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--selection-background]"
        )}
      >
        <Search className="h-5 w-5" />
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          onClose={() => setIsOpen(false)}
          initialFocus={searchInputRef}
          className="relative z-50"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* No hardcoded overlay colors; rely on bg + opacity only */}
            <div className="bg-[--bg]/80 fixed inset-0 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto p-4 md:p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-[0.97] translate-y-2"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-[0.97] translate-y-2"
            >
              <Dialog.Panel
                className={cn(
                  "mx-auto w-full max-w-xl",
                  "rounded-[calc(var(--radius)+0.25rem)]",
                  "border border-[--border-accent]",
                  "bg-[--bg]",
                  "text-[--fg]",
                  "shadow-lg"
                )}
              >
                <Dialog.Title className="sr-only">Search</Dialog.Title>

                <Combobox
                  onChange={(value: SearchResult) => {
                    handleSelect(value);
                    setIsOpen(false);
                  }}
                >
                  <div className="relative flex items-center px-3 pt-3">
                    <Search
                      className={cn(
                        "pointer-events-none absolute left-5 h-5 w-5",
                        "text-[--muted]"
                      )}
                    />

                    <ComboboxInput
                      spellCheck={false}
                      autoComplete="off"
                      type="search"
                      ref={(node) => {
                        if (node) {
                          searchInputRef.current = node;
                          if (typeof inputRef === "object" && inputRef) {
                            (
                              inputRef as React.MutableRefObject<HTMLInputElement | null>
                            ).current = node;
                          }
                        }
                      }}
                      className={cn(
                        "w-full rounded-[--radius]",
                        "bg-transparent",
                        "py-2 pl-10 pr-12 text-base md:text-sm",
                        "text-[--fg] placeholder:text-[--muted]",
                        "focus:outline-none focus:ring-2 focus:ring-[--selection-background]",
                        "transition-shadow",
                        "[&::-webkit-search-cancel-button]:appearance-none"
                      )}
                      onChange={handleQueryChange}
                      onFocus={handleFocusInput}
                      onBlur={handleFocusInput}
                      value={state.query}
                      placeholder="Type to search..."
                    />

                    <div className="absolute right-4 flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Close search"
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "rounded-[--radius] p-1",
                          "text-[--muted]",
                          "hover:bg-[--selection-background] hover:text-[--fg]",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[--selection-background]"
                        )}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <ComboboxOptions
                    static
                    className={cn(
                      "mt-3 max-h-[min(60vh,420px)] scroll-py-2 overflow-y-auto",
                      "border-t border-[--border-accent]",
                      "px-1.5 py-2",
                      "text-[--fg]",
                      "empty:py-8 empty:text-center empty:text-sm empty:text-[--muted]"
                    )}
                  >
                    {state.error ? (
                      <div className="px-4 py-2 text-sm">
                        <b className="font-medium">Search failed:</b>{" "}
                        {String(state.error)}
                      </div>
                    ) : state.isLoading ? (
                      <div className="px-4 py-2 text-sm text-[--muted]">
                        Loading…
                      </div>
                    ) : state.results.length > 0 ? (
                      <SearchResults results={state.results} />
                    ) : (
                      state.query && "No results found."
                    )}
                  </ComboboxOptions>
                </Combobox>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function SearchResults({ results }: { results: SearchResult[] }) {
  const groupedResults = groupResults(results);

  return (
    <>
      {Object.entries(groupedResults).map(([section, sectionResults]) => (
        <div key={section}>
          <div
            className={cn(
              "not-first:mt-6 mx-2.5 mb-2 select-none",
              "border-b border-[--md-border]",
              "px-2.5 pb-1.5 text-xs font-semibold uppercase",
              "text-[--muted]"
            )}
          >
            {section}
          </div>

          {sectionResults.map((result) => (
            <ComboboxOption
              key={result.id}
              as={NextLink}
              value={result}
              href={result.url}
              className={({ focus }) =>
                cn(
                  "mx-2.5 block scroll-m-12 break-words rounded-[--radius] px-2.5 py-2",
                  focus
                    ? "bg-[--selection-background] text-[--fg]"
                    : "text-[--fg]"
                )
              }
            >
              <div className="text-base font-semibold leading-5">
                {result.title}
              </div>

              {result.excerpt && (
                <div
                  className={cn(
                    "mt-1 text-sm leading-[1.35rem] text-[--muted]",
                    "[&_mark]:bg-[--mark-background] [&_mark]:text-[--mark-foreground]"
                  )}
                  dangerouslySetInnerHTML={{ __html: result.excerpt }}
                />
              )}
            </ComboboxOption>
          ))}
        </div>
      ))}
    </>
  );
}
