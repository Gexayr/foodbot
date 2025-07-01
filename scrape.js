const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path'); // For path joining

const BASE_URL = 'https://www.sas.am';
const CATEGORY_CATALOG_URL = `${BASE_URL}/food/catalog/`; // The initial page with categories

async function scrapeFoodLinks() {
    let allFoodLinks = new Set(); // Use a Set to automatically handle duplicates

    try {
        // --- Step 1: Scrape Category Links ---
        console.log(`Scraping category links from: ${CATEGORY_CATALOG_URL}`);
        const { data: categoryPageData } = await axios.get(CATEGORY_CATALOG_URL);
        const $categoryPage = cheerio.load(categoryPageData);

        const categoryLinks = [];
        // You correctly identified this selector for category titles
        $categoryPage('a.catalog-main__title').each((i, element) => {
            const link = $categoryPage(element).attr('href');
            if (link && link.startsWith('/food/catalog/') && link.endsWith('/')) { // Ensure it's a valid category link
                categoryLinks.push(`${BASE_URL}${link}`);
            }
        });

        console.log(`Found ${categoryLinks.length} categories.`);
        // Add the main catalog page itself to process as well, as it might contain some direct items
        // or ensure we don't miss anything. Though the listed links are subcategories.

        // Add the main catalog page if it also contains actual food items directly,
        // otherwise, just stick to the discovered subcategories.
        // For simplicity and to ensure we get all unique items, we'll iterate through discovered categories.

        // --- Step 2: Scrape Product Links from Each Category Page ---
        for (const categoryUrl of categoryLinks) {
            console.log(`  Visiting category: ${categoryUrl}`);
            try {
                const { data: categoryContentData } = await axios.get(categoryUrl);
                const $categoryContent = cheerio.load(categoryContentData);

                // **THIS IS THE CRITICAL PART:**
                // You need to inspect an *actual category page* (e.g., `https://www.sas.am/food/catalog/pizza_i_gruzinskiy_khachapuri/`)
                // and find the CSS selector for the *individual food item links* on that page.
                // The previous guess `div.item a` might be correct for these inner pages, or it might be different.
                // Let's assume `div.item a` is a good starting point based on typical structures.
                // If this doesn't work, you MUST inspect an actual product listing page.

                // A common pattern is: `div.product-item a` or `div.food-card a` or `div.col-xx-x a`
                // where `a` is the link to the individual product page.
                // Let's try `div.item a` as a general guess for now.


                $categoryContent('a.product__cover-link').each((i, element) => {
                    const productLink = $categoryContent(element).attr('href');
                    // Filter: ensure it's a link to a specific product, not just navigation or image links
                    if (productLink
                        // && productLink.startsWith('/food/catalog/')
                        // && !productLink.endsWith('/')
                        // && productLink.length > '/food/catalog/'.length
                    ) {
                        allFoodLinks.add(`${BASE_URL}${productLink}`);
                    }
                });

            } catch (innerError) {
                console.error(`    Error scraping category ${categoryUrl}:`, innerError.message);
            }
        }

        console.log("allFoodLinks")
        console.log(allFoodLinks)
        // Convert Set to Array for saving
        const finalFoodLinks = Array.from(allFoodLinks);

        // Save links to a JSON file
        fs.writeFileSync('foodLinks.json', JSON.stringify(finalFoodLinks, null, 2));
        console.log(`Scraped ${finalFoodLinks.length} unique food links and saved to foodLinks.json`);
        return finalFoodLinks;

    } catch (error) {
        console.error('Error in main scraping process:', error);
        return [];
    }
}

scrapeFoodLinks();