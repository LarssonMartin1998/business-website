import { border, from, raw, to } from 'design-system/colors';
import { twMerge } from 'tailwind-merge';
import { LogotypeLight, Rss } from 'components/generated/index';

function Footer() {
  return (
    <div className={twMerge(from(raw.firGreen), to(raw.firGreenLight), border('accent'), 'bg-gradient-to-b border-t-2 shadow-2xl flex flex-col justify-center min-h-50')}>
      <div className='flex justify-center'>
        <div className='flex gap-x-12'>

          <div>
            <LogotypeLight />
            <span><Rss />RSS</span>
          </div>

          <nav>
            <ul>
              <li>Home</li>
              <li>Contact</li>
              <li>Blog</li>
            </ul>
          </nav>

          <nav>
            <ul>
              <li>LinkedIn</li>
              <li>Github</li>
              <li>Mastodon</li>
            </ul>
          </nav>

        </div>

      </div>
    </div>
  );
}

export default Footer;
