import PokemonDetail from "@/components/PokemonDetail";
import { fetchPokemon } from "@/utils/fetchPokemon";
import { Metadata } from "next";
import Link from "next/link";

export type ParamsProps = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const id = params.id;
  const pokemon = await fetchPokemon(id);

  return {
    title: pokemon.name,
    description: `${pokemon.name}의 상세 정보`,
  };
}

function DetailPage({ params }: ParamsProps) {
  const { id } = params;

  return (
    <div>
      <PokemonDetail id={id} />
      <p>도감번호: {id}</p>
      <Link href="/">뒤로 가기</Link>
    </div>
  );
}

export default DetailPage;
