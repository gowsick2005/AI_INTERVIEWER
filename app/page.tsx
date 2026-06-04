import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UploadCard from "./components/UploadCard";
import StatsGrid from "./components/StatsGrid";
import FeaturesGrid from "./components/FeaturesGrid";
import RecentTable from "./components/RecentTable";
import BackgroundEffects from "./components/BackgroundEffects";

export default function Home() {
  return (
    <main className="w-full min-h-screen relative text-white overflow-x-hidden bg-[#000000]">
      <BackgroundEffects />
      <Navbar />

      <Hero />

      <section className="w-full section-padding">
        <div className="container-max mx-auto">
          <UploadCard />
        </div>
      </section>

      <section className="w-full section-padding">
        <div className="container-max mx-auto">
          <FeaturesGrid />
        </div>
      </section>

      <section className="w-full section-padding">
        <div className="container-max mx-auto">
          <StatsGrid />
        </div>
      </section>

      <section className="w-full section-padding">
        <div className="container-max mx-auto">
          <RecentTable />
        </div>
      </section>
    </main>
  );
}