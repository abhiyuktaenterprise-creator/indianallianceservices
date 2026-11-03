import { test, expect } from '@playwright/test';

test.describe('Candidate Verification & Admin Registry Tests', () => {

  test('Verification page loads without Staff & Recruiter tab', async ({ page }) => {
    await page.goto('/verify');

    // Confirm heading
    await expect(page.locator('h1')).toContainText('Verification');

    // Confirm Staff & Recruiter tab is NOT present
    await expect(page.locator('text=Staff & Recruiter Verification')).not.toBeVisible();

    // Confirm Application Number input is present
    const appInput = page.locator('input[placeholder*="Application Number"]');
    await expect(appInput).toBeVisible();
  });

  test('Lookup candidate with Failed status displays failure reason and interview date', async ({ page }) => {
    await page.goto('/verify');

    const appInput = page.locator('input[placeholder*="Application Number"]');
    await appInput.fill('IAS-APP-2026/8420');
    await page.locator('button:has-text("Verify Application")').click();

    // Verify candidate card appears
    await expect(page.locator('text=Rohit Kumar')).toBeVisible();
    await expect(page.locator('text=Candidate Name')).toBeVisible();
    await expect(page.locator('text=IAS-APP-2026/8420')).toBeVisible();

    // Verify Failed status badge & banner
    await expect(page.locator('text=Training Assessment Failed')).toBeVisible();
    await expect(page.locator('text=Status: Failed')).toBeVisible();

    // Verify interview date
    await expect(page.locator('text=Interview Date')).toBeVisible();
    await expect(page.locator('text=2024-02-12')).toBeVisible();

    // Verify failure note is displayed
    await expect(page.locator('text=Official Assessment Note & Reason for Status')).toBeVisible();
    await expect(page.locator('text=English communication benchmarks')).toBeVisible();
  });

  test('Lookup candidate with Completed status', async ({ page }) => {
    await page.goto('/verify');

    const appInput = page.locator('input[placeholder*="Application Number"]');
    await appInput.fill('IAS-APP-2026/8425');
    await page.locator('button:has-text("Verify Application")').click();

    await expect(page.locator('text=Abhishek Navnath Arkas')).toBeVisible();
    await expect(page.locator('text=Completed').first()).toBeVisible();
    await expect(page.locator('text=Authentic Record')).toBeVisible();
  });

  test('Lookup with invalid application number shows not found alert', async ({ page }) => {
    await page.goto('/verify');

    const appInput = page.locator('input[placeholder*="Application Number"]');
    await appInput.fill('IAS-APP-9999/INVALID');
    await page.locator('button:has-text("Verify Application")').click();

    await expect(page.locator('text=Candidate Record Not Found')).toBeVisible();
  });

  test('Admin dashboard candidate form checks', async ({ page }) => {
    // Set admin auth in session
    await page.addInitScript(() => {
      localStorage.setItem("acs_admin_session", "true");
      sessionStorage.setItem("acs_admin_session", "true");
    });

    // Navigate to admin dashboard
    await page.goto('/admin/dashboard');

    // Click on Candidates tab in navbar
    const studentTabBtn = page.locator('button').filter({ hasText: /Candidates \(\d+\)/ });
    await expect(studentTabBtn).toBeVisible();
    await studentTabBtn.click();

    // Click Add Candidate button
    const addBtn = page.locator('button:has-text("Add Candidate")');
    await expect(addBtn).toBeVisible();
    await addBtn.click();

    // Verify modal labels
    await expect(page.locator('label:has-text("Candidate Name *")')).toBeVisible();
    await expect(page.locator('label:has-text("Student Full Name *")')).not.toBeVisible();
    await expect(page.locator('label:has-text("Registration Number (Official Verification ID) *")')).not.toBeVisible();
    await expect(page.locator('label:has-text("Application Number *")')).toBeVisible();
    await expect(page.locator('label:has-text("Interview Date")')).toBeVisible();

    // Verify Training Status has Failed option
    const statusSelect = page.locator('select').filter({ has: page.locator('option[value="Failed"]') });
    await expect(statusSelect).toBeVisible();

    // Select Failed and verify failure reason textarea appears
    await statusSelect.selectOption('Failed');
    await expect(page.locator('text=Note: Why Candidate Failed')).toBeVisible();
  });

  test('Fill complete Test Candidate details in admin form, submit, and verify all fields on /verify page', async ({ page }) => {
    // Set admin auth in session
    await page.addInitScript(() => {
      localStorage.setItem("acs_admin_session", "true");
      sessionStorage.setItem("acs_admin_session", "true");
    });

    // 1. Navigate to Admin Dashboard
    await page.goto('/admin/dashboard');

    // 2. Open Candidates tab
    const studentTabBtn = page.locator('button').filter({ hasText: /Candidates \(\d+\)/ });
    await expect(studentTabBtn).toBeVisible();
    await studentTabBtn.click();

    // 3. Open Add Candidate modal
    const addBtn = page.locator('button:has-text("Add Candidate")');
    await expect(addBtn).toBeVisible();
    await addBtn.click();

    // Verify modal heading
    await expect(page.locator('text=Add New Candidate Record')).toBeVisible();

    // 4. Fill in all form fields
    const testAppNumber = 'IAS-APP-2026/TEST8899';
    const testBatchCode = 'IAS-TRG-2026/B88';
    const testCandidateName = 'Aakash Verma Test';
    const testFatherName = 'Dharmendra Verma';
    const testDob = '2001-05-18';
    const testPhone = '9876501234';
    const testEmail = 'aakash.test@example.com';
    const testInterviewDate = '2024-03-15';
    const testPlacementDate = '2024-02-01';
    const testVisitingDate = '2024-11-15';
    const testFailureReason = 'Candidate did not clear the mandatory aviation English communication fluency assessment during the panel round.';

    // Fill Candidate Name
    await page.locator('input[placeholder*="Abhishek Navnath"]').fill(testCandidateName);

    // Fill Father Name
    await page.locator('input[placeholder*="Navnath Namdev"]').fill(testFatherName);

    // Fill Date of Birth
    await page.locator('input[type="date"]').nth(0).fill(testDob);

    // Fill Mobile Number
    await page.locator('input[placeholder*="8858453069"]').fill(testPhone);

    // Fill Email
    await page.locator('input[type="email"]').fill(testEmail);

    // Fill Application Number
    const appInput = page.locator('input[placeholder*="IAS-APP-2026/"]');
    await appInput.fill(testAppNumber);

    // Select Course
    const courseSelect = page.locator('select').first();
    await courseSelect.selectOption('Airport Ground Staff & Passenger Services');

    // Fill Batch Code
    const batchInput = page.locator('input[placeholder*="IAS-TRG-"]');
    await batchInput.fill(testBatchCode);

    // Fill Dates: Interview Date (1), Date of Placement (2), Visiting Date (3)
    const dateInputs = page.locator('input[type="date"]');
    await dateInputs.nth(1).fill(testInterviewDate);
    await dateInputs.nth(2).fill(testPlacementDate);
    await dateInputs.nth(3).fill(testVisitingDate);

    // Select Training Status: Failed
    const statusSelect = page.locator('select').filter({ has: page.locator('option[value="Failed"]') });
    await statusSelect.selectOption('Failed');

    // Enter Failure Reason Note
    const failureNoteTextarea = page.locator('textarea[placeholder*="Enter reason why candidate failed"]');
    await expect(failureNoteTextarea).toBeVisible();
    await failureNoteTextarea.fill(testFailureReason);

    // 5. Submit Form
    await page.locator('button[type="submit"]').click();

    // 6. Confirm candidate appears in the admin registry table
    await expect(page.locator('table').locator(`text=${testCandidateName}`)).toBeVisible();
    await expect(page.locator('table').locator(`text=${testAppNumber}`)).toBeVisible();

    // 7. Navigate to public /verify page and search for this candidate
    await page.goto('/verify');
    const verifySearchInput = page.locator('input[placeholder*="Application Number"]');
    await verifySearchInput.fill(testAppNumber);
    await page.locator('button:has-text("Verify Application")').click();

    // 8. Verify all submitted details appear correctly on /verify page
    await expect(page.locator(`text=${testCandidateName}`)).toBeVisible();
    await expect(page.locator(`text=${testFatherName}`)).toBeVisible();
    await expect(page.locator(`text=${testAppNumber}`)).toBeVisible();
    await expect(page.locator(`text=${testBatchCode}`)).toBeVisible();
    await expect(page.locator('text=Training Assessment Failed')).toBeVisible();
    await expect(page.locator('text=Status: Failed')).toBeVisible();
    await expect(page.locator(`text=${testInterviewDate}`)).toBeVisible();
    await expect(page.locator(`text=${testDob}`)).toBeVisible();
    await expect(page.locator(`text=${testPlacementDate}`)).toBeVisible();
    await expect(page.locator(`text=${testVisitingDate}`)).toBeVisible();
    await expect(page.locator('text=Official Assessment Note & Reason for Status')).toBeVisible();
    await expect(page.locator(`text=${testFailureReason}`)).toBeVisible();
  });

  test('Lookup candidate with Joining and Rejoining status options', async ({ page }) => {
    // Set admin auth in session
    await page.addInitScript(() => {
      localStorage.setItem("acs_admin_session", "true");
      sessionStorage.setItem("acs_admin_session", "true");
    });

    await page.goto('/admin/dashboard');

    const studentTabBtn = page.locator('button').filter({ hasText: /Candidates \(\d+\)/ });
    await expect(studentTabBtn).toBeVisible();
    await studentTabBtn.click();

    const addBtn = page.locator('button:has-text("Add Candidate")');
    await expect(addBtn).toBeVisible();
    await addBtn.click();

    // Verify Training Status has Completed, Joining, and Rejoining options
    const statusSelect = page.locator('select').filter({ has: page.locator('option[value="Joining"]') });
    await expect(statusSelect).toBeVisible();
    await expect(statusSelect.locator('option[value="Completed"]')).toHaveText('Completed');
    await expect(statusSelect.locator('option[value="Joining"]')).toHaveText('Joining');
    await expect(statusSelect.locator('option[value="Rejoining"]')).toHaveText('Rejoining');

    const joiningAppNo = 'IAS-APP-2026/APP9090';
    const joiningBatch = 'IAS-TRG-2026/J1';
    const joiningName = 'Priya Sharma Candidate';

    await page.locator('input[placeholder*="Abhishek Navnath"]').fill(joiningName);
    await page.locator('input[placeholder*="Navnath Namdev"]').fill('Rakesh Sharma');
    await page.locator('input[type="date"]').nth(0).fill('2002-08-10');
    await page.locator('input[placeholder*="8858453069"]').fill('9988776655');
    await page.locator('input[placeholder*="IAS-APP-2026/"]').fill(joiningAppNo);
    await page.locator('input[placeholder*="IAS-TRG-"]').fill(joiningBatch);
    await page.locator('input[type="date"]').nth(2).fill('2026-11-29');

    // Select Joining
    await statusSelect.selectOption('Joining');

    await page.locator('button[type="submit"]').click();

    // Verify table has Joining badge
    await expect(page.locator('table').locator(`text=${joiningName}`)).toBeVisible();
    await expect(page.locator('table').getByText('Joining', { exact: true })).toBeVisible();

    // Verify on /verify page
    await page.goto('/verify');
    const verifySearchInput = page.locator('input[placeholder*="Application Number"]');
    await verifySearchInput.fill(joiningAppNo);
    await page.locator('button:has-text("Verify Application")').click();

    await expect(page.locator(`text=${joiningName}`)).toBeVisible();
    await expect(page.locator(`text=${joiningBatch}`)).toBeVisible();
    await expect(page.getByText('Joining', { exact: true }).first()).toBeVisible();
    await expect(page.locator('text=Authentic Record')).toBeVisible();
  });

  test('Google Sheet candidate sync and export CSV workflow in Admin & verification lookup', async ({ page }) => {
    // Intercept mock Google Sheet CSV URL
    const mockSheetCsv = [
      'Application Number,Registration Number,Batch Code,Candidate Name,Father Name,Date of Birth,Mobile Number,Email,Course Name,Date of Placement,Visiting Date,Interview Date,Status,Failure Reason,Photo URL',
      'IAS-APP-2026/SHEET888,IAS26Y2DEL2026/SHEET888,IAS-TRG-2026/B888,Sunita Devi,Ramesh Devi,2001-05-15,9876543210,sunita@test.com,Airport Ground Staff & Passenger Services,2026-12-01,2027-03-01,2026-11-20,Joining,,',
    ].join('\n');

    await page.route('**/mock-google-sheet-candidates.csv', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/csv',
        body: mockSheetCsv,
      });
    });

    // Admin session
    await page.addInitScript(() => {
      localStorage.setItem('acs_admin_session', 'true');
      sessionStorage.setItem('acs_admin_session', 'true');
    });

    await page.goto('/admin/dashboard');

    // Click Candidates tab
    const studentTabBtn = page.locator('button').filter({ hasText: /Candidates \(\d+\)/ });
    await expect(studentTabBtn).toBeVisible();
    await studentTabBtn.click();

    // Verify toolbar buttons
    const syncBtn = page.locator('button:has-text("Sync Google Sheet")');
    await expect(syncBtn).toBeVisible();

    const sheetLinkBtn = page.locator('button:has-text("Sheet Link")');
    await expect(sheetLinkBtn).toBeVisible();

    const exportCsvBtn = page.locator('button:has-text("Export CSV")');
    await expect(exportCsvBtn).toBeVisible();

    // Open Google Sheet Link modal
    await sheetLinkBtn.click();
    await expect(page.locator('h3:has-text("Google Sheet Real-Time Sync")')).toBeVisible();

    // Fill in mock Google Sheet CSV URL
    const sheetInput = page.locator('input[placeholder*="docs.google.com/spreadsheets"]');
    await expect(sheetInput).toBeVisible();
    await sheetInput.fill('https://example.com/mock-google-sheet-candidates.csv');

    // Click Save & Sync Now
    await page.locator('button:has-text("Save & Sync Now")').click();

    // Verify candidate Sunita Devi appears in candidate table
    await expect(page.locator('table').locator('text=Sunita Devi')).toBeVisible();
    await expect(page.locator('table').locator('text=IAS-APP-2026/SHEET888')).toBeVisible();
    await expect(page.locator('table').getByText('Joining', { exact: true })).toBeVisible();

    // Now test public verification page
    await page.goto('/verify');
    const verifySearchInput = page.locator('input[placeholder*="Application Number"]');
    await verifySearchInput.fill('IAS-APP-2026/SHEET888');
    await page.locator('button:has-text("Verify Application")').click();

    // Candidate should verify immediately
    await expect(page.locator('text=Sunita Devi')).toBeVisible();
    await expect(page.locator('text=IAS-TRG-2026/B888')).toBeVisible();
    await expect(page.getByText('Joining', { exact: true }).first()).toBeVisible();
    await expect(page.locator('text=Authentic Record')).toBeVisible();
  });
});
