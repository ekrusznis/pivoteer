const Terms = () => {
  return (
    <div className="w-full mx-auto px-8 py-12 text-brightWhite min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="text-sm text-gray-400 mb-6">Effective Date: 06/01/2025</p>

      <section className="space-y-4">
        <p>
          Welcome to MyPivoteer LLC ("MyPivoteer," "we," "us," or "our"). These
          Terms and Conditions ("Terms") govern your access to and use of the
          MyPivoteer website, services, applications, and other offerings
          (collectively, the "Services").
        </p>
        <p>
          By registering, accessing, or using any part of the Services, you
          agree to be bound by these Terms. If you do not agree, please do not
          use the Services.
        </p>

        <h2 className="text-xl font-semibold mt-6">1. Eligibility</h2>
        <p>
          You must be at least 18 years old and able to form a legally binding
          contract. Businesses and organizations may also register accounts
          under these Terms.
        </p>

        <h2 className="text-xl font-semibold mt-6">2. Services Provided</h2>
        <ul className="list-disc pl-6">
          <li>Upload spreadsheets and related files</li>
          <li>Create pivot tables, macros, and visualizations</li>
          <li>Edit and transform files using natural language commands (AI assistance)</li>
          <li>Access add-on features such as extended storage or advanced processing</li>
        </ul>
        <p>
          We continually enhance our Services and may modify or discontinue
          features at any time with or without notice.
        </p>

        <h2 className="text-xl font-semibold mt-6">3. Account Registration and Security</h2>
        <p>
          You agree to provide accurate info and keep it updated. You are
          responsible for safeguarding your credentials. We are not liable for
          losses due to account misuse.
        </p>

        <h2 className="text-xl font-semibold mt-6">4. Subscription Plans and Payment</h2>
        <p>
          We offer Free, Pro, and Enterprise plans with Stripe-secured monthly
          or annual billing. No refunds after a trial ends.
        </p>

        <h2 className="text-xl font-semibold mt-6">5. File Storage and User Data</h2>
        <p>
          Your uploaded files are private and deletable by you. We perform
          scheduled deletions and don’t use your files outside the scope of
          service delivery.
        </p>

        <h2 className="text-xl font-semibold mt-6">6. Acceptable Use</h2>
        <p>
          You may not upload malware, hack, reverse-engineer, or violate laws.
          We may suspend or terminate accounts at our discretion for misuse.
        </p>

        <h2 className="text-xl font-semibold mt-6">7. Intellectual Property</h2>
        <p>
          MyPivoteer retains rights to its content and software. You retain
          rights to your uploaded files.
        </p>

        <h2 className="text-xl font-semibold mt-6">8. Disclaimer of Warranties</h2>
        <p>
          Services are provided "as is." We do not guarantee uptime, error-free
          access, or data retention. Always keep backups of your files.
        </p>

        <h2 className="text-xl font-semibold mt-6">9. Limitation of Liability</h2>
        <p>
          We are not liable for indirect damages or loss of data. Maximum
          liability is limited to the amount you paid in the last 12 months.
        </p>

        <h2 className="text-xl font-semibold mt-6">10. Termination</h2>
        <p>
          You may cancel your account anytime. We may suspend or terminate your
          account if Terms are violated.
        </p>

        <h2 className="text-xl font-semibold mt-6">11. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the State of New Jersey,
          USA.
        </p>

        <h2 className="text-xl font-semibold mt-6">12. Changes to Terms</h2>
        <p>
          We may update these Terms. Material changes will be notified. Use of
          Services after changes constitutes acceptance.
        </p>

        <h2 className="text-xl font-semibold mt-6">13. Contact Information</h2>
        <p>
          MyPivoteer LLC
          <br />
          Email: <a className="text-neonPink" href="mailto:support@mypivoteer.com">support@mypivoteer.com</a>
        </p>
      </section>
    </div>
  );
};

export default Terms;
