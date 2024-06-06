import { getAllPokemon } from '@/tools/api'
import PokemonQuery from '@/app/_partials/PokemonQuery'
import PageTitle from '@/components/PageTitle'

const HomePage = async () => {
  // There is no pokemon API to call per query by name
  // So we call all of them in server and filter in client.
  const { results } = await getAllPokemon()
  const sortedResult = results.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <main className='mx-auto max-w-[400px] before:table'>
      <div className='rounded-br-4xl rounded-bl-4xl mx-auto mt-8 w-[87.5%] bg-white'>
        <PageTitle>
          Type any <br />
          Pokemon name
        </PageTitle>
        <PokemonQuery list={sortedResult} />
      </div>
    </main>
  )
}

export default HomePage
