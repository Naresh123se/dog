import { useState } from "react";
import { Shield } from "lucide-react";

// Note: In a real application, you would import React Hook Form like this:
// import { useForm } from "react-hook-form";
// However, since we can't import react-hook-form in this environment,
// I'll create a simplified version of the form while maintaining the structure

export default function PedigreeForm() {
  // State to track form values (simulating React Hook Form)
  const [formValues, setFormValues] = useState({
    // Owner Information
    ownerName: "SUDARSHAN K.C.",
    ownerAddress: "MATATIRTHA, CHANDRAGIRI-8, KATHMANDU, NEPAL",
    regDate: "2023-03-15",
    regNumber: "IKC-NPL-2502,037",

    // Dog Information
    breed: "GERMAN SHEPHERD LONG COAT",
    dogName: "VIPER",
    microchip: "900215010087447",
    dob: "2023-02-04",
    sex: "MALE",
    color: "BLACK",
    breeder: "SAGAR SHRESTHA",

    // Sire (Father) Information
    sireName: "GIVO",
    sireRegNumber: "IKC-NPL-2502,033",
    sireColor: "BLACK & TAN",

    // Dam (Mother) Information
    damName: "AJ",
    damRegNumber: "IKC-NPL-2503,026",
    damColor: "BLACK & TAN",

    // Grandparents - Sire Side
    sireGrandfather: "GOVIDO VON MINING",
    sireGrandfatherReg: "2021/020821",
    sireGrandmother: "COCO",
    sireGrandmotherReg: "2020/019692",

    // Grandparents - Dam Side
    damGrandfather: "EROS",
    damGrandfatherReg: "IKC-NPL-2502,030",
    damGrandfatherColor: "BLACK",
    damGrandmother: "LEXI",
    damGrandmotherReg: "IKC-NPL-253,027",
    damGrandmotherColor: "BLACK",
  });

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", formValues);
    // Here you would typically send the data to an API
    alert("Pedigree form submitted successfully!");
  };

  return (
    <div className="w-full max-w-5xl bg-blue-50 p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-4 mb-6 pb-2 border-b border-blue-200">
        <div className="flex-shrink-0 w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center text-yellow-400 relative">
          <Shield size={40} />
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-yellow-400">
            IKC
          </div>
        </div>
        <div className="flex-grow">
          <h1 className="text-2xl font-bold text-blue-900">
            International Kennel Club
          </h1>
          <p className="text-lg text-blue-800 uppercase tracking-wider">
            PEDIGREE REGISTRATION FORM
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Owner Information Section */}
        <fieldset className="border border-blue-300 rounded p-4">
          <legend className="text-lg font-bold text-blue-800 px-2">
            Owner Information
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Owner Name
              </label>
              <input
                type="text"
                name="ownerName"
                value={formValues.ownerName}
                onChange={handleChange}
                className="w-full p-2 border border-blue-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Address
              </label>
              <input
                type="text"
                name="ownerAddress"
                value={formValues.ownerAddress}
                onChange={handleChange}
                className="w-full p-2 border border-blue-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Registration Date
              </label>
              <input
                type="date"
                name="regDate"
                value={formValues.regDate}
                onChange={handleChange}
                className="w-full p-2 border border-blue-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Registration Number
              </label>
              <input
                type="text"
                name="regNumber"
                value={formValues.regNumber}
                onChange={handleChange}
                className="w-full p-2 border border-blue-300 rounded"
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Dog Information Section */}
        <fieldset className="border border-blue-300 rounded p-4">
          <legend className="text-lg font-bold text-blue-800 px-2">
            Dog Information
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Dog Name
              </label>
              <input
                type="text"
                name="dogName"
                value={formValues.dogName}
                onChange={handleChange}
                className="w-full p-2 border border-blue-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Breed
              </label>
              <input
                type="text"
                name="breed"
                value={formValues.breed}
                onChange={handleChange}
                className="w-full p-2 border border-blue-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Microchip Number
              </label>
              <input
                type="text"
                name="microchip"
                value={formValues.microchip}
                onChange={handleChange}
                className="w-full p-2 border border-blue-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formValues.dob}
                onChange={handleChange}
                className="w-full p-2 border border-blue-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Sex
              </label>
              <select
                name="sex"
                value={formValues.sex}
                onChange={handleChange}
                className="w-full p-2 border border-blue-300 rounded"
                required
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Color
              </label>
              <input
                type="text"
                name="color"
                value={formValues.color}
                onChange={handleChange}
                className="w-full p-2 border border-blue-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Breeder
              </label>
              <input
                type="text"
                name="breeder"
                value={formValues.breeder}
                onChange={handleChange}
                className="w-full p-2 border border-blue-300 rounded"
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Parents Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sire (Father) Information */}
          <fieldset className="border border-blue-300 rounded p-4">
            <legend className="text-lg font-bold text-blue-800 px-2">
              Sire (Father) Information
            </legend>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Sire Name
                </label>
                <input
                  type="text"
                  name="sireName"
                  value={formValues.sireName}
                  onChange={handleChange}
                  className="w-full p-2 border border-blue-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="sireRegNumber"
                  value={formValues.sireRegNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-blue-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Color
                </label>
                <input
                  type="text"
                  name="sireColor"
                  value={formValues.sireColor}
                  onChange={handleChange}
                  className="w-full p-2 border border-blue-300 rounded"
                />
              </div>

              {/* Sire's Parents */}
              <div className="mt-4 pt-4 border-t border-blue-200">
                <h4 className="text-sm font-bold text-blue-700 mb-2">
                  Sire's Parents
                </h4>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-blue-900 mb-1">
                      Grandfather Name
                    </label>
                    <input
                      type="text"
                      name="sireGrandfather"
                      value={formValues.sireGrandfather}
                      onChange={handleChange}
                      className="w-full p-2 border border-blue-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-blue-900 mb-1">
                      Grandfather Reg. Number
                    </label>
                    <input
                      type="text"
                      name="sireGrandfatherReg"
                      value={formValues.sireGrandfatherReg}
                      onChange={handleChange}
                      className="w-full p-2 border border-blue-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-blue-900 mb-1">
                      Grandmother Name
                    </label>
                    <input
                      type="text"
                      name="sireGrandmother"
                      value={formValues.sireGrandmother}
                      onChange={handleChange}
                      className="w-full p-2 border border-blue-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-blue-900 mb-1">
                      Grandmother Reg. Number
                    </label>
                    <input
                      type="text"
                      name="sireGrandmotherReg"
                      value={formValues.sireGrandmotherReg}
                      onChange={handleChange}
                      className="w-full p-2 border border-blue-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </fieldset>

          {/* Dam (Mother) Information */}
          <fieldset className="border border-blue-300 rounded p-4">
            <legend className="text-lg font-bold text-blue-800 px-2">
              Dam (Mother) Information
            </legend>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Dam Name
                </label>
                <input
                  type="text"
                  name="damName"
                  value={formValues.damName}
                  onChange={handleChange}
                  className="w-full p-2 border border-blue-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="damRegNumber"
                  value={formValues.damRegNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-blue-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Color
                </label>
                <input
                  type="text"
                  name="damColor"
                  value={formValues.damColor}
                  onChange={handleChange}
                  className="w-full p-2 border border-blue-300 rounded"
                />
              </div>

              {/* Dam's Parents */}
              <div className="mt-4 pt-4 border-t border-blue-200">
                <h4 className="text-sm font-bold text-blue-700 mb-2">
                  Dam's Parents
                </h4>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-blue-900 mb-1">
                      Grandfather Name
                    </label>
                    <input
                      type="text"
                      name="damGrandfather"
                      value={formValues.damGrandfather}
                      onChange={handleChange}
                      className="w-full p-2 border border-blue-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-blue-900 mb-1">
                      Grandfather Reg. Number
                    </label>
                    <input
                      type="text"
                      name="damGrandfatherReg"
                      value={formValues.damGrandfatherReg}
                      onChange={handleChange}
                      className="w-full p-2 border border-blue-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-blue-900 mb-1">
                      Grandfather Color
                    </label>
                    <input
                      type="text"
                      name="damGrandfatherColor"
                      value={formValues.damGrandfatherColor}
                      onChange={handleChange}
                      className="w-full p-2 border border-blue-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-blue-900 mb-1">
                      Grandmother Name
                    </label>
                    <input
                      type="text"
                      name="damGrandmother"
                      value={formValues.damGrandmother}
                      onChange={handleChange}
                      className="w-full p-2 border border-blue-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-blue-900 mb-1">
                      Grandmother Reg. Number
                    </label>
                    <input
                      type="text"
                      name="damGrandmotherReg"
                      value={formValues.damGrandmotherReg}
                      onChange={handleChange}
                      className="w-full p-2 border border-blue-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-blue-900 mb-1">
                      Grandmother Color
                    </label>
                    <input
                      type="text"
                      name="damGrandmotherColor"
                      value={formValues.damGrandmotherColor}
                      onChange={handleChange}
                      className="w-full p-2 border border-blue-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        {/* File Upload Section */}
        <fieldset className="border border-blue-300 rounded p-4">
          <legend className="text-lg font-bold text-blue-800 px-2">
            Documents
          </legend>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Upload Dog Photo
              </label>
              <input
                type="file"
                name="dogPhoto"
                className="w-full p-2 border border-blue-300 rounded"
                accept="image/*"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Upload Supporting Documents (if any)
              </label>
              <input
                type="file"
                name="supportingDocs"
                className="w-full p-2 border border-blue-300 rounded"
                accept=".pdf,.doc,.docx"
                multiple
              />
            </div>
          </div>
        </fieldset>

        {/* Submission Section */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={() => alert("Form reset!")}
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-800 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Pedigree Registration
          </button>
        </div>
      </form>
    </div>
  );
}
