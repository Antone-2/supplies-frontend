import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
    title = 'MEDHELM Supplies - Medical Equipment & Supplies',
    description = 'Your trusted partner for high-quality medical equipment and supplies. Serving healthcare professionals with reliable products and exceptional service.',
    keywords = 'medical supplies, medical equipment, healthcare, hospital supplies, medical devices',
    image = '/medhelm-logo.png',
    url = window.location.href
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Additional SEO */}
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={url} />
        </Helmet>
    );
};

export default SEOHead;
