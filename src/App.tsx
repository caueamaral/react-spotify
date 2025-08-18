import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Content from './components/Content'

function App() {
  return (
    <>
      <Header />
      <main className="bg-gray-700 text-gray-100">
        <Sidebar />
        <Content />
      </main>
    </>
  )
}

export default App