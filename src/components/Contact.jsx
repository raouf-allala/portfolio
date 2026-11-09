import Cv from '../assets/Raouf-Allala-CV.pdf';
import { EMAIL, SOCIALS } from '../lib/socials';
import { Label, Magnetic, RevealText } from './Fx';
import { ArrowUpRight, Download, Mail } from './Icons';
import Footer from './Footer';

export default function Contact({ onReachEnd }) {
  return (
    <>
      <section
        id="contact"
        data-bg="#b6ffe9"
        data-fg="#08231b"
        aria-labelledby="contact-title"
        className="relative overflow-hidden py-28 text-on-mint sm:py-44"
      >
        <div className="page relative">
          <h2
            id="contact-title"
            className="font-display text-[clamp(3.25rem,11vw,10rem)]"
          >
            <RevealText text="Let’s build" className="block" />
            <RevealText text="something." className="block" delay={0.12} />
          </h2>
          <p className="mt-8 max-w-[40ch] text-lg text-on-mint/75">
            That&apos;s my story so far. If you&apos;ve got a project, a role, or you just want to talk games, my
            inbox is open.
          </p>

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Label className="text-on-mint/60">Player 2, press start</Label>
              <a
                href={`mailto:${EMAIL}`}
                data-cursor="Email"
                className="group mt-3 flex max-w-full items-center gap-3 font-display text-[clamp(1.25rem,5.4vw,2.6rem)] leading-tight [overflow-wrap:anywhere] lg:whitespace-nowrap"
              >
                <span className="link-draw pb-1">{EMAIL}</span>
                <ArrowUpRight
                  size={36}
                  className="hidden shrink-0 transition-transform duration-300 ease-(--ease-out) group-hover:-translate-y-1 group-hover:translate-x-1 sm:block"
                />
              </a>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <Magnetic>
                <a href={`mailto:${EMAIL}`} className="btn btn-dark">
                  <Mail size={18} /> Email me
                </a>
              </Magnetic>
              <Magnetic>
                <a href={Cv} download className="btn bg-on-mint/10 hover:bg-on-mint/20">
                  Résumé <Download size={16} />
                </a>
              </Magnetic>
              {SOCIALS.map(({ label, href, Icon }) => (
                <Magnetic key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="btn h-[3.25rem] w-[3.25rem] bg-on-mint/10 !px-0 hover:bg-on-mint/20"
                  >
                    <Icon size={20} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer onReachEnd={onReachEnd} />
    </>
  );
}
