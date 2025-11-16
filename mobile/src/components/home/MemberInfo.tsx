import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

interface MemberInfoProps {
  address: string;
  phone: string;
  email: string;
  keyfob: string;
  memberSince: string;
}

interface InfoItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <View className="bg-white dark:bg-slate-800 rounded-2xl p-5 flex-row items-center border border-slate-200 dark:border-slate-700 mb-4">
      <View className="w-12 h-12 rounded-xl items-center justify-center mr-4">
        <LinearGradient
          colors={['#1bc4bc', '#1bc4bc']}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name={icon} size={22} color="#ffffff" />
        </LinearGradient>
      </View>
      <View className="flex-1">
        <Text className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1">
          {label}
        </Text>
        <Text className="text-base font-semibold text-slate-900 dark:text-slate-100">
          {value}
        </Text>
      </View>
    </View>
  );
}

export default function MemberInfo({
  address,
  phone,
  email,
  keyfob,
  memberSince,
}: MemberInfoProps) {
  return (
    <View className="px-6 pt-6">
      <Text className="text-xl font-bold text-text-primary dark:text-text-primary-dark mb-5 tracking-tight">
        Member Information
      </Text>

      <View>
        <InfoItem icon="location" label="Address" value={address} />
        <InfoItem icon="call" label="Phone" value={phone} />
        <InfoItem icon="mail" label="Email" value={email} />
        <InfoItem icon="key" label="Keyfob" value={keyfob} />
        <InfoItem icon="calendar" label="Member Since" value={memberSince} />
      </View>
    </View>
  );
}
