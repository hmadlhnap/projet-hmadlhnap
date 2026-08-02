import React from "react";

import {
  FaInstagram,
  FaTripadvisor,
  FaWhatsapp,
} from "react-icons/fa";

type SocialItem = {
  name: string;
  link: string;
  icon: React.ReactNode;
};


const socials: SocialItem[] = [
  {
    name: "Instagram",
    link: "https://www.instagram.com/tripstomarrakech?igsh=MXE2b3d1YWFlZGhjcA%3D%3D&utm_source=qr",
    icon: <FaInstagram aria-hidden="true" />,
  },
  {
    name: "TripAdvisor",
    link: "https://www.tripadvisor.com/",
    icon: <FaTripadvisor aria-hidden="true" />,
  },
  {
    name: "WhatsApp",
    link: "https://wa.me/212642618936?text=Hello%20Trips%20to%20Marrakech%2C%20I%20would%20like%20more%20information.",
    icon: <FaWhatsapp aria-hidden="true" />,
  },
];


function ReseauxSociaux(): React.JSX.Element {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.link}
          title={social.name}
          aria-label={social.name}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group flex h-14 w-14 items-center justify-center rounded-full
            border-2 border-primary text-footer-foreground
            transition-all duration-300 hover:bg-primary hover:text-primary-foreground
            focus:outline-none"
        >
          <span className="text-xl transition-transform duration-300 group-hover:scale-110">
            {social.icon}
          </span>
        </a>
      ))}
    </div>
  );
}

export default ReseauxSociaux;
