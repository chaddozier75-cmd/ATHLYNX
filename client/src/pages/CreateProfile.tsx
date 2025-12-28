import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function CreateProfile() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const utils = trpc.useUtils();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    sportId: 3, // Baseball (default)
    primaryPosition: "",
    secondaryPosition: "",
    height: "",
    weight: "",
    bats: "R" as "R" | "L" | "S",
    throws: "R" as "R" | "L",
    city: "",
    state: "",
    highSchool: "",
    gradYear: new Date().getFullYear() + 1,
    gpa: "",
    satScore: "",
    actScore: "",
  });

  const createProfile = trpc.athleteProfiles.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Profile Created!",
        description: "Your athlete profile has been created successfully.",
      });
      utils.athleteProfiles.getMyProfile.invalidate();
      setLocation("/profile");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createProfile.mutate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: new Date(formData.dateOfBirth),
      sportId: formData.sportId,
      primaryPosition: formData.primaryPosition,
      secondaryPosition: formData.secondaryPosition || undefined,
      height: formData.height ? parseInt(formData.height) : undefined,
      weight: formData.weight ? parseInt(formData.weight) : undefined,
      bats: formData.bats,
      throws: formData.throws,
      city: formData.city || undefined,
      state: formData.state || undefined,
      highSchool: formData.highSchool || undefined,
      gradYear: formData.gradYear,
      gpa: formData.gpa ? parseFloat(formData.gpa) : undefined,
      satScore: formData.satScore ? parseInt(formData.satScore) : undefined,
      actScore: formData.actScore ? parseInt(formData.actScore) : undefined,
    });
  };

  const positions = [
    "C", "1B", "2B", "3B", "SS", "OF", "LHP", "RHP", "DH", "UTIL"
  ];

  const states = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  return (
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Create Your Athlete Profile</CardTitle>
          <CardDescription>
            Complete your profile to start connecting with coaches and showcasing your talent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gradYear">Graduation Year *</Label>
                  <Input
                    id="gradYear"
                    type="number"
                    value={formData.gradYear}
                    onChange={(e) => setFormData({ ...formData, gradYear: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Baseball Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Baseball Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryPosition">Primary Position *</Label>
                  <Select
                    value={formData.primaryPosition}
                    onValueChange={(value) => setFormData({ ...formData, primaryPosition: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((pos) => (
                        <SelectItem key={pos} value={pos}>
                          {pos}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryPosition">Secondary Position</Label>
                  <Select
                    value={formData.secondaryPosition}
                    onValueChange={(value) => setFormData({ ...formData, secondaryPosition: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select position (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((pos) => (
                        <SelectItem key={pos} value={pos}>
                          {pos}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bats">Bats *</Label>
                  <Select
                    value={formData.bats}
                    onValueChange={(value: "R" | "L" | "S") => setFormData({ ...formData, bats: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="R">Right (R)</SelectItem>
                      <SelectItem value="L">Left (L)</SelectItem>
                      <SelectItem value="S">Switch (S)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="throws">Throws *</Label>
                  <Select
                    value={formData.throws}
                    onValueChange={(value: "R" | "L") => setFormData({ ...formData, throws: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="R">Right (R)</SelectItem>
                      <SelectItem value="L">Left (L)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Physical Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Physical Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (inches)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="e.g., 72 inches (6 feet)"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="e.g., 185 lbs"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* School Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">School Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="highSchool">High School</Label>
                  <Input
                    id="highSchool"
                    value={formData.highSchool}
                    onChange={(e) => setFormData({ ...formData, highSchool: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gpa">GPA</Label>
                  <Input
                    id="gpa"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 3.75"
                    value={formData.gpa}
                    onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="satScore">SAT Score</Label>
                  <Input
                    id="satScore"
                    type="number"
                    placeholder="e.g., 1200"
                    value={formData.satScore}
                    onChange={(e) => setFormData({ ...formData, satScore: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="actScore">ACT Score</Label>
                  <Input
                    id="actScore"
                    type="number"
                    placeholder="e.g., 28"
                    value={formData.actScore}
                    onChange={(e) => setFormData({ ...formData, actScore: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => setFormData({ ...formData, state: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocation("/")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createProfile.isPending}
              >
                {createProfile.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
