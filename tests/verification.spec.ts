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
    await expect(page.locator('text=Course Completed & Certified')).toBeVisible();
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

    // Click on Students tab in navbar
    const studentTabBtn = page.locator('button').filter({ hasText: /Students \(\d+\)/ });
    await expect(studentTabBtn).toBeVisible();
    await studentTabBtn.click();

    // Click Add Student button
    const addBtn = page.locator('button:has-text("Add Student")');
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

    // 2. Open Students tab
    const studentTabBtn = page.locator('button').filter({ hasText: /Students \(\d+\)/ });
    await expect(studentTabBtn).toBeVisible();
    await studentTabBtn.click();

    // 3. Open Add Candidate modal
    const addBtn = page.locator('button:has-text("Add Student")');
    await expect(addBtn).toBeVisible();
    await addBtn.click();

    // Verify modal heading
    await expect(page.locator('text=Add New Candidate Record')).toBeVisible();

    // 4. Fill in all form fields
    const testAppNumber = 'IAS-APP-2026/TEST8899';
    const testCandidateName = 'Aakash Verma Test';
    const testFatherName = 'Dharmendra Verma';
    const testDob = '2001-05-18';
    const testPhone = '9876501234';
    const testEmail = 'aakash.test@example.com';
    const testInterviewDate = '2024-03-15';
    const testAdmDate = '2024-01-20';
    const testStartDate = '2024-02-01';
    const testEndDate = '2024-11-15';
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

    // Fill Dates: Admission Date (1), Interview Date (2), Course Start Date (3), Course End Date (4)
    const dateInputs = page.locator('input[type="date"]');
    await dateInputs.nth(1).fill(testAdmDate);
    await dateInputs.nth(2).fill(testInterviewDate);
    await dateInputs.nth(3).fill(testStartDate);
    await dateInputs.nth(4).fill(testEndDate);

    // Select Training Status: Failed
    const statusSelect = page.locator('select').filter({ has: page.locator('option[value="Failed"]') });
    await statusSelect.selectOption('Failed');

    // Enter Failure Reason Note
    const failureNoteTextarea = page.locator('textarea[placeholder*="Enter reason why student failed"]');
    await expect(failureNoteTextarea).toBeVisible();
    await failureNoteTextarea.fill(testFailureReason);

    // 5. Submit Form
    await page.locator('button:has-text("Save Candidate Record")').click();

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
    await expect(page.locator('text=Training Assessment Failed')).toBeVisible();
    await expect(page.locator('text=Status: Failed')).toBeVisible();
    await expect(page.locator(`text=${testInterviewDate}`)).toBeVisible();
    await expect(page.locator(`text=${testDob}`)).toBeVisible();
    await expect(page.locator('text=Official Assessment Note & Reason for Status')).toBeVisible();
    await expect(page.locator(`text=${testFailureReason}`)).toBeVisible();
  });
});
