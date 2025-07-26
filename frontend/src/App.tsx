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
        <div className={twMerge(base.bg.default, 'flex', 'h-64', 'justify-center')}>
          <ul className={twMerge('flex', 'items-center', 'gap-x-10', 'text-3xl', base.fg.default)}>
            <li>Farm Heroes Saga</li>
            <li>Mannequin</li>
            <li>Cities VR</li>
            <li>The Curious Tale of the Stolen Pets</li>
            <li>Apex Construct</li>
          </ul>
        </div>
        <div className={twMerge(base.bg.accent, 'flex', 'h-128', 'justify-center', 'p-5')}>
          <h2 className={twMerge(base.fg.accent, 'font-bold', 'text-5xl')}>Services</h2>
          <p className={base.bg.accent}></p>
        </div>
      </main>
    </>
  )
}

export default App;
