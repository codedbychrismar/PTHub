import { Card } from "./../components/ui/card";
import { Users, UserCheck, UserX, Activity } from "lucide-react";

interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  deckingMembers: number;
  expiredMembers: number;
  totalSessions: number;
  sessionsThisMonth: number;
}

export function DashboardPage() {
  // Mock data
  const stats: DashboardStats = {
    totalMembers: 156,
    activeMembers: 98,
    deckingMembers: 34,
    expiredMembers: 24,
    totalSessions: 1243,
    sessionsThisMonth: 187,
  };

  const statCards = [
    {
      title: "Total Members",
      value: stats.totalMembers,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Members",
      value: stats.activeMembers,
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Decking Members",
      value: stats.deckingMembers,
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Expired Members",
      value: stats.expiredMembers,
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground">Overview of your gym management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">{stat.title}</p>
                  <h2 className="mt-2">{stat.value}</h2>
                </div>
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { name: "John Smith", action: "Completed session", time: "2 hours ago" },
              { name: "Sarah Johnson", action: "Started free trial", time: "4 hours ago" },
              { name: "Mike Davis", action: "Package expired", time: "1 day ago" },
              { name: "Emma Wilson", action: "Purchased season package", time: "2 days ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p>{activity.name}</p>
                  <p className="text-muted-foreground text-sm">{activity.action}</p>
                </div>
                <p className="text-muted-foreground text-sm">{activity.time}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4">Session Statistics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <p>Total Sessions</p>
              <h3>{stats.totalSessions}</h3>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <p>Sessions This Month</p>
              <h3>{stats.sessionsThisMonth}</h3>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <p>Average per Day</p>
              <h3>{Math.round(stats.sessionsThisMonth / 30)}</h3>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
