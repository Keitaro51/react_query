import './App.css'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import Users from './components/Users'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // Durée de mise en cache globale de 60 secondes (1 minute)
      //cacheTime: 1000 * 60 * 60 * 24
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
      {/* Facultatif : Outil de développement de React Query */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
