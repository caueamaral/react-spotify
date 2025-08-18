import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Content from './components/Content'

function App() {
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <Content />
      </main>
    </>
  )
}

export default App