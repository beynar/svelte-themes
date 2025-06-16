import puppeteer from 'puppeteer';

async function debugLayoutData() {
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1200, height: 800 }
  });
  
  try {
    const page = await browser.newPage();
    
    // Add console logging to track what's happening
    page.on('console', msg => {
      console.log(`[PAGE LOG] ${msg.text()}`);
    });
    
    await page.goto('http://localhost:9090/dark', { waitUntil: 'networkidle2' });
    
    // Check the page data and forced theme state
    const debugInfo = await page.evaluate(() => {
      // Try to access SvelteKit page data
      const pageData = window.__sveltekit?.page?.data;
      
      return {
        pageData: pageData || 'No page data found',
        url: window.location.pathname,
        htmlAttributes: Object.fromEntries(
          Array.from(document.documentElement.attributes).map(attr => [attr.name, attr.value])
        ),
        scripts: Array.from(document.querySelectorAll('script')).map((s, i) => ({
          index: i,
          content: s.innerHTML.substring(0, 100),
          hasForcedTheme: s.innerHTML.includes('dark') && s.innerHTML.includes('setAttribute')
        }))
      };
    });
    
    console.log('Debug info:', JSON.stringify(debugInfo, null, 2));
    
  } catch (error) {
    console.error('Error during debugging:', error);
  } finally {
    await browser.close();
  }
}

debugLayoutData().catch(console.error);