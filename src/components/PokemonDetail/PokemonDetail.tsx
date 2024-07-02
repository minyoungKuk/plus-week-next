"use client";

import { Pokemon } from "@/app/types/pokemon.type";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

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

  if (isLoading) return <div>loading..</div>;
  if (isError || !pokemon) return <div>error..</div>;

  console.log(pokemon);

  // 이름 / 넘버 / 이미지 / 또 이름 / 키랑 무게 / 타입이랑 특성 / 그리고 .. 기술 .. ㅎㅎ 그리고 뒤로 가기 ^^ ~

  return (
    <article>
      <div>
        <h2>{pokemon.korean_name}</h2>
        <p>No. 000{id}</p>
      </div>

      <div>
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
              <span key={index}>{type.type.korean_name}</span>
            ))}
          </div>
          <div>
            특성:
            {pokemon.abilities.map((ability, index) => (
              <span key={index}>{ability.ability.korean_name}</span>
            ))}
          </div>
        </div>
        <div>
          기술:
          {pokemon.moves.map((move, index) => (
            <span key={index}>{move.move.korean_name}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default PokemonDetail;
