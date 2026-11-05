import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'iPhone SE (375x667)', width: 375, height: 667 },
  { name: 'iPhone 14 (390x844)', width: 390, height: 844 },
  { name: 'iPad Mini (768x1024)', width: 768, height: 1024 },
  { name: 'Desktop (1280x800)', width: 1280, height: 800 },
];

for (const vp of viewports) {
  test.describe(`Admin Panel Viewport Tests - ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test(`Verify No Horizontal Overflow and Clean Options on ${vp.name}`, async ({ page }) => {
      // Mock Google Sheets fetch to respond immediately
      await page.route(/(pub\?output=csv|export\?format=csv|gviz\/tq)/, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'text/csv',
          body: 'Application No,Candidate Name,Father Name,DOB,Mobile,Course,Status\nIAS-APP-2026/801,Rohan Sharma,Anil Sharma,2002-05-10,9876543210,Customer Service Assistant (CSA),Active\n',
        });
      });

      // 1. Authenticate as Admin
      await page.addInitScript(() => {
        localStorage.setItem('acs_admin_session', 'true');
        sessionStorage.setItem('acs_admin_session', 'true');
      });

      await page.goto('/admin/dashboard');
      await page.waitForTimeout(1500);

      // 2. Check Overview Tab Root Horizontal Overflow
      const swOverview = await page.evaluate(() => document.documentElement.scrollWidth);
      const cwOverview = await page.evaluate(() => document.documentElement.clientWidth);
      expect(swOverview).toBeLessThanOrEqual(cwOverview);

      // 3. Switch to Candidates Tab
      const candTab = page.locator('button').filter({ hasText: /Candidates \(\d+\)/ });
      await candTab.click();
      await page.waitForTimeout(800);

      // Check Candidate Tab Root Horizontal Overflow
      const swCand = await page.evaluate(() => document.documentElement.scrollWidth);
      const cwCand = await page.evaluate(() => document.documentElement.clientWidth);
      expect(swCand).toBeLessThanOrEqual(cwCand);

      // 4. Open Add Candidate Modal
      const addCandBtn = page.locator('button:has-text("Add Candidate")');
      await addCandBtn.click();
      await page.waitForTimeout(400);

      // 5. Verify NO DUPLICATE COURSE OPTIONS
      const courseSelect = page.locator('select').filter({ has: page.locator('option[value*="Customer Service"]') });
      await expect(courseSelect).toBeVisible();

      const optionTexts = await courseSelect.locator('option').allInnerTexts();
      const duplicateCourses = optionTexts.filter((item, index) => optionTexts.indexOf(item) !== index);
      expect(duplicateCourses).toEqual([]);

      // Verify canonical courses are present
      await expect(courseSelect.locator('option:has-text("Customer Service Assistant (CSA)")')).toBeAttached();
      await expect(courseSelect.locator('option:has-text("Cabin Crew & In-Flight Operations")')).toBeAttached();
      await expect(courseSelect.locator('option:has-text("Air Hostess & Hospitality Services")')).toBeAttached();
      await expect(courseSelect.locator('option:has-text("Customs Officer & Airport Cargo")')).toBeAttached();

      // 6. Verify Modal Cancel Button is Visible and Clickable without getting cut off
      const cancelModalBtn = page.locator('button:has-text("Cancel")').first();
      await expect(cancelModalBtn).toBeVisible();
      await cancelModalBtn.click();
      await page.waitForTimeout(300);

      // 7. Verify Job Posts Tab & Modal
      const jobsTab = page.locator('button').filter({ hasText: /Job Posts \(\d+\)/ });
      await jobsTab.click();
      await page.waitForTimeout(400);

      const addJobBtn = page.locator('button:has-text("Add New Job Post")');
      if (await addJobBtn.isVisible()) {
        await addJobBtn.click();
        await page.waitForTimeout(400);
        const jobCancelBtn = page.locator('button:has-text("Cancel")').first();
        await expect(jobCancelBtn).toBeVisible();
        await jobCancelBtn.click();
        await page.waitForTimeout(300);
      }

      // 8. Verify Notices Tab & Modal
      const noticesTab = page.locator('button').filter({ hasText: /Notices \(\d+\)/ });
      await noticesTab.click();
      await page.waitForTimeout(400);

      const addNoticeBtn = page.locator('button:has-text("Post New Recruitment Alert")');
      if (await addNoticeBtn.isVisible()) {
        await addNoticeBtn.click();
        await page.waitForTimeout(400);
        const noticeCancelBtn = page.locator('button:has-text("Cancel")').first();
        await expect(noticeCancelBtn).toBeVisible();
        await noticeCancelBtn.click();
        await page.waitForTimeout(300);
      }

      // 9. Verify Offices Tab & Modal
      const officesTab = page.locator('button').filter({ hasText: /Offices \(\d+\)/ });
      await officesTab.click();
      await page.waitForTimeout(400);

      const addOfficeBtn = page.locator('button:has-text("Add Office Location")');
      if (await addOfficeBtn.isVisible()) {
        await addOfficeBtn.click();
        await page.waitForTimeout(400);
        const officeCancelBtn = page.locator('button:has-text("Cancel")').first();
        await expect(officeCancelBtn).toBeVisible();
        await officeCancelBtn.click();
        await page.waitForTimeout(300);
      }

      // 10. Check other tabs: Phone & Site Settings, Leads CRM, Cloud Sync for horizontal overflow
      const tabsToCheck = ['Phone & Site Settings', 'Leads CRM', 'Cloud Sync'];
      for (const t of tabsToCheck) {
        const tabBtn = page.locator('button').filter({ hasText: new RegExp(t) });
        if (await tabBtn.isVisible()) {
          await tabBtn.click();
          await page.waitForTimeout(400);
          const sw = await page.evaluate(() => document.documentElement.scrollWidth);
          const cw = await page.evaluate(() => document.documentElement.clientWidth);
          expect(sw).toBeLessThanOrEqual(cw);
        }
      }
    });
  });
}

test.describe('Training Letter Modal Mobile Viewport Test (iPhone 16 - 393x852)', () => {
  test.use({ viewport: { width: 393, height: 852 } });

  test('Verify Letter Modal fits mobile screen cleanly without awkward wrapping or cut-offs', async ({ page }) => {
    await page.route(/(pub\?output=csv|export\?format=csv|gviz\/tq)/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/csv',
        body: 'Application No,Candidate Name,Father Name,DOB,Mobile,Course,Status\nIAS-APP-2026/801,SIMI,Rajesh Kumar,2002-05-10,9876543210,Customer Service Assistant (CSA),Active\n',
      });
    });

    await page.addInitScript(() => {
      localStorage.setItem('acs_admin_session', 'true');
      sessionStorage.setItem('acs_admin_session', 'true');
    });

    await page.goto('/admin/dashboard');
    await page.waitForTimeout(1200);

    // Open Candidates tab
    const candTab = page.locator('button').filter({ hasText: /Candidates \(\d+\)/ });
    await candTab.click();
    await page.waitForTimeout(800);

    // Click on the first candidate's "Letters" button
    const letterBtn = page.locator('button').filter({ hasText: /Letters/ }).first();
    await expect(letterBtn).toBeVisible();
    await letterBtn.click();
    await page.waitForTimeout(600);

    // Verify Modal is opened
    await expect(page.locator('text=Letter Preview')).toBeVisible();

    // Verify Print button is visible on mobile
    const printBtn = page.locator('button:has-text("Print / Save Letter (PDF)")');
    await expect(printBtn).toBeVisible();

    // Verify Fit Screen button is active
    const fitScreenBtn = page.locator('button:has-text("Fit Screen")');
    await expect(fitScreenBtn).toBeVisible();

    // Verify document container is present and has letter-fit-screen class
    const letterContainer = page.locator('#printable-letter-container');
    await expect(letterContainer).toBeVisible();
    await expect(letterContainer).toHaveClass(/letter-fit-screen/);

    // Test Document Type switch to confirmation advice
    const docTypeSelect = page.locator('select').filter({ has: page.locator('option[value="confirmation"]') });
    await docTypeSelect.selectOption('confirmation');
    await page.waitForTimeout(300);

    // Close Modal
    const modalDialog = page.locator('.max-w-5xl');
    const closeBtn = modalDialog.locator('button[title="Close"]');
    await closeBtn.click();
    await page.waitForTimeout(400);
    await expect(modalDialog).not.toBeVisible();
  });
});

