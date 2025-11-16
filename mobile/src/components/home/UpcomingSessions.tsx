import { Ionicons } from '@expo/vector-icons';
import { Text, View, useColorScheme } from 'react-native';

interface Session {
  id: string;
  date: string;
  time: string;
  coach: string;
  status: 'confirmed' | 'booked';
}

interface UpcomingSessionsProps {
  sessions: Session[];
}

export default function UpcomingSessions({ sessions }: UpcomingSessionsProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="px-6 pt-6">
      <Text className="text-lg font-bold text-text-primary dark:text-text-primary-dark mb-5 tracking-tight">
        Upcoming Sessions
      </Text>

      {sessions.map((session) => (
        <View
          key={session.id}
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 mb-4 border border-slate-200 dark:border-slate-700"
        >
          <View className="flex-row justify-between items-center mb-3.5">
            <View>
              <Text className="text-base font-bold text-text-primary dark:text-text-primary-dark">
                {session.date}
              </Text>
              <Text className="text-sm font-semibold text-primary mt-0.5">
                {session.time}
              </Text>
            </View>
            {session.status === 'confirmed' ? (
              <View className="bg-primary px-3.5 py-2 rounded-xl">
                <Text className="text-xs font-bold text-white uppercase tracking-wide">
                  Confirmed
                </Text>
              </View>
            ) : (
              <View className="bg-secondary px-3.5 py-2 rounded-xl">
                <Text className="text-xs font-bold text-white uppercase tracking-wide">
                  Booked
                </Text>
              </View>
            )}
          </View>
          <View className="flex-row items-center">
            <Ionicons
              name="person-outline"
              size={18}
              color={isDark ? '#cbd5e1' : '#4d02a0'}
            />
            <Text className="text-sm text-text-secondary dark:text-text-secondary-dark ml-2.5 font-semibold">
              {session.coach}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
