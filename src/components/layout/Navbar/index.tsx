"use client"
import {Navbar as NNavbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

import { usePathname } from "next/navigation";

const links = [
    {
        id:1,
        name:"Home",
        path:"/"
    },
    {
        id:2,
        name:"Classic",
        path:"/classic"
    },
    {
        id:3,
        name:"3d",
        path:"/3d"
    },
]

export default function Navbar() {

    const pathname = usePathname()

  return (
    <NNavbar shouldHideOnScroll>
      <NavbarBrand>
        <strong>LOGO</strong>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {links.map(link=>(
            <NavbarItem key={link.id} isActive={pathname==link.path}>
                <Link color="foreground" href={link.path}>
                    {link.name}
                </Link>
            </NavbarItem>
        ))}
       

      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NNavbar>
  );
}
