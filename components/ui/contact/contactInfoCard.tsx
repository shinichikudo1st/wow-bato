import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const ContactInfoCard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-4 p-6 bg-blue-50/50 rounded-xl">
        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <FiMapPin className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Visit Us</h3>
          <p className="text-gray-600 mt-1">
            123 Main Office Building
            <br />
            Batangas City, Philippines
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-4 p-6 bg-blue-50/50 rounded-xl">
        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <FiPhone className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
          <p className="text-gray-600 mt-1">
            +63 (43) 123-4567
            <br />
            Monday to Friday, 8AM to 5PM
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-4 p-6 bg-blue-50/50 rounded-xl">
        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <FiMail className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Email Us</h3>
          <p className="text-gray-600 mt-1">
            support@wowbato.gov.ph
            <br />
            We'll respond within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCard;
