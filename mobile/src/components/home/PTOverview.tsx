import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

interface PTPackage {
  id: string;
  name: string;
  coach: {
    name: string;
    initials: string;
  };
  sessions: {
    total: number;
    used: number;
    remaining: number;
  };
  payment: {
    status: 'paid' | 'balance';
    amount?: number;
  };
}

interface PTOverviewProps {
  packages: PTPackage[];
}

export default function PTOverview({ packages }: PTOverviewProps) {
  return (
    <View className="px-6 pt-6">
      <Text className="text-lg font-bold text-text-primary dark:text-text-primary-dark mb-5 tracking-tight">
        PT Overview
      </Text>

      {packages.map((pkg) => (
        <View
          key={pkg.id}
          className="bg-white dark:bg-slate-800 rounded-2xl p-7 mb-5 border border-slate-200 dark:border-slate-700"
        >
          {/* Package Header */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-text-primary dark:text-text-primary-dark mb-3.5 tracking-tight">
              {pkg.name}
            </Text>
            <View className="flex-row items-center">
              <View className="w-9 h-9 rounded-full items-center justify-center mr-3">
                <LinearGradient
                  colors={['#1bc4bc', '#4d02a0']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 9999,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text className="text-white text-sm font-bold">
                    {pkg.coach.initials}
                  </Text>
                </LinearGradient>
              </View>
              <Text className="text-sm font-semibold text-text-secondary dark:text-text-secondary-dark">
                {pkg.coach.name}
              </Text>
            </View>
          </View>

          {/* Sessions Grid */}
          <View className="flex-row gap-4 mb-6">
            <View className="flex-1 bg-slate-50 dark:bg-slate-700 rounded-xl py-4 px-2 border border-slate-200 dark:border-slate-600 items-center">
              <Text className="text-3xl font-bold text-text-primary dark:text-text-primary-dark mb-2 tracking-tight">
                {pkg.sessions.total}
              </Text>
              <Text className="text-xs font-semibold text-text-secondary dark:text-text-secondary-dark uppercase tracking-widest">
                Total
              </Text>
            </View>
            <View className="flex-1 bg-slate-50 dark:bg-slate-700 rounded-xl py-4 px-2 border border-slate-200 dark:border-slate-600 items-center">
              <Text className="text-3xl font-bold text-slate-600 dark:text-slate-400 mb-2 tracking-tight">
                {pkg.sessions.used}
              </Text>
              <Text className="text-xs font-semibold text-text-secondary dark:text-text-secondary-dark uppercase tracking-widest">
                Used
              </Text>
            </View>
            <View className="flex-1 bg-slate-50 dark:bg-slate-700 rounded-xl py-4 px-2 border border-slate-200 dark:border-slate-600 items-center">
              <Text className="text-3xl font-bold text-primary mb-2 tracking-tight">
                {pkg.sessions.remaining}
              </Text>
              <Text className="text-xs font-semibold text-text-secondary dark:text-text-secondary-dark uppercase tracking-widest">
                Remaining
              </Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full mb-6 border border-slate-300 dark:border-slate-600 overflow-hidden">
            <LinearGradient
              colors={['#1bc4bc', '#4d02a0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: `${(pkg.sessions.used / pkg.sessions.total) * 100}%`,
                height: '100%',
                borderRadius: 9999,
              }}
            />
          </View>

          {/* Payment Status */}
          <View className="flex-row justify-between items-center pt-5 border-t border-slate-200 dark:border-slate-700">
            <Text className="text-sm text-text-secondary dark:text-text-secondary-dark font-semibold">
              Payment Status
            </Text>
            {pkg.payment.status === 'paid' ? (
              <View className="bg-emerald-100 dark:bg-emerald-900 px-4 py-2 rounded-xl border border-emerald-300 dark:border-emerald-700">
                <Text className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                  Fully Paid
                </Text>
              </View>
            ) : (
              <View className="bg-red-100 dark:bg-red-900 px-4 py-2 rounded-xl border border-red-300 dark:border-red-700">
                <Text className="text-sm font-bold text-red-800 dark:text-red-200">
                  ₱{pkg.payment.amount}
                </Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}
