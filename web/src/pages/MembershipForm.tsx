import { useState } from "react";
import { Button } from "./../components/ui/button";
import { Input } from "./../components/ui/input";
import { Label } from "./../components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function MembershipForm() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [membershipType, setMembershipType] = useState("New");

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Form submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 space-y-8">
      {/* STEP 1 — MEMBER INFORMATION */}
      {step === 1 && (
        <Card className="bg-[#4A2EC4] text-white">
          <CardHeader>
            <h2 className="text-xl font-semibold text-center">MEMBER INFORMATION</h2>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-4">

            {/* Brand Ambassador */}
            <div className="flex flex-col gap-2">
              <Label>Brand Ambassador<span className="text-red-500 text-xl">*</span></Label>
              <select className="bg-white text-black p-2 rounded border border-gray-300">
                <option value="">Select Brand Ambassador</option>
                <option value="Vincent Castro">Vincent Castro</option>
                <option value="Josh Royce Garcia">Josh Royce Garcia</option>
              </select>
            </div>


            {/* Membership Type */}
            <div className="flex flex-col gap-2">
              <Label>Membership Type</Label>
              <RadioGroup className="mt-1" onValueChange={setMembershipType}>
                <label className="flex items-center gap-2">
                  <RadioGroupItem value="New" className="checked:bg-white checked:border-white" />
                  New
                </label>
                <label className="flex items-center gap-2">
                  <RadioGroupItem value="Renewal" className="checked:bg-white checked:border-white" />
                  Renewal
                </label>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="Custom" className="checked:bg-white checked:border-white" />
                  <Input
                    placeholder="Enter custom membership type"
                    className={`bg-white text-black transition-all ${
                      membershipType === "Custom" ? "opacity-100" : "opacity-40 pointer-events-none"
                    }`}
                  />
                </div>
              </RadioGroup>
            </div>

            {/* First Name */}
            <div className="flex flex-col gap-2">
              <Label>First Name</Label>
              <Input className="bg-white text-black" placeholder="First Name" />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2">
              <Label>Last Name</Label>
              <Input className="bg-white text-black" placeholder="Last Name" />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input type="email" className="bg-white text-black" placeholder="Email" />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <Label>Phone</Label>
              <PhoneInput
                country={"ph"}
                value={phone}
                onChange={setPhone}
                enableSearch
                containerStyle={{ width: "100%" }}
                inputStyle={{ width: "100%", color: "black" }}
                dropdownStyle={{ backgroundColor: "white", color: "black", maxHeight: "200px", overflowY: "auto" }}
              />
            </div>

            {/* Birthday */}
            <div className="flex flex-col gap-2">
              <Label>Birthday</Label>
              <Input type="date" className="bg-white text-black" />
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2">
              <Label>Address</Label>
              <Input className="bg-white text-black" placeholder="Complete Address" />
            </div>

            {/* City */}
            <div className="flex flex-col gap-2">
              <Label>City</Label>
              <Input className="bg-white text-black" placeholder="City" />
            </div>

            {/* State */}
            <div className="flex flex-col gap-2">
              <Label>State</Label>
              <Input className="bg-white text-black" placeholder="State" />
            </div>

            {/* Country */}
            <div className="flex flex-col gap-2">
              <Label>Country</Label>
              <Input className="bg-white text-black" placeholder="Country" />
            </div>

            {/* Postal Code */}
            <div className="flex flex-col gap-2">
              <Label>Postal Code</Label>
              <Input className="bg-white text-black" placeholder="Postal Code" />
            </div>

            {/* Emergency Contact */}
            <div className="flex flex-col gap-2">
              <Label>Emergency Contact Name</Label>
              <Input className="bg-white text-black" placeholder="Name" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Relationship</Label>
              <Input className="bg-white text-black" placeholder="Relationship" />
            </div>
            <div className="col-span-2">
              <Label>Emergency Phone</Label>
              <PhoneInput
                country={"ph"}
                value={emergencyPhone}
                onChange={setEmergencyPhone}
                enableSearch
                containerStyle={{ width: "100%" }}
                inputStyle={{ width: "100%", color: "black" }}
                dropdownStyle={{ backgroundColor: "white", color: "black", maxHeight: "200px", overflowY: "auto" }}
              />
            </div>
          </CardContent>

          <div className="flex justify-end p-4">
            <Button onClick={nextStep}>Next →</Button>
          </div>
        </Card>
      )}

      {/* STEP 2 — MEMBERSHIP TERM */}
      {step === 2 && (
        <Card className="bg-[#4A2EC4] text-white">
          <CardHeader>
            <h2 className="text-xl font-semibold text-center">MEMBERSHIP TERM</h2>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <Label>Membership Term</Label>
              <RadioGroup className="flex flex-wrap gap-6 mt-1">
                {["6 Months", "12 Months", "18 Months"].map((label) => (
                  <label key={label} className="flex items-center gap-2">
                    <RadioGroupItem value={label} className="checked:bg-white checked:border-white" />
                    {label}
                  </label>
                ))}
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="custom" className="checked:bg-white checked:border-white" />
                  <Input placeholder="Custom duration" className="bg-white text-black" />
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Start Date</Label>
              <Input type="date" className="bg-white text-black" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>End Date</Label>
              <Input type="date" className="bg-white text-black" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Keyfob Fee *</Label>
              <Input placeholder="Keyfob Fee" className="bg-white text-black" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Joining Fee *</Label>
              <Input placeholder="Joining Fee" className="bg-white text-black" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Recurring Fee *</Label>
              <Input placeholder="Recurring Fee" className="bg-white text-black" />
            </div>
          </CardContent>

          <div className="flex justify-between p-4">
            <Button variant="secondary" onClick={prevStep}>← Previous</Button>
            <Button onClick={nextStep}>Next →</Button>
          </div>
        </Card>
      )}

      {/* STEP 3 — PAYMENT */}
      {step === 3 && (
        <Card className="bg-[#4A2EC4] text-white">
          <CardHeader>
            <h2 className="text-xl font-semibold text-center">PAYMENT AUTHORISATION</h2>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <Label>Name on Account / Card *</Label>
              <Input placeholder="Full Name" className="bg-white text-black" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Bank *</Label>
              <Input placeholder="Bank Name" className="bg-white text-black" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Account Number *</Label>
              <Input placeholder="Account Number" className="bg-white text-black" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Credit Card Number *</Label>
              <Input placeholder="Card Number" className="bg-white text-black" />
            </div>

            <div className="col-span-2">
              <Label>Expiry Date *</Label>
              <Input type="month" className="bg-white text-black" />
            </div>
          </CardContent>

          <div className="flex justify-between p-4">
            <Button variant="secondary" onClick={prevStep}>← Previous</Button>
            <Button onClick={nextStep}>Next →</Button>
          </div>
        </Card>
      )}

      {/* STEP 4 — PAR-Q */}
      {step === 4 && (
        <Card className="bg-[#4A2EC4] text-white">
          <CardHeader>
            <h2 className="text-xl font-semibold text-center">PAR-Q FORM</h2>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-6">
            {[
              "Has your doctor ever said that you have a heart conditions and should only do physical activity recommended by a doctor?",
              "Do you feel pain in your chest when you do physical activity?",
              "In the past month, have you had chest pain when inactive?",
              "Do you lose your balance because of dizziness or do you ever lose consciousness?",
              "Do you have a bone or joint problem (back, knee, hip) that could be worsened by activity?",
              "Is your doctor currently prescribing drugs for blood pressure or heart condition?",
              "Do you know of any other reason why you should not do physical activity?"
            ].map((question, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Label>{question}</Label>
                <RadioGroup className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <RadioGroupItem value="yes" className="checked:bg-white checked:border-white" /> YES
                  </label>
                  <label className="flex items-center gap-2">
                    <RadioGroupItem value="no" className="checked:bg-white checked:border-white" /> NO
                  </label>
                </RadioGroup>
              </div>
            ))}
          </CardContent>

          <div className="flex justify-between p-4">
            <Button variant="secondary" onClick={prevStep}>← Previous</Button>
            <Button type="submit">Submit Membership Agreement</Button>
          </div>
        </Card>
      )}

    </form>
  );
}
