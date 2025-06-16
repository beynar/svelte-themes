import puppeteer from 'puppeteer';

async function testForcedThemes() {
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1200, height: 800 }
  });
  
  try {
    // Test next-themes forced dark page
    console.log('=== Testing next-themes forced dark page ===');
    const nextPage = await browser.newPage();
    await nextPage.goto('https://next-themes-example.vercel.app/dark', { waitUntil: 'networkidle2' });
    
    const nextState = await nextPage.evaluate(() => {
      return {
        htmlTheme: document.documentElement.getAttribute('data-theme'),
        colorScheme: document.documentElement.style.colorScheme,
        url: window.location.pathname,
        selectValue: document.querySelector('select')?.value,
        localStorage: localStorage.getItem('theme')
      };
    });
    console.log('next-themes /dark:', nextState);
    await nextPage.close();
    
    // Test svelte-themes forced dark page
    console.log('\n=== Testing svelte-themes forced dark page ===');
    const sveltePage = await browser.newPage();
    await sveltePage.goto('http://localhost:9090/dark', { waitUntil: 'networkidle2' });
    
    const svelteState = await sveltePage.evaluate(() => {
      return {
        htmlTheme: document.documentElement.getAttribute('data-theme'),
        colorScheme: document.documentElement.style.colorScheme,
        url: window.location.pathname,
        selectValue: document.querySelector('select')?.value,
        localStorage: localStorage.getItem('theme'),
        layoutComponents: Array.from(document.querySelectorAll('[data-svelte-h], script')).length
      };
    });
    console.log('svelte-themes /dark:', svelteState);
    
    // Check the actual DOM structure
    const domStructure = await sveltePage.evaluate(() => {
      return {
        bodyHTML: document.body.innerHTML.substring(0, 500),
        scripts: Array.from(document.querySelectorAll('script')).map(s => s.innerHTML.substring(0, 100))
      };
    });
    console.log('DOM structure snippet:', domStructure);
    
    await sveltePage.close();
    
  } catch (error) {
    console.error('Error during testing:', error);
  } finally {
    await browser.close();
  }
}

testForcedThemes().catch(console.error);