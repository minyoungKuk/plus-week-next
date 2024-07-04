import axios from "axios";
import { NextResponse } from "next/server";

const PAGE_SIZE = 20;
const TOTAL_POKEMON = 151;

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const offset = (page - 1) * PAGE_SIZE;

    if (offset >= TOTAL_POKEMON) {
      return NextResponse.json([]);
    }

    // 불러올 포켓몬 갯수 체크
    const fetchCount = Math.min(PAGE_SIZE, TOTAL_POKEMON - offset);

    const allPokemonPromises = Array.from(
      { length: fetchCount },
      (_, index) => {
        const id = offset + index + 1;
        return Promise.all([
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
          axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
        ]);
      }
    );

    const allPokemonResponses = await Promise.all(allPokemonPromises);

    const allPokemonData = allPokemonResponses.map(
      ([response, speciesResponse]) => {
        const koreanName = speciesResponse.data.names.find(
          (name: any) => name.language.name === "ko"
        );
        return { ...response.data, korean_name: koreanName?.name || null };
      }
    );

    return NextResponse.json(allPokemonData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
