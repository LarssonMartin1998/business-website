import Header from './components/Header';
import Hero from './components/Hero'
import { base } from './designSystem/colors';
import { twMerge } from 'tailwind-merge';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero
          headline='Martin Larsson &nbsp;'
          subheadline='|&nbsp; Senior Consultant'
          paragraph='I help teams build cool shit in C++, C, Zig, Rust and other wack languages.'
        />
      </main>
    </>
  )
}

export default App;
