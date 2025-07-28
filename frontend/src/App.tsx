import Header from './components/Header';
import Hero from './components/Hero'
import { CardAccent, ListCardDefault } from './components/Card';
import { base, hover } from './designSystem/colors';
import { twMerge } from 'tailwind-merge';
import { CustomButton, DefaultButton } from './components/Button';
import { CogWheels, Layers, Lightbulb, LinkedinLogo, GithubLogo, MastodonLogo } from './components/generated/index';

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
          <ul className={twMerge('font-bold flex items-center gap-x-10 text-3xl', base.fg.default)}>
            <li>FARM HEROES SAGA</li>
            <li>ATLAS</li>
            <li>MANNEQUIN</li>
            <li>CITIES VR</li>
            <li>THE CURIOUS TALE OF THE STOLEN PETS</li>
          </ul>
        </div>
        <div className={twMerge(base.bg.accent, 'p-8')}>
          <div className='flex flex-col items-center'>
            <h2 className={twMerge(base.fg.accent, 'font-bold', 'text-5xl')}>Services</h2>
            <p className={twMerge(base.fg.accent, 'text-center', 'w-1/2', 'mt-4')}>Lorem, ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempus vitae ante sed lobortis. Sed posuere hendrerit purus, eu cursus purus facilisis eget. Quisque sodales vitae lacus pretium blandit. Maecenas at sem euismod, interdum elit eget, mattis tortor. Etiam sed molestie arcu, nec euismod sem. Maecenas tincidunt venenatis leo eu.</p>
            <ul className='flex mt-10 gap-x-14'>
              <ListCardDefault className='w-64 h-80'>
                <div className='flex flex-col items-center'>
                  <CogWheels className='w-24 h-24 text-fir-green' />
                  <h3 className='text-fir-green font-bold mt-2'>Reliable Systems</h3>
                </div>
                <p className={twMerge(base.fg.default, 'mt-4', 'min-h-24')}>I design robust, maintainable solutions that scale with your business for long-term value.</p>
              </ListCardDefault>
              <ListCardDefault className='w-64 h-80'>
                <div className='flex flex-col items-center'>
                  <Layers className='w-22 h-22 mt-2 text-fir-green' />
                  <h3 className='text-fir-green font-bold mt-2'>Full-Stack Expertise</h3>
                </div>
                <p className={twMerge(base.fg.default, 'mt-4', 'min-h-24')}>From backend to frontend, Game Engine to Gameplay, automated tools, and deployment.</p>
              </ListCardDefault>
              <ListCardDefault className='w-64 h-80'>
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
        </div>
        <div className={twMerge(base.bg.default, base.border.default, 'relative border-y-2 flex flex-col min-h-64 p-8 pb-12')}>
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
        <div className='relative'>
          <div className={twMerge(base.bg.alert, 'h-64 pb-10 flex flex-col items-center justify-center')}>
            <CustomButton className='font-bold border-3' size='xl' border={{ default: 'border-cloud-haze' }} bg={{ default: base.bg.alert, hover: 'hover:bg-birch-white' }} fg={{ default: base.fg.accent, hover: 'hover:text-rust-orange' }}>DOWNLOAD RESUME</CustomButton>
          </div>
          <div className='absolute h-20 -bottom-8 left-0 w-full -skew-y-2 bg-fir-green z-0 pointer-events-none border-t-2 border-t-moss-teal' />
        </div>
        <div className={twMerge(base.bg.accent, 'relative h-96 p-4 pt-0 flex flex-col items-center')}>
          <h2 className={twMerge(base.fg.accent, 'font-bold', 'text-center', 'text-5xl')}>Socials</h2>
          <CardAccent className='my-auto w-auto h-auto p-12'>
            <div className='flex gap-x-20'>
              <LinkedinLogo className={twMerge(base.fg.default, 'w-32 h-32')} />
              <GithubLogo className={twMerge(base.fg.default, 'w-32 h-32')} />
              <MastodonLogo className={twMerge(base.fg.default, 'w-32 h-32')} />
            </div>
          </CardAccent>
          <div className='absolute h-30 -bottom-12 left-0 w-full -skew-y-3 bg-rust-orange z-20 pointer-events-none' />
        </div>
        <div className='h-24 bg-rust-orange z-20' />
      </main>
    </>
  )
}

export default App;
