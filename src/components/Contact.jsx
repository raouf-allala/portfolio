import { motion } from 'framer-motion';
import Cv from '../assets/Raouf-Allala-CV.pdf';
import { EASE_OUT, scrollToId } from '../lib/motion';
import { Construction, SectionTitle } from './Blueprint';
import { ArrowUp, ArrowUpRight, Download, Mail } from './Icons';
import { EMAIL, SOCIALS } from '../lib/socials';

export default function Contact() {
  return (
    <>
      <section
        id="contact"
        aria-labelledby="contact-title"
        className="relative overflow-hidden bg-mint py-24 text-on-mint sm:py-32"
      >
        <Construction
          shape="tall"
          className="pointer-events-none absolute -bottom-24 right-0 h-[130%] w-auto text-on-mint/15 max-md:hidden"
        />
        <div className="page relative">
          <SectionTitle id="contact-title" tone="dark">
            Let’s build something.
          </SectionTitle>
          <p className="mt-6 max-w-[40ch] text-lg text-on-mint/80">
            Have a project in mind, or a role you think I’d fit? Send me a message.
          </p>

          <motion.a
            href={`mailto:${EMAIL}`}
            className="group mt-12 inline-flex max-w-full items-center gap-3 break-all font-display text-[clamp(1.35rem,4.6vw,3.5rem)] leading-tight"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
          >
            <span className="link-draw pb-1">{EMAIL}</span>
            <ArrowUpRight
              size={36}
              className="hidden shrink-0 transition-transform duration-300 ease-(--ease-out) group-hover:translate-x-1 group-hover:-translate-y-1 sm:block"
            />
          </motion.a>

          <div className="mt-12 flex flex-wrap gap-3">
            <a href={`mailto:${EMAIL}`} className="btn btn-dark max-sm:w-full">
              <Mail size={18} /> Email me
            </a>
            <a
              href={Cv}
              download
              className="btn border border-on-mint/30 text-on-mint hover:border-on-mint max-sm:w-full"
            >
              Download résumé <Download size={16} />
            </a>
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="btn h-12 w-12 !px-0 border border-on-mint/30 hover:border-on-mint"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-line bg-ground-deep">
        <div className="page flex flex-col items-start justify-between gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Raouf Allala. Designed and built by me.</p>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('top');
            }}
            className="inline-flex items-center gap-2 font-mono text-xs hover:text-mint"
          >
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </footer>
    </>
  );
}
