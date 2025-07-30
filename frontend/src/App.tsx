import Header from 'components/home/Header';
import Hero from 'components/home/Hero'
import Clients from 'components/home/Clients';
import Services from 'components/home/Services';
import Posts from 'components/home/Posts';
import Resume from 'components/home/Resume';
import Socials from 'components/home/Socials';

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <Clients />

        <Services />

        <Posts />

        <Resume />

        <Socials />
      </main >
    </>
  )
}

export default App;
