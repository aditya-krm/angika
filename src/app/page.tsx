import { Chithi, PotliButton } from "@/components/potli";
import { Hero } from "@/components/rooms/hero";
import { Khata } from "@/components/rooms/khata";
import { Postcard } from "@/components/rooms/postcard";
import { Rail } from "@/components/rooms/rail";
import { Shelves } from "@/components/rooms/shelves";
import { Tape } from "@/components/rooms/tape";
import { Trunk } from "@/components/rooms/trunk";
import { ShopProvider } from "@/components/shop-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrialRoom } from "@/components/trial-room";

/**
 * The page is a lal-paar saree: red borders (the paar) frame the body, the rooms of the
 * almirah fill it, and it ends in the pallu (footer).
 */
export default function Home() {
  return (
    <ShopProvider>
      <SiteHeader />
      <main className="overflow-x-clip">
        <Hero />
        <Tape />
        <Rail />
        <Shelves />
        <Trunk />
        <Khata />
        <Postcard />
      </main>
      <SiteFooter />
      <PotliButton />
      <Chithi />
      <TrialRoom />
    </ShopProvider>
  );
}
