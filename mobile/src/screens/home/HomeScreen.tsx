import MemberInfo from '@/components/home/MemberInfo';
import PTOverview from '@/components/home/PTOverview';
import UpcomingSessions from '@/components/home/UpcomingSessions';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function HomeScreen() {
  // Mock member data - based on backend Member type
  const member = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    contactId: 'CONT-001',
    firstName: 'Maria',
    lastName: 'Johnson',
    email: 'maria.j@email.com',
    phone: '+63 912 345 6789',
    address: '123 Fitness St, Manila',
    birthday: '1990-05-15',
    membershipTerm: '12 months',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    keyfob: '#KF-10542',
    status: 'active' as const,
    createdAt: new Date('2024-01-15'),
  };

  // Calculated display values
  const displayName = `${member.firstName} ${member.lastName}`;
  const initials = `${member.firstName.charAt(0)}${member.lastName.charAt(0)}`;
  const memberSince = new Date(member.startDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Mock PT packages
  const ptPackages = [
    {
      id: '1',
      name: 'Level 2 • 30-PT Sessions',
      coach: { name: 'Coach John Doe', initials: 'JD' },
      sessions: { total: 30, used: 12, remaining: 18 },
      payment: { status: 'balance' as const, amount: 1200 },
    },
    {
      id: '2',
      name: 'Level 2 • 12-PT Sessions',
      coach: { name: 'Coach Sarah Martinez', initials: 'SM' },
      sessions: { total: 12, used: 8, remaining: 4 },
      payment: { status: 'paid' as const },
    },
  ];

  // Mock upcoming sessions
  const upcomingSessions = [
    {
      id: '1',
      date: 'Mon, Jan 22',
      time: '9:00 AM',
      coach: 'Coach John Doe',
      status: 'confirmed' as const,
    },
    {
      id: '2',
      date: 'Wed, Jan 24',
      time: '2:00 PM',
      coach: 'Coach Sarah Martinez',
      status: 'booked' as const,
    },
  ];

  return (
    <View className="flex-1 bg-bg-primary dark:bg-bg-primary-dark">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="items-center pt-16 pb-4 px-6">
          {/* Profile Photo */}
          <View className="w-24 h-24 rounded-full items-center justify-center mb-5">
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
              <Text className="text-white text-4xl font-bold">{initials}</Text>
            </LinearGradient>
          </View>

          {/* Member Name */}
          <Text className="text-3xl font-bold mb-2 tracking-tight text-text-primary dark:text-text-primary-dark">
            {displayName}
          </Text>

          {/* Status Badge */}
          <View className="bg-teal-500 px-5 py-1 rounded-full">
            <Text className="text-white text-sm font-bold uppercase tracking-wide">
              {member.status}
            </Text>
          </View>
        </View>

        {/* Member Information */}
        <MemberInfo
          address={member.address}
          phone={member.phone}
          email={member.email}
          keyfob={member.keyfob}
          memberSince={memberSince}
        />

        {/* PT Overview */}
        <PTOverview packages={ptPackages} />

        {/* Upcoming Sessions */}
        <UpcomingSessions sessions={upcomingSessions} />

        {/* Bottom padding for tab bar */}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
