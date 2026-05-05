import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE = "https://georgia-j-chase.lovable.app";
const DEFAULT_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/15f91af0-dbc7-49b3-9067-1a281d400618/id-preview-b8213f0b--d23f8826-3575-4b09-9237-347a890a0909.lovable.app-1774829366341.png";

const SEO = ({ title, description, path = "/", image = DEFAULT_IMAGE, jsonLd }: SEOProps) => {
  const url = `${SITE}${path}`;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
