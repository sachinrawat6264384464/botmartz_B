import { test, expect } from '@playwright/test';
import { db, auth } from '../lib/firebase';
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Helper to authenticate as admin for database checks
async function authenticateAdmin() {
  if (!auth.currentUser) {
    await signInWithEmailAndPassword(auth, 'soham@botmartz.com', 'admin@312');
  }
}

test.describe('Botmartz Platform Integration Tests', () => {

  test('contact form submits successfully and writes to firestore db', async ({ page }) => {
    test.setTimeout(60000);

    const uniqueId = `integration-contact-${Date.now()}`;
    const testEmail = `${uniqueId}@example.com`;
    const testName = 'Playwright Integration Contact';
    const testMessage = 'Hello! This is a programmatic E2E Integration test to verify Firestore database writes.';

    // 1. Visit the contact page
    await page.goto('/contact');

    // 2. Fill in the form fields
    await page.getByPlaceholder('John Doe').fill(testName);
    await page.getByPlaceholder('you@company.com').fill(testEmail);
    await page.getByPlaceholder('Tell us about your project, goals, or any questions you have…').fill(testMessage);

    // 3. Submit the form
    await page.getByRole('button', { name: 'Send Message' }).click();

    // 4. Expect success UI message to be displayed on the page
    await expect(page.locator('text=Message Sent!')).toBeVisible({ timeout: 15000 });

    // 5. Sign in as admin to bypass read restrictions and verify Firestore document
    await authenticateAdmin();
    const contactsRef = collection(db, 'contacts');
    const q = query(contactsRef, where('email', '==', testEmail));
    const querySnapshot = await getDocs(q);

    expect(querySnapshot.empty).toBe(false);

    const docData = querySnapshot.docs[0].data();
    expect(docData.name).toBe(testName);
    expect(docData.message).toBe(testMessage);
    expect(docData.status).toBe('unread');

    // Clean up test data
    await deleteDoc(doc(db, 'contacts', querySnapshot.docs[0].id));
    console.log(`✅ Cleaned up contact document with ID: ${querySnapshot.docs[0].id}`);
  });

  test('newsletter subscription subscribes successfully and handles duplicate entries', async ({ page }) => {
    test.setTimeout(60000);

    const uniqueId = `integration-news-${Date.now()}`;
    const testEmail = `${uniqueId}@example.com`;

    // 1. Visit the home page (the footer is present globally)
    await page.goto('/');

    // 2. Locate footer newsletter form (scoped to footer) and subscribe
    const footer = page.locator('footer');
    const footerEmailInput = footer.getByPlaceholder('you@company.com');
    await footerEmailInput.fill(testEmail);

    // Intercept and log the API response for diagnosis
    const responsePromise = page.waitForResponse('**/api/newsletter/subscribe');
    await footer.getByRole('button', { name: 'Join' }).click();
    const apiResponse = await responsePromise;
    const apiStatus = apiResponse.status();
    let apiBody: any = {};
    try { apiBody = await apiResponse.json(); } catch {}
    console.log(`\n📢 Newsletter API → Status: ${apiStatus}`, apiBody);

    // 3. Verify success message in UI
    await expect(page.locator('text=secured')).toBeVisible({ timeout: 15000 });

    // 4. Authenticate and query Firestore to verify subscription exists
    await authenticateAdmin();
    const newsletterRef = collection(db, 'newsletter');
    const q = query(newsletterRef, where('email', '==', testEmail.toLowerCase()));
    const querySnapshot = await getDocs(q);

    expect(querySnapshot.empty).toBe(false);
    expect(querySnapshot.docs[0].data().status).toBe('active');

    // 5. Refresh the page and try subscribing with the same email to verify duplicate prevention
    await page.reload();
    const footerAfterReload = page.locator('footer');
    await footerAfterReload.getByPlaceholder('you@company.com').fill(testEmail);
    await footerAfterReload.getByRole('button', { name: 'Join' }).click();

    // Verify duplicate error message shows up in footer
    await expect(footer.locator('text=Already subscribed')).toBeVisible({ timeout: 15000 });

    // Clean up test data
    await deleteDoc(doc(db, 'newsletter', querySnapshot.docs[0].id));
    console.log(`✅ Cleaned up newsletter document with ID: ${querySnapshot.docs[0].id}`);
  });

  test('blog comments submission, db approval simulation, and rendering in public feed', async ({ page }) => {
    test.setTimeout(90000);

    const uniqueId = `comment-test-${Date.now()}`;
    const testEmail = `${uniqueId}@example.com`;
    const testName = 'Commenter Bot';
    const testCommentContent = `Cool article! Submission ID: ${uniqueId}`;
    const testPostSlug = `test-post-slug-${uniqueId}`;

    // 1. Authenticate as admin to insert a temporary test blog post (guarantees a post exists)
    await authenticateAdmin();
    const postsRef = collection(db, 'blog-posts');
    const newPostRef = await addDoc(postsRef, {
      title: 'Playwright E2E Test Post',
      slug: testPostSlug,
      content: '<p>This is a temporary integration test blog post content.</p>',
      excerpt: 'Short excerpt.',
      category: 'General',
      author: 'Integration Bot',
      status: 'published',
      createdAt: serverTimestamp(),
    });
    console.log(`✅ Created temporary blog post in Firestore with ID: ${newPostRef.id}`);

    // 2. Visit the single blog post slug page directly
    await page.goto(`/blog/${testPostSlug}`);

    // Verify we are on the blog post details page
    await expect(page.locator('text=End of Transmission')).toBeVisible({ timeout: 15000 });

    // 3. Fill out and submit the comment form
    // Scope to main content only to avoid conflict with footer's newsletter email field
    const mainContent = page.locator('main');
    await mainContent.getByPlaceholder('John Doe').fill(testName);
    await mainContent.getByPlaceholder('you@company.com').fill(testEmail);
    await mainContent.getByPlaceholder('Share your thoughts on this transmission...').fill(testCommentContent);
    await mainContent.getByRole('button', { name: 'Submit Comment' }).click();

    // 4. Verify "Pending approval" success state shows up
    await expect(page.locator('text=Comment Submitted')).toBeVisible({ timeout: 15000 });

    // 5. Verify the comment document was written to Firestore with 'pending' status
    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, where('email', '==', testEmail));
    const querySnapshot = await getDocs(q);

    expect(querySnapshot.empty).toBe(false);
    const commentDoc = querySnapshot.docs[0];
    expect(commentDoc.data().status).toBe('pending');
    expect(commentDoc.data().postSlug).toBe(testPostSlug);

    // 6. Simulate admin approval in the database
    await updateDoc(doc(db, 'comments', commentDoc.id), {
      status: 'approved'
    });
    console.log(`✅ Simulated Admin approval for comment ID: ${commentDoc.id}`);

    // 7. Refresh the blog reader page and check if the approved comment is rendered in the discussion feed
    await page.reload();
    await expect(page.locator(`text=${testCommentContent}`)).toBeVisible({ timeout: 15000 });

    // 8. Clean up testing documents
    await deleteDoc(doc(db, 'comments', commentDoc.id));
    await deleteDoc(doc(db, 'blog-posts', newPostRef.id));
    console.log(`✅ Cleaned up temporary blog post and comment from Firestore.`);
  });

});
