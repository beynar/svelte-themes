import puppeteer from 'puppeteer';

async function compareThemes() {
  const browser = await puppeteer.launch({ 
    headless: false, // Set to true to run in background
    defaultViewport: { width: 1200, height: 800 }
  });
  
  try {
    // Test both demos
    const demos = [
      {
        name: 'next-themes (reference)',
        url: 'https://next-themes-example.vercel.app/'
      },
      {
        name: 'svelte-themes (your implementation)', 
        url: 'http://localhost:9090/'
      }
    ];

    for (const demo of demos) {
      console.log(`\n=== Testing ${demo.name} ===`);
      
      const page = await browser.newPage();
      await page.goto(demo.url, { waitUntil: 'networkidle2' });
      
      // Take initial screenshot
      await page.screenshot({ 
        path: `${demo.name.replace(/[^a-zA-Z0-9]/g, '-')}-initial.png`,
        fullPage: true 
      });
      
      // Get page content and structure
      const content = await page.evaluate(() => {
        return {
          title: document.title,
          htmlAttributes: Array.from(document.documentElement.attributes).reduce((acc, attr) => {
            acc[attr.name] = attr.value;
            return acc;
          }, {}),
          bodyContent: document.body.innerText,
          themeControls: Array.from(document.querySelectorAll('select, button, a')).map(el => ({
            tag: el.tagName,
            text: el.innerText,
            value: el.value || null,
            href: el.href || null
          })),
          localStorage: Object.keys(localStorage).reduce((acc, key) => {
            acc[key] = localStorage.getItem(key);
            return acc;
          }, {})
        };
      });
      
      console.log('Page Info:', JSON.stringify(content, null, 2));
      
      // Test theme switching if controls are available
      const themeSelect = await page.$('select');
      if (themeSelect) {
        console.log('Found theme selector, testing theme changes...');
        
        // Test dark theme
        await page.select('select', 'dark');
        await new Promise(resolve => setTimeout(resolve, 500));
        await page.screenshot({ 
          path: `${demo.name.replace(/[^a-zA-Z0-9]/g, '-')}-dark.png`,
          fullPage: true 
        });
        
        // Test light theme  
        await page.select('select', 'light');
        await new Promise(resolve => setTimeout(resolve, 500));
        await page.screenshot({ 
          path: `${demo.name.replace(/[^a-zA-Z0-9]/g, '-')}-light.png`,
          fullPage: true 
        });
        
        // Test system theme
        await page.select('select', 'system');
        await new Promise(resolve => setTimeout(resolve, 500));
        await page.screenshot({ 
          path: `${demo.name.replace(/[^a-zA-Z0-9]/g, '-')}-system.png`,
          fullPage: true 
        });
        
        // Check localStorage after theme changes
        const finalStorage = await page.evaluate(() => {
          return Object.keys(localStorage).reduce((acc, key) => {
            acc[key] = localStorage.getItem(key);
            return acc;
          }, {});
        });
        
        console.log('Final localStorage:', JSON.stringify(finalStorage, null, 2));
      }
      
      // Test forced theme pages
      const forcedDarkLink = await page.$('a[href="/dark"], a[href*="dark"]');
      if (forcedDarkLink) {
        console.log('Testing forced dark page...');
        await forcedDarkLink.click();
        await new Promise(resolve => setTimeout(resolve, 500));
        await page.screenshot({ 
          path: `${demo.name.replace(/[^a-zA-Z0-9]/g, '-')}-forced-dark.png`,
          fullPage: true 
        });
        
        // Go back
        await page.goBack();
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      await page.close();
    }
    
  } catch (error) {
    console.error('Error during comparison:', error);
  } finally {
    await browser.close();
  }
}

compareThemes().catch(console.error);