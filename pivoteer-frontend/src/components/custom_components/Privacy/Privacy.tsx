const Privacy = () => {
  return (
    <div className="mx-auto px-6 py-12 text-brightWhite">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Effective Date: 06/01/2025</p>

      <p className="mb-4">
        MyPivoteer LLC ("MyPivoteer," "we," "us," or "our") is committed to protecting your privacy.
        This Privacy Policy describes how we collect, use, and protect your information when you use our
        website, application, and services ("Services").
      </p>

      <p className="mb-4">
        By using our Services, you consent to the practices described in this Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li><strong>Account Information:</strong> Email address, encrypted password, and (optionally) name.</li>
        <li><strong>File Data:</strong> Uploaded spreadsheets and files, stored securely and privately.</li>
        <li><strong>Payment Information:</strong> Managed by Stripe; we do not store sensitive card data.</li>
        <li><strong>Usage Data:</strong> File operations, device type, browser, and general location (city/state).</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Provide, maintain, and improve the Services</li>
        <li>Manage subscriptions and billing</li>
        <li>Communicate updates and provide support</li>
        <li>Ensure security and monitor for abuse</li>
        <li><strong>Note:</strong> We do not sell or share data for marketing.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">3. How We Protect Your Information</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Files are encrypted and stored in DigitalOcean Spaces</li>
        <li>Passwords are hashed, never stored in plaintext</li>
        <li>Access to data is restricted and reviewed</li>
        <li>Users can delete files at any time</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">4. Data Retention</h2>
      <p className="mb-4">
        For <strong>Free accounts</strong>, files are automatically deleted after 30 days.
        <br />
        For <strong>Pro</strong> and <strong>Enterprise accounts</strong>, files are also deleted after 30 days by default,
        but users may extend the retention period through account settings or by purchasing a <em>File Life Extension Add-on</em>,
        which allows storage of files for up to one full year.
        <br />
        Account-related data is retained as long as your subscription remains active or until you request deletion.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">5. Sharing of Information</h2>
      <p className="mb-4">
        We only share limited information with trusted services (e.g., Stripe) or when legally required.
        We do not rent or sell your personal information.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">6. Your Rights and Choices</h2>
      <p className="mb-4">
        You may access, update, or delete your data through your account. Contact us at
        <a href="mailto:support@mypivoteer.com" className="text-neonPink ml-1">support@mypivoteer.com</a> for assistance.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">7. Cookies and Tracking</h2>
      <p className="mb-4">
        We use cookies for authentication, preferences, and non-identifiable analytics. You can disable
        cookies in your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">8. International Data Transfers</h2>
      <p className="mb-4">
        By using our services outside the U.S., you agree to data transfer and processing in the United States.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">9. Children's Privacy</h2>
      <p className="mb-4">
        We do not knowingly collect data from users under 18. Our services are not intended for children.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">10. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this policy and notify users of material changes via email or in-app notifications.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">11. Contact Us</h2>
      <p>
        MyPivoteer LLC
        <br />
        Email: <a href="mailto:support@mypivoteer.com" className="text-neonPink">support@mypivoteer.com</a>
      </p>
    </div>
  );
};

export default Privacy;
