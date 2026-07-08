import BotmartzLandingPage from "./_LandingPage/page";
import SchemaMarkup from "./_components/SchemaMarkup";

export default function Page() {
  return (
    <>
      <SchemaMarkup type="Organization" data={{}} />
      <SchemaMarkup type="LocalBusiness" data={{}} />
      <BotmartzLandingPage />
    </>
  );
}
