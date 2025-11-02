
import './App.css'
import { Layout } from './components/Layout/Layout'
import ListView from './features/list/components/ListView'

function App() {

  return (
    <Layout> 
      <div className="space-y-8">
        <ListView />
      </div>
    </Layout>
  )
}

export default App
