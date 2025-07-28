import Header from './components/Header';
import Hero from './components/Hero'
import { ListCardDefault } from './components/Card';
import { base, hover } from './designSystem/colors';
import { twMerge } from 'tailwind-merge';
import { CustomButton } from './components/Button';
import { CogWheels, Layers, Lightbulb } from './components/generated/index';

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
        <div className={twMerge(base.bg.default, base.border.default, 'border-y-2', 'flex', 'h-64', 'justify-center')}>
          <ul className={twMerge('flex', 'items-center', 'gap-x-10', 'text-3xl', base.fg.default)}>
            <li>Farm Heroes Saga</li>
            <li>Atlas</li>
            <li>Mannequin</li>
            <li>Cities VR</li>
            <li>The Curious Tale of the Stolen Pets</li>
            <li>Apex Construct</li>
          </ul>
        </div>
        <div className={twMerge(base.bg.accent, 'p-4', 'flex', 'flex-col', 'items-center')}>
          <h2 className={twMerge(base.fg.accent, 'font-bold', 'text-5xl')}>Services</h2>
          <p className={twMerge(base.fg.accent, 'text-center', 'w-1/2', 'mt-4')}>Lorem, ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempus vitae ante sed lobortis. Sed posuere hendrerit purus, eu cursus purus facilisis eget. Quisque sodales vitae lacus pretium blandit. Maecenas at sem euismod, interdum elit eget, mattis tortor. Etiam sed molestie arcu, nec euismod sem. Maecenas tincidunt venenatis leo eu.</p>
          <ul className='flex mt-10 gap-x-14'>
            {/* I design robust, maintainable solutions that scale with your business — no quick fixes, just long-term value. */}
            <ListCardDefault w='w-64' h='h-80'>
              <div className='flex flex-col items-center'>
                <CogWheels className='w-24 h-24 text-fir-green' />
                <h3 className='text-fir-green font-bold mt-2'>Reliable Systems</h3>
              </div>
              <p className={twMerge(base.fg.default, 'mt-4', 'min-h-24')}>I design robust, maintainable solutions that scale with your business for long-term value.</p>
            </ListCardDefault>
            <ListCardDefault w='w-64' h='h-80'>
              <div className='flex flex-col items-center'>
                <Layers className='w-22 h-22 mt-2 text-fir-green' />
                <h3 className='text-fir-green font-bold mt-2'>Full-Stack Expertise</h3>
              </div>
              <p className={twMerge(base.fg.default, 'mt-4', 'min-h-24')}>From backend to frontend, Game Engine to Gameplay, automated tools, and deployment.</p>
            </ListCardDefault>
            <ListCardDefault w='w-64' h='h-80'>
              <div className='flex flex-col items-center'>
                <Lightbulb className='w-24 h-24 text-fir-green' />
                <h3 className='text-fir-green font-bold mt-2'>From Idea to Delivery</h3>
              </div>
              <p className={twMerge(base.fg.default, 'mt-4', 'min-h-24')}>I help bring your product vision to life. Clearly, efficiently, and with full execution from start to finish.</p>
            </ListCardDefault>
          </ul>
          <div className='flex gap-x-4 mt-4 p-8'>
            <CustomButton bg={{ default: base.bg.accent, hover: hover.bg.accent }} fg={{ default: base.fg.accent }}>Get in touch</CustomButton>
            <CustomButton border={{ default: 'border-birch-white' }} bg={{ default: base.bg.accent, hover: 'hover:bg-birch-white' }} fg={{ default: base.fg.accent, hover: 'hover:text-fir-green' }}>Book</CustomButton>
          </div>
        </div>
        <div className={twMerge(base.bg.default, base.border.default, 'border-y-2', 'flex', 'flex-col', 'min-h-64', 'p-4', 'pb-8')}>
          <h2 className={twMerge(base.fg.accentText, 'font-bold', 'text-center', 'text-5xl')}>Posts</h2>
          <ul className='flex justify-center gap-x-20 mt-10'>
            <li className='max-w-1/5'>
              <h3 className={twMerge(base.fg.default, 'font-bold')}>Header</h3>
              <p className={twMerge(base.fg.default, 'italic mt-1')}>Lorem, ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempus vitae ante sed lobortis. Sed posuere hendrerit purus, eu cursus purus facilisis eget. Quisque sodales vitae lacus pretium blandit...</p>
            </li>
            <li className='max-w-1/5'>
              <h3 className={twMerge(base.fg.default, 'font-bold')}>Header</h3>
              <p className={twMerge(base.fg.default, 'italic mt-1')}>Lorem, ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempus vitae ante sed lobortis. Sed posuere hendrerit purus, eu cursus purus facilisis eget. Quisque sodales vitae lacus pretium blandit...</p>
            </li>
            <li className='max-w-1/5'>
              <h3 className={twMerge(base.fg.default, 'font-bold')}>Header</h3>
              <p className={twMerge(base.fg.default, 'italic mt-1')}>Lorem, ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempus vitae ante sed lobortis. Sed posuere hendrerit purus, eu cursus purus facilisis eget. Quisque sodales vitae lacus pretium blandit...</p>
            </li>
          </ul>
        </div>
        <div className={twMerge(base.bg.alert, 'h-96', 'p-4')}>
          <h2 className={twMerge(base.fg.alert, 'font-bold', 'text-center', 'text-5xl')}>Resume</h2>
        </div>
        <div className={twMerge(base.bg.accent, 'h-96', 'p-4', 'border-t-2', base.border.accent)}>
          <h2 className={twMerge(base.fg.accent, 'font-bold', 'text-center', 'text-5xl')}>Socials</h2>
        </div>
      </main>
    </>
  )
}

export default App;
