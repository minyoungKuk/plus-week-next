"use client";

import { Pokemon } from "@/app/types/pokemon.type";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

function PokemonList() {
  const {
    data: pokemons = [],
    isLoading,
    isError,
  } = useQuery<Pokemon[]>({
    queryKey: ["pokemons"],
    queryFn: async () => {
      const response = await fetch("/api/pokemons");
      return response.json();
    },

    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) return <div> loading.. </div>;
  if (isError) return <div> error.. </div>;

  return (
    <div>
      <h2> 포켓몬 리스트 </h2>
      <ol>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <Image
                width={100}
                height={100}
                src={pokemon.sprites.front_default}
                alt={pokemon.korean_name}
              />
              {pokemon.korean_name}
              <p>도감번호: {pokemon.id}</p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default PokemonList;
