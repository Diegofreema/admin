'use client';
import { useEffect, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import {
  IconHome2,
  IconUsers,
  IconCalendarEvent,
  IconAlbum,
  IconDeviceProjector,
  IconUsersGroup,
  IconTargetArrow,
  IconLogin,
  IconLogout,
  IconArticle,
  IconBallpen,
} from '@tabler/icons-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IconAdjustmentsHorizontal } from '@tabler/icons-react';
import { useUser } from '@/hook/useUser';
interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;

  href: string;
}

function NavbarLink({
  icon: Icon,
  label,

  href,
}: NavbarLinkProps) {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={href}
            className="hover:!bg-transparent hover:!text-[yellow] "
          >
            <Icon
              size={30}
              color={pathname === href ? 'yellow' : 'white'}
              stroke={1.5}
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent className="transition !duration-[0.1s] !translate-x-10 ">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

const mockdata = [
  { icon: IconUsers, label: 'Team', href: '/team' },
  { icon: IconCalendarEvent, label: 'Event', href: '/event' },
  { icon: IconAlbum, label: 'Gallery', href: '/gallery' },
  { icon: IconDeviceProjector, label: 'Projects', href: '/project' },
  { icon: IconUsersGroup, label: 'Volunteers', href: '/volunteer' },
  { icon: IconTargetArrow, label: 'Objectives', href: '/objective' },
  { icon: IconAdjustmentsHorizontal, label: 'Slider', href: '/slider' },
  { icon: IconBallpen, label: 'Create Post', href: '/blog' },
  { icon: IconArticle, label: 'Blog Posts', href: '/post' },
];

export function SideBar() {
  const [isMounted, setIsMounted] = useState(false);
  const { onOpen, onClose, loggedIn, logout } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const links = mockdata.map((link, index) => (
    <NavbarLink {...link} key={link.label} />
  ));
  const handleLogin = () => {
    logout();
  };

  if (!isMounted) return null;

  return (
    <nav className="!p-4">
      <div className="flex items-center justify-center">
        <Avatar>
          <AvatarImage src="/butterfly.jpeg" />
          <AvatarFallback>IMG</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex flex-col justify-center items-center space-y-5">
          {links}
          <div className="self-end cursor-pointer">
            {!loggedIn ? (
              <IconLogin size={30} color="white" onClick={onOpen} />
            ) : (
              <IconLogout size={30} color="white" onClick={logout} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
