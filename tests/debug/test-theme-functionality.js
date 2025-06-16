import puppeteer from 'puppeteer';

async function testThemeFunctionality() {
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1200, height: 800 }
  });
  
  try {
    console.log('=== Testing svelte-themes functionality ===');
    
    const page = await browser.newPage();
    await page.goto('http://localhost:9090/', { waitUntil: 'networkidle2' });
    
    // Test 1: Initial state
    console.log('\n1. Testing initial state...');
    let state = await page.evaluate(() => {
      return {
        htmlTheme: document.documentElement.getAttribute('data-theme'),
        colorScheme: document.documentElement.style.colorScheme,
        selectValue: document.querySelector('select').value,
        localStorage: localStorage.getItem('theme')
      };
    });
    console.log('Initial state:', state);
    
    // Test 2: Switch to dark theme
    console.log('\n2. Testing dark theme switch...');
    await page.select('select', 'dark');
    await new Promise(resolve => setTimeout(resolve, 100));
    
    state = await page.evaluate(() => {
      return {
        htmlTheme: document.documentElement.getAttribute('data-theme'),
        colorScheme: document.documentElement.style.colorScheme,
        selectValue: document.querySelector('select').value,
        localStorage: localStorage.getItem('theme')
      };
    });
    console.log('After dark switch:', state);
    
    // Test 3: Switch to light theme
    console.log('\n3. Testing light theme switch...');
    await page.select('select', 'light');
    await new Promise(resolve => setTimeout(resolve, 100));
    
    state = await page.evaluate(() => {
      return {
        htmlTheme: document.documentElement.getAttribute('data-theme'),
        colorScheme: document.documentElement.style.colorScheme,
        selectValue: document.querySelector('select').value,
        localStorage: localStorage.getItem('theme')
      };
    });
    console.log('After light switch:', state);
    
    // Test 4: Persistence across page reloads
    console.log('\n4. Testing persistence across page reload...');
    await page.reload({ waitUntil: 'networkidle2' });
    
    state = await page.evaluate(() => {
      return {
        htmlTheme: document.documentElement.getAttribute('data-theme'),
        colorScheme: document.documentElement.style.colorScheme,
        selectValue: document.querySelector('select').value,
        localStorage: localStorage.getItem('theme')
      };
    });
    console.log('After reload:', state);
    
    // Test 5: Test forced theme pages
    console.log('\n5. Testing forced dark page...');
    await page.click('a[href="/dark"]');
    await new Promise(resolve => setTimeout(resolve, 200));
    
    state = await page.evaluate(() => {
      return {
        htmlTheme: document.documentElement.getAttribute('data-theme'),
        colorScheme: document.documentElement.style.colorScheme,
        url: window.location.pathname,
        localStorage: localStorage.getItem('theme')
      };
    });
    console.log('Forced dark page:', state);
    
    // Test 6: Return to home and check if theme persists
    console.log('\n6. Testing return to home...');
    await page.click('a[href="/"]');
    await new Promise(resolve => setTimeout(resolve, 200));
    
    state = await page.evaluate(() => {
      return {
        htmlTheme: document.documentElement.getAttribute('data-theme'),
        colorScheme: document.documentElement.style.colorScheme,
        selectValue: document.querySelector('select').value,
        localStorage: localStorage.getItem('theme')
      };
    });
    console.log('Back to home:', state);
    
    // Test 7: FOUC prevention test (new tab)
    console.log('\n7. Testing FOUC prevention with new page...');
    const newPage = await browser.newPage();
    
    // Clear localStorage first, then set dark theme
    await newPage.goto('http://localhost:9090/');
    await newPage.evaluate(() => {
      localStorage.setItem('theme', 'dark');
    });
    
    // Now reload and check if it loads with dark theme immediately
    await newPage.goto('http://localhost:9090/', { waitUntil: 'domcontentloaded' });
    
    const foucTest = await newPage.evaluate(() => {
      return {
        htmlTheme: document.documentElement.getAttribute('data-theme'),
        colorScheme: document.documentElement.style.colorScheme,
        hasThemeScript: !!document.querySelector('script[data-theme-script]') || 
                       document.head.innerHTML.includes('localStorage.getItem')
      };
    });
    console.log('FOUC test (should load dark immediately):', foucTest);
    
    await newPage.close();
    
    console.log('\n=== Test completed ===');
    
  } catch (error) {
    console.error('Error during testing:', error);
  } finally {
    await browser.close();
  }
}

testThemeFunctionality().catch(console.error);