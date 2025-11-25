import React from 'react';
import { FileText, Scale, Shield } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
        <Scale className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">1. Agreement to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300">
              These Terms of Service ("Terms") govern your access to and use of CyberSoluce ("the Platform"), including any content, functionality, and services offered through the Platform. By accessing or using the Platform, you agree to be bound by these Terms.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              If you do not agree to these Terms, you must not access or use the Platform. We may revise these Terms at any time by updating this page. By continuing to use the Platform after such revisions, you agree to the updated Terms.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">2. Platform Description</h2>
            <p className="text-gray-600 dark:text-gray-300">
              CyberSoluce is a cybersecurity assessment and compliance management platform designed to help organizations evaluate and improve their security posture across multiple domains including ransomware defense, supply chain security, privacy protection, and sensitive information management.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              The Platform provides access to assessment tools, analytics, reporting capabilities, and compliance frameworks adapted to various regional requirements. Features may vary based on your subscription level and regional adaptations.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">3. Account Registration and Security</h2>
            <p className="text-gray-600 dark:text-gray-300">
              To use certain features of the Platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              You are responsible for safeguarding the password and other credentials used to access your account and for any activities or actions under your account. You agree to notify us immediately of any unauthorized access to your account or any breach of security.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">4. Subscription and Payment Terms</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Access to certain features of the Platform requires a paid subscription. Subscription fees are as set forth on the Platform's pricing page and may vary by region. You agree to pay all fees in accordance with the billing terms in effect at the time a fee is due and payable.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Unless otherwise specified, billing cycles are monthly or annual, and subscription fees are non-refundable. You may cancel your subscription at any time, but no refunds will be provided for any unused portion of the subscription period.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">5. Intellectual Property Rights</h2>
            <p className="text-gray-600 dark:text-gray-300">
              The Platform and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by ERMITS LLC, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              These Terms permit you to use the Platform for your organization's internal business purposes only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Platform, except as follows:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4 mt-2">
              <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials.</li>
              <li>You may store files that are automatically cached by your web browser for display enhancement purposes.</li>
              <li>You may print or download one copy of a reasonable number of pages of the Platform for your own internal business use and not for further reproduction, publication, or distribution.</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">6. User Content and Data</h2>
            <p className="text-gray-600 dark:text-gray-300">
              The Platform allows you to input, upload, or store data related to your organization's security assessment ("User Data"). You retain all rights in and to your User Data. By using the Platform, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your User Data solely for the purposes of providing and improving the Platform.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              You represent and warrant that you have all rights, permissions, and consents necessary to submit, post, or display any User Data on the Platform, and that your User Data does not violate any third-party rights, including intellectual property rights and privacy rights.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              We take no responsibility and assume no liability for User Data. We reserve the right to remove any User Data for any reason, including User Data that we believe violates these Terms or our policies.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">7. Data Security and Privacy</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We implement appropriate technical and organizational measures to protect the security of your User Data. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Our collection and use of personal information in connection with your access to and use of the Platform is described in our <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">8. Regional Compliance</h2>
            <p className="text-gray-600 dark:text-gray-300">
              The Platform offers regional adaptations to help organizations comply with local regulations. However, you are solely responsible for ensuring that your use of the Platform complies with all applicable laws, regulations, and industry standards specific to your organization, industry, and geographical location.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              We do not guarantee that the Platform will meet specific regulatory or compliance requirements. You are responsible for consulting with legal and security professionals to ensure your compliance with all relevant obligations.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">9. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-300">
              To the maximum extent permitted by applicable law, in no event shall CyberSoluce, its affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, the Platform, including any direct, indirect, special, incidental, consequential, or punitive damages.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              This includes, but is not limited to, personal injury, pain and suffering, emotional distress, loss of revenue, loss of profits, loss of business or anticipated savings, loss of use, loss of goodwill, loss of data, and whether caused by tort (including negligence), breach of contract, or otherwise, even if foreseeable.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">10. Indemnification</h2>
            <p className="text-gray-600 dark:text-gray-300">
              You agree to defend, indemnify, and hold harmless CyberSoluce, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Platform.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">11. Term and Termination</h2>
            <p className="text-gray-600 dark:text-gray-300">
              These Terms shall remain in full force and effect while you use the Platform. We may terminate or suspend your access to the Platform immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use the Platform will immediately cease.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">12. Governing Law and Jurisdiction</h2>
            <p className="text-gray-600 dark:text-gray-300">
              These Terms and any dispute or claim arising out of or in connection with them or their subject matter or formation shall be governed by and construed in accordance with the laws of the jurisdiction in which CyberSoluce is headquartered, without giving effect to any choice or conflict of law provision or rule.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Any legal suit, action, or proceeding arising out of, or related to, these Terms or the Platform shall be instituted exclusively in the courts located in the jurisdiction where CyberSoluce is headquartered, although we retain the right to bring any suit, action, or proceeding against you for breach of these Terms in your country of residence or any other relevant country.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">13. Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-300">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Email: legal@ermits.com<br />
              Address: 8300 McCullough lane, Suite 203, Gaithersburg, MD 20877
            </p>
          </section>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 border border-blue-100 dark:border-blue-800">
        <div className="flex items-start">
          <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 mr-3" />
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Legal Disclaimer</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              This Terms of Service document is provided as a template and should be reviewed by your legal counsel before implementation. CyberSoluce is not responsible for any legal consequences arising from the use of this document.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;