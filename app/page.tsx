import { Hero } from "@/components/Hero";
import { CreativeStatement } from "@/components/CreativeStatement";
import { About } from "@/components/About";
import { PhotoBanner } from "@/components/PhotoBanner";
import { Services } from "@/components/Services";
import { Works } from "@/components/Works";
import { Testimonials } from "@/components/Testimonials";
import { News } from "@/components/News";
import { Footer } from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries";
import {
  PLACEHOLDER_SERVICES,
  PLACEHOLDER_WORKS,
  PLACEHOLDER_TESTIMONIALS,
  PLACEHOLDER_NEWS,
} from "@/lib/content";

// Re-check the CMS for changes at most every 30 seconds.
export const revalidate = 30;

export default async function Home() {
  const data = await client.fetch(HOMEPAGE_QUERY);

  const services = data?.services?.length ? data.services : PLACEHOLDER_SERVICES;
  const works = data?.works?.length ? data.works : PLACEHOLDER_WORKS;
  const testimonials = data?.testimonials?.length
    ? data.testimonials
    : PLACEHOLDER_TESTIMONIALS;
  const news = data?.news?.length ? data.news : PLACEHOLDER_NEWS;

  return (
    <main>
      <Hero data={data?.hero} settings={data?.settings} />
      <CreativeStatement data={data?.statement} />
      <About data={data?.about} />
      <PhotoBanner data={data?.photoBanner} />
      <Services items={services} />
      <Works items={works} />
      <Testimonials items={testimonials} />
      <News items={news} />
      <Footer data={data?.footer} />
    </main>
  );
}
