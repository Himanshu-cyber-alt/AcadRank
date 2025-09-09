


// // src/Upload.jsx
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { fetchProfile } from  "../redux/profileSlice"

// export default function Upload() {
//   const [file, setFile] = useState(null);
//   const dispatch = useDispatch();

//   const handleUpload = async () => {
//     if (!file) return alert("Please select a file first.");

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("userId", 1); // hardcoded for now

//     const res = await fetch("http://localhost:5000/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();
//     console.log("Uploaded:", data);

//     if (res.ok) {
//       dispatch(fetchProfile(1)); // 🔥 refresh profile
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <input
//         type="file"
//         onChange={(e) => setFile(e.target.files[0])}
//         className="block w-full border border-gray-300 rounded-lg p-2"
//       />
//       <button
//         onClick={handleUpload}
//         className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
//       >
//         Upload
//       </button>
//     </div>
//   );
// }


// src/Upload.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProfile } from "../redux/profileSlice";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", 1); // hardcoded for now

      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Uploaded:", data);

      if (res.ok) {
        dispatch(fetchProfile(1)); // 🔥 refresh profile
        setFile(null); // Clear file after successful upload
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload File</h2>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose file
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-medium
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100
                       border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {file && (
          <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
            Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 
                     disabled:bg-gray-400 disabled:cursor-not-allowed
                     text-white font-medium rounded-lg
                     transition-colors duration-200
                     focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isUploading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Uploading...</span>
            </div>
          ) : (
            'Upload File'
          )}
        </button>
      </div>
    </div>
  );
}