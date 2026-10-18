export const MIN_SEARCH_QUERY_LENGTH = 3;

export function canSearch(query) {
  return (
    typeof query === "string" && query.trim().length >= MIN_SEARCH_QUERY_LENGTH
  );
}
