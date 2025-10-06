
import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
}


const SEOHead = ({
  title = "MEDHELM Supplies Ltd - Quality Medical Equipment Kenya",
  description = "Premium medical supplies and equipment in Kiambu Town, Kenya. Serving healthcare providers with quality diagnostic tools, surgical instruments, and medical supplies.",
  keywords = "medical supplies Kenya, medical equipment Kiambu, healthcare supplies, surgical instruments, diagnostic tools, PPE Kenya, medical wholesale",
  canonical,
  image = "https://lovable.dev/opengraph-image-p98pqg.png"
}: SEOHeadProps) => {
  const fullTitle = title.includes('MEDHELM') ? title : `${title} | MEDHELM Supplies Ltd`;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const canonicalUrl = canonical || currentUrl;

  useEffect(() => {
    // Set document title
    document.title = fullTitle;

    // Update meta tags
    const setMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const setPropertyTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Set meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);

    // Set Open Graph tags
    setPropertyTag('og:title', fullTitle);
    setPropertyTag('og:description', description);
    setPropertyTag('og:image', image);
    setPropertyTag('og:url', canonicalUrl);
    setPropertyTag('og:type', 'website');

    // Set Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', fullTitle);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', image);

    // Set canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [fullTitle, description, keywords, canonicalUrl, image]);

  return null;
};

export default SEOHead;