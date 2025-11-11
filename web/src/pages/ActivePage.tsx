import { useState } from "react";
import { Card } from "./../components/ui/card";
import { Badge } from "./../components/ui/badge";
import { Button } from "./../components/ui/button";
import { Input } from "./../components/ui/input";
import { Search, Mail, Phone, Calendar, UserCircle } from "lucide-react";
import { Progress } from "./../components/ui/progress";

interface Member {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  packageType: string;
  purchaseDate: string;
  expirationDate: string;
  status: "active";
  assignedCoaches: string[];
  totalSessions: number;
  usedSessions: number;
}

export function ActivePage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock active members
  const members: Member[] = [
    {
      id: "1",
      fullName: "John Smith",
      email: "john.smith@email.com",
      phoneNumber: "+1 (555) 123-4567",
      packageType: "Season Package",
      purchaseDate: "2024-09-01",
      expirationDate: "2025-02-28",
      status: "active",
      assignedCoaches: ["Coach Mike Johnson", "Coach Sarah Williams"],
      totalSessions: 50,
      usedSessions: 32,
    },
    {
      id: "2",
      fullName: "Sarah Johnson",
      email: "sarah.j@email.com",
      phoneNumber: "+1 (555) 234-5678",
      packageType: "Annual Package",
      purchaseDate: "2024-08-15",
      expirationDate: "2025-08-14",
      status: "active",
      assignedCoaches: ["Coach Mike Johnson"],
      totalSessions: 100,
      usedSessions: 45,
    },
    {
      id: "3",
      fullName: "Mike Davis",
      email: "mike.davis@email.com",
      phoneNumber: "+1 (555) 345-6789",
      packageType: "Season Package",
      purchaseDate: "2024-10-01",
      expirationDate: "2025-03-31",
      status: "active",
      assignedCoaches: ["Coach Sarah Williams"],
      totalSessions: 50,
      usedSessions: 12,
    },
    {
      id: "4",
      fullName: "Emma Wilson",
      email: "emma.w@email.com",
      phoneNumber: "+1 (555) 456-7890",
      packageType: "Monthly Package",
      purchaseDate: "2024-10-15",
      expirationDate: "2024-11-14",
      status: "active",
      assignedCoaches: [],
      totalSessions: 12,
      usedSessions: 8,
    },
    {
      id: "5",
      fullName: "Robert Taylor",
      email: "robert.t@email.com",
      phoneNumber: "+1 (555) 567-8901",
      packageType: "Season Package",
      purchaseDate: "2024-09-20",
      expirationDate: "2025-03-19",
      status: "active",
      assignedCoaches: ["Coach Mike Johnson", "Coach David Lee"],
      totalSessions: 50,
      usedSessions: 28,
    },
  ];

  const filteredMembers = members.filter((member) =>
    member.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Active Members</h1>
          <p className="text-muted-foreground">Members with active packages</p>
        </div>
        <Badge className="bg-green-100 text-green-800 border-green-200">
          {members.length} Active
        </Badge>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => {
          const progressPercentage = (member.usedSessions / member.totalSessions) * 100;
          const remainingSessions = member.totalSessions - member.usedSessions;

          return (
            <Card key={member.id} className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3>{member.fullName}</h3>
                </div>
              </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <p className="text-sm">{member.email}</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <p className="text-sm">{member.phoneNumber}</p>
              </div>
            </div>

            <div className="pt-4 border-t space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">Session Progress</p>
                <p className="text-sm">
                  {member.usedSessions} / {member.totalSessions}
                </p>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">Remaining Sessions</p>
                <p>{remainingSessions}</p>
              </div>
            </div>

            {member.assignedCoaches.length > 0 && (
              <div className="pt-3 border-t">
                <div className="flex items-start gap-2">
                  <UserCircle className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Assigned Coaches:</p>
                    <div className="space-y-1">
                      {member.assignedCoaches.map((coach, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="mr-1 mb-1 bg-primary/5"
                        >
                          {coach}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">Package</p>
                <p className="text-sm">{member.packageType}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">Expires</p>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <p className="text-sm">{member.expirationDate}</p>
                </div>
              </div>
            </div>

              <Button className="w-full" variant="outline">
                View Details
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
