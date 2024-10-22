import { useState } from "react";
import FeedbackModal from "./FeedbackModal";

function Footer() {
  const [isFeedbackOpen, setFeedbackOpen] = useState(false);

  const openFeedback = () => setFeedbackOpen(true);
  const closeFeedback = () => setFeedbackOpen(false);

  return (
    <div id="footer" className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-auto">
      <div className="flex justify-between items-start mb-6 w-auto">
        <div>
          <div className="text-lg font-bold mb-2">
            Bhagwan Parshuram Institute Of Technology, New Delhi
          </div>
          <div className="mb-2">
            <div>ERP Coordinator: [Coordinator Name]</div>
            <div>Email: erp@collegename.edu</div>
            <div>Phone: (123) 456-7890</div>
          </div>
          <div className="text-sm">
            Powered By <br />
            <span className="text-xl font-semibold text-[#A6A9F4]">VAAVE</span>
          </div>
        </div>
        <div>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROp-tVE-R6e5Uw_LRnOl1kC5MMXciei-j0VQ&s"
              alt="LinkedIn"
              className="fw-10 h-10 rounded-full border-2 border-white"
            />
          </a>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-left text-xs space-x-2">
          <span className="text-gray-400">Copyright © 2024</span>
          <span className="text-gray-500">|</span>
          <a href="#" className="hover:text-#9333EA">
            Disclaimer
          </a>
          <span className="text-gray-500">|</span>
          <a href="#" className="hover:text-#9333EA">
            Terms of Use
          </a>
          <span className="text-gray-500">|</span>
          <a href="#" className="hover:text-#9333EA">
            Privacy Policy
          </a>
          <span className="text-gray-500">|</span>
          <a href="#" className="hover:text-#9333EA">
            Alumni Directory
          </a>
        </div>

        <div className="flex space-x-4 mr-[670px]">
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/playstore.png" alt="Play Store" className="w-10 h-auto" />
          </a>
          <a
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/Appstore.png" alt="App Store" className="w-18 h-10" />
          </a>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 mr-4 mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition duration-300"
          onClick={openFeedback}
        >
          Feedback
        </button>
      </div>
      <FeedbackModal isOpen={isFeedbackOpen} onClose={closeFeedback} />
    </div>
  );
}

export default Footer;
