import Header from './Header'
import Container from './Container'
import Footer from './Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <Container />
      <Footer />
    </div>
  )
}
