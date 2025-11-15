import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  // Mock member data
  const member = {
    name: 'Maria Johnson',
    initials: 'MJ',
    status: 'Active',
    info: {
      address: '123 Fitness St, Manila',
      phone: '+63 912 345 6789',
      email: 'maria.j@email.com',
      keyfob: '#KF-10542',
      memberSince: 'Jan 15, 2024',
    },
  };

  // Mock PT packages
  const ptPackages = [
    {
      id: '1',
      name: 'Level 2 • 30-PT Sessions',
      coach: { name: 'Coach John Doe', initials: 'JD' },
      sessions: { total: 30, used: 12, remaining: 18 },
      payment: { status: 'balance', amount: 1200 },
    },
    {
      id: '2',
      name: 'Level 2 • 12-PT Sessions',
      coach: { name: 'Coach Sarah Martinez', initials: 'SM' },
      sessions: { total: 12, used: 8, remaining: 4 },
      payment: { status: 'paid' },
    },
  ];

  // Mock upcoming sessions
  const upcomingSessions = [
    {
      id: '1',
      date: 'Mon, Jan 22',
      time: '9:00 AM',
      coach: 'Coach John Doe',
      status: 'confirmed',
    },
    {
      id: '2',
      date: 'Wed, Jan 24',
      time: '2:00 PM',
      coach: 'Coach Sarah Martinez',
      status: 'booked',
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="items-center pt-12 pb-8 px-6 bg-white">
          {/* Brand Logo */}
          <LinearGradient
            colors={['#1bc4bc', '#4d02a0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="w-20 h-20 rounded-2xl items-center justify-center mb-6"
            style={{
              shadowColor: '#1bc4bc',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.25,
              shadowRadius: 24,
              elevation: 8,
            }}
          >
            <Text className="text-white text-4xl font-black">FT</Text>
          </LinearGradient>

          {/* Profile Photo */}
          <View
            className="w-24 h-24 rounded-full items-center justify-center mb-5 border-4 border-slate-50"
            style={{
              shadowColor: '#1bc4bc',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.25,
              shadowRadius: 24,
              elevation: 8,
            }}
          >
            <LinearGradient
              colors={['#1bc4bc', '#4d02a0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="w-full h-full rounded-full items-center justify-center"
            >
              <Text className="text-white text-4xl font-bold">{member.initials}</Text>
            </LinearGradient>
          </View>

          {/* Member Name */}
          <Text className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
            {member.name}
          </Text>

          {/* Status Badge */}
          <View
            className="bg-teal-500 px-5 py-2 rounded-full"
            style={{
              shadowColor: '#1bc4bc',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            <Text className="text-white text-sm font-bold uppercase tracking-wide">
              {member.status}
            </Text>
          </View>
        </View>

        {/* Member Information */}
        <View className="px-6 py-6 bg-white">
          <Text className="text-xl font-extrabold text-slate-900 mb-5 tracking-tight">
            Member Information
          </Text>

          <View className="space-y-4">
            {/* Address */}
            <View
              className="bg-white rounded-2xl p-5 flex-row items-center border border-slate-200"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View
                className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                style={{
                  shadowColor: '#1bc4bc',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 12,
                  elevation: 4,
                }}
              >
                <LinearGradient
                  colors={['#1bc4bc', '#1bc4bc']}
                  className="w-full h-full rounded-xl items-center justify-center"
                >
                  <Ionicons name="location" size={22} color="#ffffff" />
                </LinearGradient>
              </View>
              <View className="flex-1">
                <Text className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  Address
                </Text>
                <Text className="text-base font-semibold text-slate-900">
                  {member.info.address}
                </Text>
              </View>
            </View>

            {/* Phone */}
            <View
              className="bg-white rounded-2xl p-5 flex-row items-center border border-slate-200"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View
                className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                style={{
                  shadowColor: '#1bc4bc',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 12,
                  elevation: 4,
                }}
              >
                <LinearGradient
                  colors={['#1bc4bc', '#1bc4bc']}
                  className="w-full h-full rounded-xl items-center justify-center"
                >
                  <Ionicons name="call" size={22} color="#ffffff" />
                </LinearGradient>
              </View>
              <View className="flex-1">
                <Text className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  Phone
                </Text>
                <Text className="text-base font-semibold text-slate-900">
                  {member.info.phone}
                </Text>
              </View>
            </View>

            {/* Email */}
            <View
              className="bg-white rounded-2xl p-5 flex-row items-center border border-slate-200"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View
                className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                style={{
                  shadowColor: '#1bc4bc',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 12,
                  elevation: 4,
                }}
              >
                <LinearGradient
                  colors={['#1bc4bc', '#1bc4bc']}
                  className="w-full h-full rounded-xl items-center justify-center"
                >
                  <Ionicons name="mail" size={22} color="#ffffff" />
                </LinearGradient>
              </View>
              <View className="flex-1">
                <Text className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  Email
                </Text>
                <Text className="text-base font-semibold text-slate-900">
                  {member.info.email}
                </Text>
              </View>
            </View>

            {/* Keyfob */}
            <View
              className="bg-white rounded-2xl p-5 flex-row items-center border border-slate-200"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View
                className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                style={{
                  shadowColor: '#1bc4bc',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 12,
                  elevation: 4,
                }}
              >
                <LinearGradient
                  colors={['#1bc4bc', '#1bc4bc']}
                  className="w-full h-full rounded-xl items-center justify-center"
                >
                  <Ionicons name="key" size={22} color="#ffffff" />
                </LinearGradient>
              </View>
              <View className="flex-1">
                <Text className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  Keyfob
                </Text>
                <Text className="text-base font-semibold text-slate-900">
                  {member.info.keyfob}
                </Text>
              </View>
            </View>

            {/* Member Since */}
            <View
              className="bg-white rounded-2xl p-5 flex-row items-center border border-slate-200"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View
                className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                style={{
                  shadowColor: '#1bc4bc',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 12,
                  elevation: 4,
                }}
              >
                <LinearGradient
                  colors={['#1bc4bc', '#1bc4bc']}
                  className="w-full h-full rounded-xl items-center justify-center"
                >
                  <Ionicons name="calendar" size={22} color="#ffffff" />
                </LinearGradient>
              </View>
              <View className="flex-1">
                <Text className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  Member Since
                </Text>
                <Text className="text-base font-semibold text-slate-900">
                  {member.info.memberSince}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* PT Overview */}
        <View className="px-6 py-6 bg-white">
          <Text className="text-lg font-extrabold text-slate-900 mb-5 tracking-tight">
            PT Overview
          </Text>

          {ptPackages.map((pkg) => (
            <View
              key={pkg.id}
              className="bg-white rounded-2xl p-7 mb-5 border border-slate-200"
              style={{
                shadowColor: '#0f172a',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 16,
                elevation: 4,
              }}
            >
              {/* Package Header */}
              <View className="mb-6">
                <Text className="text-lg font-extrabold text-slate-900 mb-3.5 tracking-tight">
                  {pkg.name}
                </Text>
                <View className="flex-row items-center">
                  <View className="w-9 h-9 rounded-full items-center justify-center mr-3 border-2 border-slate-50"
                    style={{
                      shadowColor: '#1bc4bc',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 8,
                      elevation: 3,
                    }}
                  >
                    <LinearGradient
                      colors={['#1bc4bc', '#4d02a0']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      className="w-full h-full rounded-full items-center justify-center"
                    >
                      <Text className="text-white text-sm font-extrabold">
                        {pkg.coach.initials}
                      </Text>
                    </LinearGradient>
                  </View>
                  <Text className="text-sm font-semibold text-slate-700">
                    {pkg.coach.name}
                  </Text>
                </View>
              </View>

              {/* Sessions Grid */}
              <View className="flex-row gap-4 mb-6">
                <View className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-200 items-center">
                  <Text className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                    {pkg.sessions.total}
                  </Text>
                  <Text className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
                    Total
                  </Text>
                </View>
                <View className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-200 items-center">
                  <Text className="text-3xl font-extrabold text-slate-600 mb-2 tracking-tight">
                    {pkg.sessions.used}
                  </Text>
                  <Text className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
                    Used
                  </Text>
                </View>
                <View className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-200 items-center">
                  <Text className="text-3xl font-extrabold text-teal-500 mb-2 tracking-tight">
                    {pkg.sessions.remaining}
                  </Text>
                  <Text className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
                    Remaining
                  </Text>
                </View>
              </View>

              {/* Progress Bar */}
              <View className="h-3 bg-slate-200 rounded-full mb-6 border border-slate-300 overflow-hidden">
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
              <View className="flex-row justify-between items-center pt-5 border-t border-slate-200">
                <Text className="text-sm text-slate-600 font-semibold">
                  Payment Status
                </Text>
                {pkg.payment.status === 'paid' ? (
                  <View className="bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-300">
                    <Text className="text-sm font-extrabold text-emerald-800">
                      Fully Paid
                    </Text>
                  </View>
                ) : (
                  <View className="bg-red-100 px-4 py-2 rounded-xl border border-red-300">
                    <Text className="text-sm font-extrabold text-red-800">
                      ₱{pkg.payment.amount}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))}

          {/* Upcoming Sessions */}
          <Text className="text-lg font-extrabold text-slate-900 mb-5 mt-4 tracking-tight">
            Upcoming Sessions
          </Text>

          {upcomingSessions.map((session) => (
            <View
              key={session.id}
              className="bg-white rounded-2xl p-5 mb-4 border border-slate-200"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View className="flex-row justify-between items-center mb-3.5">
                <View>
                  <Text className="text-base font-bold text-slate-900">
                    {session.date}
                  </Text>
                  <Text className="text-sm font-semibold text-teal-500 mt-0.5">
                    {session.time}
                  </Text>
                </View>
                {session.status === 'confirmed' ? (
                  <View
                    className="bg-teal-500 px-3.5 py-2 rounded-xl"
                    style={{
                      shadowColor: '#1bc4bc',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 8,
                      elevation: 3,
                    }}
                  >
                    <Text className="text-xs font-bold text-white uppercase tracking-wide">
                      Confirmed
                    </Text>
                  </View>
                ) : (
                  <View
                    className="bg-purple-700 px-3.5 py-2 rounded-xl"
                    style={{
                      shadowColor: '#4d02a0',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 8,
                      elevation: 3,
                    }}
                  >
                    <Text className="text-xs font-bold text-white uppercase tracking-wide">
                      Booked
                    </Text>
                  </View>
                )}
              </View>
              <View className="flex-row items-center">
                <Ionicons name="person-outline" size={18} color="#4d02a0" />
                <Text className="text-sm text-slate-600 ml-2.5 font-semibold">
                  {session.coach}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Bottom padding for tab bar */}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
