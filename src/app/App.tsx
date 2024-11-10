import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { RepositoryPage } from '@/pages/RepositoryPage'


function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/repository/:owner/:name" element={<RepositoryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App 