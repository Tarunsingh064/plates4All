import React from 'react';

function ListFood() {
  const [text, settext] = React.useState('');
  const [phone_number, setphone_number] = React.useState('');
  const [username, setusername] = React.useState('');
  const [adress, setadress] = React.useState('');
  const [photo, setphoto] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("text", text);
    formData.append("phone_number", phone_number);
    formData.append("username", username);
    formData.append("adress", adress);
    formData.append("photo", photo);

    try {
      const response = await fetch("http://plates4all-8.onrender.com/api/food/foods/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (!response.ok) {
        alert(data.message || "Something went wrong.");
      } else {
        alert("Form submitted successfully!");
        localStorage.setItem("userid",data.id)
        settext('');
        setphone_number('');
        setusername('');
        setadress('');
        setphoto(null);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit food. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-amber-900">
          🍱 List a Food Donation
        </h2>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            required
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0
              file:text-sm file:font-semibold file:bg-amber-900 file:text-white hover:file:bg-amber-800"
            onChange={(e) => setphoto(e.target.files[0])}
          />
          {photo && (
            <p className="mt-1 text-sm text-gray-500">📂 Selected: {photo.name}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Food Name</label>
          <input
            type="text"
            value={text}
            onChange={(e) => settext(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            value={phone_number}
            onChange={(e) => setphone_number(e.target.value)}
            placeholder="+91xxxxxxxxxx"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Donor / Organization Name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Address</label>
          <input
            type="text"
            value={adress}
            onChange={(e) => setadress(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-900 text-white py-2 rounded-md hover:bg-amber-800 transition-colors text-lg"
        >
          Submit Donation
        </button>
      </form>
    </div>
  );
}

export default ListFood;
