import { cn } from '../lib/utils';
import Link from '../assets/link.png';

export const BentoItemWide = ({
  className,
  title,
  description,
  header,
  icon,
  link,
}) => {
  return (
    <div
      className={cn(
        'row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-[#32353a] border border-transparent justify-between flex flex-col space-y-4 md:col-span-2 [&>p:text-lg]'
      )}
    >
      <div className="w-full h-[90%]">
        <img
          className="h-full w-full rounded object-cover"
          src={header}
          alt=""
        />
      </div>
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-neutral-200 dark:text-neutral-600 mb-2 mt-2">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              <p>{title}</p> <img width={20} src={Link} alt="" />
            </a>
          ) : (
            title
          )}
        </div>
        <div className="font-sans font-normal text-[#b6ffe9] text-sm dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
