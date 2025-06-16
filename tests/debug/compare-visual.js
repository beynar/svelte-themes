import puppeteer from 'puppeteer';

async function compareVisual() {
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 800, height: 600 }
  });
  
  try {
    // Take screenshot of next-themes
    const nextPage = await browser.newPage();
    await nextPage.goto('https://next-themes-example.vercel.app/', { waitUntil: 'networkidle2' });
    await nextPage.screenshot({ 
      path: 'next-themes-visual.png',
      fullPage: true 
    });
    
    // Take screenshot of svelte-themes
    const sveltePage = await browser.newPage();
    await sveltePage.goto('http://localhost:9090/', { waitUntil: 'networkidle2' });
    await sveltePage.screenshot({ 
      path: 'svelte-themes-visual.png',
      fullPage: true 
    });
    
    console.log('Screenshots saved: next-themes-visual.png and svelte-themes-visual.png');
    
    // Also get detailed styling info
    const nextStyles = await nextPage.evaluate(() => {
      const body = document.body;
      const select = document.querySelector('select');
      const h1 = document.querySelector('h1');
      const links = Array.from(document.querySelectorAll('a'));
      
      return {
        bodyStyles: getComputedStyle(body),
        selectStyles: select ? getComputedStyle(select) : null,
        h1Styles: h1 ? getComputedStyle(h1) : null,
        linkStyles: links.map(link => getComputedStyle(link)),
        backgroundColor: getComputedStyle(document.documentElement).backgroundColor,
        textColor: getComputedStyle(document.body).color,
        layout: {
          bodyDisplay: getComputedStyle(body).display,
          bodyJustifyContent: getComputedStyle(body).justifyContent,
          bodyAlignItems: getComputedStyle(body).alignItems,
          bodyFlexDirection: getComputedStyle(body).flexDirection
        }
      };
    });
    
    const svelteStyles = await sveltePage.evaluate(() => {
      const body = document.body;
      const select = document.querySelector('select');
      const h1 = document.querySelector('h1');
      const links = Array.from(document.querySelectorAll('a'));
      
      return {
        bodyStyles: getComputedStyle(body),
        selectStyles: select ? getComputedStyle(select) : null,
        h1Styles: h1 ? getComputedStyle(h1) : null,
        linkStyles: links.map(link => getComputedStyle(link)),
        backgroundColor: getComputedStyle(document.documentElement).backgroundColor,
        textColor: getComputedStyle(document.body).color,
        layout: {
          bodyDisplay: getComputedStyle(body).display,
          bodyJustifyContent: getComputedStyle(body).justifyContent,
          bodyAlignItems: getComputedStyle(body).alignItems,
          bodyFlexDirection: getComputedStyle(body).flexDirection
        }
      };
    });
    
    console.log('\n=== NEXT-THEMES STYLES ===');
    console.log('Background:', nextStyles.backgroundColor);
    console.log('Text color:', nextStyles.textColor);
    console.log('Layout:', JSON.stringify(nextStyles.layout, null, 2));
    
    console.log('\n=== SVELTE-THEMES STYLES ===');
    console.log('Background:', svelteStyles.backgroundColor);
    console.log('Text color:', svelteStyles.textColor);
    console.log('Layout:', JSON.stringify(svelteStyles.layout, null, 2));
    
    await nextPage.close();
    await sveltePage.close();
    
  } catch (error) {
    console.error('Error during comparison:', error);
  } finally {
    await browser.close();
  }
}

compareVisual().catch(console.error);