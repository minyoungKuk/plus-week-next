"use client";

import { Pokemon } from "@/app/types/pokemon.type";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Spinner from "../Spinner";

type PokemonDetailProps = {
  id: string;
};

function PokemonDetail({ id }: PokemonDetailProps) {
  const {
    data: pokemon,
    isLoading,
    isError,
  } = useQuery<Pokemon>({
    queryKey: ["pokemon", id],
    queryFn: async () => {
      const response = await fetch(`/api/pokemons/${id}`);
      if (!response.ok) {
        throw new Error(`${id}번째 오류`);
      }

      return response.json();
    },
  });

  if (isLoading) return <Spinner />;
  if (isError || !pokemon) return <div>error..</div>;

  return (
    <article className="max-w-[480px] mx-auto flex flex-col items-center h-screen justify-center">
      <div className="bg-white rounded-lg text-black">
        <div className="p-4 text-align w-full bg-slate-500">
          <h2>{pokemon.korean_name}</h2>
          <p>No. 000{id}</p>
        </div>

        <div className="flex flex-col items-center justify-center p-6">
          <Image
            width={100}
            height={100}
            src={pokemon.sprites.front_default}
            alt={pokemon.korean_name}
          />
          <div> 이름: {pokemon.korean_name} </div>
          <div>
            키: {pokemon.height} 무게: {pokemon.weight}
          </div>
          <div>
            <div>
              타입:
              {pokemon.types.map((type, index) => (
                <span
                  className="inline-block bg-yellow-200 py-0.5 px-1 rounded-md mr-1 text-sm"
                  key={index}
                >
                  {type.type.korean_name}
                </span>
              ))}
            </div>
            <div>
              특성:
              {pokemon.abilities.map((ability, index) => (
                <span
                  className="inline-block bg-green-200 py-0.5 px-1 rounded-md mr-1 text-sm"
                  key={index}
                >
                  {ability.ability.korean_name}
                </span>
              ))}
            </div>
          </div>
          <div className="py-4">
            기술:
            {pokemon.moves.map((move, index) => (
              <span key={index}>{move.move.korean_name}</span>
            ))}
          </div>

          <Link
            href="/"
            className="px-4 py-2 bg-blue-400 rounded-md hover:brightness-90 text-white"
          >
            뒤로 가기
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PokemonDetail;
