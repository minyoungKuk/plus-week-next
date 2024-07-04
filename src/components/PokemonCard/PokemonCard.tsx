import { Pokemon } from "@/app/types/pokemon.type";
import Image from "next/image";
import Link from "next/link";

type PokemonCardProps = {
  pokemon: Pokemon;
};

function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <li
      className="p-4 border border-white rounded-lg box-border transition-all hover:scale-105"
      key={pokemon.id}
    >
      <Link
        className="flex flex-col justify-center items-center"
        href={`/pokemon/${pokemon.id}`}
      >
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
  );
}

export default PokemonCard;
