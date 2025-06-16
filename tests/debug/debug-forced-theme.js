import puppeteer from 'puppeteer';

async function debugForcedTheme() {
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
    
    // Check the sequence of theme changes
    const debugInfo = await page.evaluate(() => {
      // Add some debug logging
      const originalSetAttribute = document.documentElement.setAttribute;
      let attributeChanges = [];
      
      document.documentElement.setAttribute = function(name, value) {
        if (name === 'data-theme') {
          attributeChanges.push(`setAttribute: ${name}=${value}`);
          console.log(`Theme change: ${name}=${value}`);
        }
        return originalSetAttribute.call(this, name, value);
      };
      
      return {
        finalHtmlTheme: document.documentElement.getAttribute('data-theme'),
        finalColorScheme: document.documentElement.style.colorScheme,
        allScripts: Array.from(document.querySelectorAll('script')).map((s, i) => ({
          index: i,
          content: s.innerHTML.substring(0, 200)
        })),
        attributeChanges: attributeChanges
      };
    });
    
    console.log('Debug info:', JSON.stringify(debugInfo, null, 2));
    
    // Wait a bit and check again
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const finalState = await page.evaluate(() => {
      return {
        htmlTheme: document.documentElement.getAttribute('data-theme'),
        colorScheme: document.documentElement.style.colorScheme
      };
    });
    
    console.log('Final state after wait:', finalState);
    
  } catch (error) {
    console.error('Error during debugging:', error);
  } finally {
    await browser.close();
  }
}

debugForcedTheme().catch(console.error);