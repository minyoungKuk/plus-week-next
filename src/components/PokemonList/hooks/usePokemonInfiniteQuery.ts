import { Pokemon } from "@/app/types/pokemon.type";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePokemonInfiniteQuery = () => {
  return useInfiniteQuery<Pokemon[], Error>({
    queryKey: ["pokemons"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(`/api/pokemons?page=${pageParam}`);
      const data = await response.json();
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 20) {
        return undefined;
      } else {
        return allPages.length + 1;
      }
    },
    initialPageParam: 1,
  });
};
